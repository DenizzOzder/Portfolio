import { useEffect, useRef } from 'react';

interface Bit {
  x: number;
  y: number;
  value: string;
  speed: number;
  opacity: number;
  size: number;
  trail: { x: number; y: number; opacity: number }[];
}

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create bits (comet-like binary numbers)
    const bits: Bit[] = [];
    const numBits = 30;

    for (let i = 0; i < numBits; i++) {
        // Random start positions spread across the canvas
      bits.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height, 
        value: Math.random() > 0.5 ? '1' : '0',
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.7,
        size: 14 + Math.random() * 10,
        trail: []
      });
    }

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      // Create fade effect
      ctx.fillStyle = 'rgba(10, 5, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      bits.forEach((bit) => {
        // Update trail
        bit.trail.unshift({ x: bit.x, y: bit.y, opacity: bit.opacity });
        if (bit.trail.length > 20) {
          bit.trail.pop();
        }

        // Draw trail (comet tail)
        bit.trail.forEach((point, index) => {
          const trailOpacity = point.opacity * (1 - index / bit.trail.length) * 0.5;
          const trailSize = bit.size * (1 - index / bit.trail.length);
          
          ctx.fillStyle = `rgba(168, 85, 247, ${trailOpacity})`;
          ctx.font = `${trailSize}px monospace`;
          ctx.fillText(bit.value, point.x, point.y);
        });

        // Draw bit
        ctx.fillStyle = `rgba(192, 132, 252, ${bit.opacity})`;
        ctx.font = `bold ${bit.size}px monospace`;
        ctx.fillText(bit.value, bit.x, bit.y);

        // Add glow effect to head
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#a855f7';
        ctx.fillStyle = `rgba(216, 180, 254, ${bit.opacity})`;
        ctx.fillText(bit.value, bit.x, bit.y);
        ctx.shadowBlur = 0;

        // Update position (moving diagonally down-right like a comet)
        bit.x += bit.speed * 0.7; // Moving right
        bit.y += bit.speed;       // Moving down

        // Reset position if out of bounds
        // Resetting to top or left to continue the diagonal flow
        if (bit.x > canvas.width + 50 || bit.y > canvas.height + 50) {
           const enterFromTop = Math.random() > 0.5;
           
           if (enterFromTop) {
               bit.x = Math.random() * canvas.width;
               bit.y = -50;
           } else {
               bit.x = -50;
               bit.y = Math.random() * canvas.height;
           }
           
          bit.trail = [];
          bit.value = Math.random() > 0.5 ? '1' : '0';
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ background: 'linear-gradient(to bottom, #0a051e, #1a0b2e, #2d1b4e)' }}
    />
  );
}
