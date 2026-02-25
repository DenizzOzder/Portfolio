// @ts-nocheck
import { useEffect, useRef } from 'react';

import type { Disc, Point, Particle, Clip } from '@/types/effects';

export const BlackHoleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;

    const state = {
      discs: [] as Disc[],
      lines: [] as Point[][],
      particles: [] as Particle[],
      clip: {} as Clip,
      startDisc: { p: 0, x: 0, y: 0, w: 0, h: 0 },
      endDisc: { p: 0, x: 0, y: 0, w: 0, h: 0 },
      rect: { width: 0, height: 0 },
      render: { width: 0, height: 0, dpi: window.devicePixelRatio || 1 },
      particleArea: {} as any,
      linesCanvas: undefined as HTMLCanvasElement | undefined,
    };

    const props = {
      strokeColor: "#737373",
      numberOfLines: 50,
      numberOfDiscs: 50,
      particleRGBColor: [255, 255, 255],
    };

    function linear(p: number) {
      return p;
    }

    function easeInExpo(p: number) {
      return p === 0 ? 0 : 2 ** (10 * (p - 1));
    }

    function tweenValue(start: number, end: number, p: number, easeType: "inExpo" | null = null) {
      const delta = end - start;
      const easeFn = easeType === "inExpo" ? easeInExpo : linear;
      return start + delta * easeFn(p);
    }

    function tweenDisc(disc: Disc) {
      disc.x = tweenValue(state.startDisc.x, state.endDisc.x, disc.p);
      disc.y = tweenValue(state.startDisc.y, state.endDisc.y, disc.p, "inExpo");
      disc.w = tweenValue(state.startDisc.w, state.endDisc.w, disc.p);
      disc.h = tweenValue(state.startDisc.h, state.endDisc.h, disc.p);
    }

    function setSize() {
      const rect = canvas.getBoundingClientRect();
      state.rect = { width: rect.width, height: rect.height };
      state.render = {
        width: rect.width,
        height: rect.height,
        dpi: window.devicePixelRatio || 1,
      };
      canvas.width = state.render.width * state.render.dpi;
      canvas.height = state.render.height * state.render.dpi;
    }

    function setDiscs() {
      const { width, height } = state.rect;
      if (width <= 0 || height <= 0) return;

      state.discs = [];
      state.startDisc = {
        p: 0,
        x: width * 0.5,
        y: height * 0.45,
        w: width * 0.75,
        h: height * 0.7,
      };
      state.endDisc = {
        p: 0,
        x: width * 0.5,
        y: height * 0.95,
        w: 0,
        h: 0,
      };

      let prevBottom = height;
      state.clip = {};

      for (let i = 0; i < props.numberOfDiscs; i++) {
        const p = i / props.numberOfDiscs;
        const disc = { p, x: 0, y: 0, w: 0, h: 0 };
        tweenDisc(disc);
        const bottom = disc.y + disc.h;
        if (bottom <= prevBottom) {
          state.clip = { disc: { ...disc }, i };
        }
        prevBottom = bottom;
        state.discs.push(disc);
      }

      if (state.clip.disc) {
        const clipPath = new Path2D();
        const disc = state.clip.disc;
        clipPath.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
        clipPath.rect(disc.x - disc.w, 0, disc.w * 2, disc.y);
        state.clip.path = clipPath;
      }
    }

    function setLines() {
      const { width, height } = state.rect;
      if (width <= 0 || height <= 0) return;

      state.lines = [];
      const linesAngle = (Math.PI * 2) / props.numberOfLines;
      for (let i = 0; i < props.numberOfLines; i++) {
        state.lines.push([]);
      }

      state.discs.forEach((disc: Disc) => {
        for (let i = 0; i < props.numberOfLines; i++) {
          const angle = i * linesAngle;
          const p = {
            x: disc.x + Math.cos(angle) * disc.w,
            y: disc.y + Math.sin(angle) * disc.h,
          };
          state.lines[i].push(p);
        }
      });

      const offCanvas = document.createElement("canvas");
      offCanvas.width = Math.max(1, width);
      offCanvas.height = Math.max(1, height);

      const ctx = offCanvas.getContext("2d");
      if (!ctx || !state.clip.path) {
        state.linesCanvas = undefined;
        return;
      }

      ctx.clearRect(0, 0, offCanvas.width, offCanvas.height);

      state.lines.forEach((line: Point[]) => {
        ctx.save();
        let lineIsIn = false;
        line.forEach((p1: Point, j: number) => {
          if (j === 0) return;
          const p0 = line[j - 1];
          if (
            !lineIsIn &&
            (ctx.isPointInPath(state.clip.path!, p1.x, p1.y) ||
              ctx.isPointInStroke(state.clip.path!, p1.x, p1.y))
          ) {
            lineIsIn = true;
          } else if (lineIsIn) {
            ctx.clip(state.clip.path!);
          }
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = props.strokeColor;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.closePath();
        });
        ctx.restore();
      });
      state.linesCanvas = offCanvas;
    }

    function initPlanet(start = false): Particle {
      const sx = (state.particleArea.sx || 0) + (state.particleArea.sw || 0) * Math.random();
      const ex = (state.particleArea.ex || 0) + (state.particleArea.ew || 0) * Math.random();
      const dx = ex - sx;
      
      const y = start
        ? (state.particleArea.h || 0) * Math.random()
        : state.particleArea.h || 0;
        
      // Planet Settings! Single massive particle replacing 100 tiny particles
      const r = 40; // Size of the planet (huge)
      const vy = 0.3; // Slower velocity so it stays a while
      
      return {
        x: sx,
        sx,
        dx,
        y,
        vy,
        p: 0,
        r,
        c: `rgba(217, 70, 239, 0.8)`, // Glowing purple/pink orb
      };
    }

    function setParticles() {
      const { width, height } = state.rect;
      state.particles = [];
      const disc = state.clip.disc;
      if (!disc) return;
      
      state.particleArea = {
        sw: disc.w * 0.5,
        ew: disc.w * 2,
        h: height * 0.85,
      };
      
      state.particleArea.sx = (width - (state.particleArea.sw || 0)) / 2;
      state.particleArea.ex = (width - (state.particleArea.ew || 0)) / 2;
      
      // USER REQUEST: Only SINGLE planet instead of 100 particles
      state.particles.push(initPlanet(true));
    }

    function drawDiscs(ctx: CanvasRenderingContext2D) {
      ctx.strokeStyle = props.strokeColor;
      ctx.lineWidth = 2;
      const outerDisc = state.startDisc;
      
      ctx.beginPath();
      ctx.ellipse(outerDisc.x, outerDisc.y, outerDisc.w, outerDisc.h, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
      
      state.discs.forEach((disc: Disc, i: number) => {
        if (i % 5 !== 0) return;
        if (disc.w < (state.clip.disc?.w || 0) - 5) {
          ctx.save();
          ctx.clip(state.clip.path!);
        }
        ctx.beginPath();
        ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
        if (disc.w < (state.clip.disc?.w || 0) - 5) {
          ctx.restore();
        }
      });
    }

    function drawLines(ctx: CanvasRenderingContext2D) {
      if (
        state.linesCanvas &&
        state.linesCanvas.width > 0 &&
        state.linesCanvas.height > 0
      ) {
        ctx.drawImage(state.linesCanvas, 0, 0);
      }
    }

    function drawParticles(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.clip(state.clip.path!);
      
      state.particles.forEach((particle: Particle) => {
        // Draw Planet Aura / Glow
        const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0, 
            particle.x, particle.y, particle.r * 1.5
        );
        gradient.addColorStop(0, '#ffffff'); // Bright star core
        gradient.addColorStop(0.3, particle.c); // Pinkish surface
        gradient.addColorStop(1, 'rgba(217, 70, 239, 0)'); // Faded glow
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r * 1.5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
        // Draw Planet Core
        ctx.fillStyle = particle.c;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      });
      ctx.restore();
    }

    function moveDiscs() {
      state.discs.forEach((disc: Disc) => {
        disc.p = (disc.p + 0.001) % 1;
        tweenDisc(disc);
      });
    }

    function moveParticles() {
      state.particles.forEach((particle: Particle, idx: number) => {
        particle.p = 1 - particle.y / (state.particleArea.h || 1);
        particle.x = particle.sx + particle.dx * particle.p;
        particle.y -= particle.vy;
        
        // As it gets closer to top of the screen, it grows! (Planet simulation)
        particle.r = 10 + (particle.p * 40); 
        
        if (particle.y < 0) {
          state.particles[idx] = initPlanet();
        }
      });
    }

    function tick() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(state.render.dpi, state.render.dpi);
      
      moveDiscs();
      moveParticles();
      drawDiscs(ctx);
      drawLines(ctx);
      drawParticles(ctx);
      
      ctx.restore();
      animationFrameId = requestAnimationFrame(tick);
    }

    function init() {
      setSize();
      setDiscs();
      setLines();
      setParticles();
    }

    function handleResize() {
      setSize();
      setDiscs();
      setLines();
      setParticles();
    }

    setSize();
    init();
    tick();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050010] overflow-hidden -z-20">
      <div
        data-slot="black-hole-background"
        className="relative w-full h-full overflow-hidden 
          before:absolute before:top-1/2 before:left-1/2 before:block before:h-[140%] before:w-[140%] 
          before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] 
          before:[background:radial-gradient(ellipse_at_50%_55%,transparent_10%,#050010_50%)] 
          
          after:absolute after:top-1/2 after:left-1/2 after:z-[5] after:block after:w-full after:h-full 
          after:-translate-x-1/2 after:-translate-y-1/2 after:mix-blend-overlay after:content-[''] 
          after:[background:radial-gradient(ellipse_at_50%_75%,#a900ff_20%,transparent_75%)]"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full opacity-30"
        />
        <div
          className="absolute top-[-71.5%] left-1/2 z-[3] h-[140%] w-[80%] -translate-x-1/2 rounded-b-full opacity-40 mix-blend-plus-lighter blur-3xl animate-[pulse_5s_linear_infinite]"
          style={{
             backgroundSize: "100% 200%",
             background: "linear-gradient(20deg,rgba(0,248,241,0.2),rgba(255,189,30,0.2)_16%,rgba(254,132,143,0.3)_33%,rgba(254,132,143,0.3)_49%,rgba(0,248,241,0.2)_66%,rgba(0,248,241,0.1)_85%,rgba(255,189,30,0.2)_100%)",
          }}
        />
        <div
          className="absolute top-0 left-0 z-[7] w-full h-full opacity-10 mix-blend-overlay"
          style={{ background: "repeating-linear-gradient(transparent,transparent_1px,white_1px,white_2px)" }}
        />
      </div>
    </div>
  );
};
