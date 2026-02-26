import React from 'react';
import { useTranslation } from 'react-i18next';
import LightPillar from '../effects/LightPillar';
import avatarImg from '../../assets/avatar.png';
const Hero = () => {
  const { t } = useTranslation();
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden snap-center">
        {/* Background Animation */}
        <div className="absolute inset-0 -z-20">
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>

        {/* Hero Content Layer */}
        <div className="relative z-10 flex flex-col items-center mt-12">
            {/* Glow Effects */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-600/30 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] -z-10"></div>

            <div className="mb-6 relative group">
                <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl group-hover:bg-purple-400/50 transition-colors duration-500"></div>
                <img 
                    src={avatarImg} 
                    alt="Deniz Can Özder" 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-[center_top] border-4 border-white/10 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105"
                    style={{ paddingLeft: '18px' }}
                />
            </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 drop-shadow-2xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                {t('hero.title')}
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-purple-400 animate-gradient drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                {t('hero.subtitle')}
            </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl font-medium drop-shadow-md">
            {t('hero.description')}
        </p>

        <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4 md:gap-6 flex-col md:flex-row w-full md:w-auto px-4">
                <a 
                  href="#projects" 
                  onClick={(e) => handleScrollTo(e, 'projects')}
                  className="px-8 py-4 w-full md:w-auto bg-white hover:bg-gray-100 text-purple-900 rounded-2xl font-bold shadow-xl shadow-white/10 transition-all hover:scale-105 inline-flex items-center justify-center cursor-pointer"
                >
                    {t('nav.projects')}
                </a>
                <a 
                  href="#about" 
                  onClick={(e) => handleScrollTo(e, 'about')}
                  className="px-8 py-4 w-full md:w-auto bg-black/40 backdrop-blur-md border border-gray-400 hover:border-white text-white rounded-2xl font-bold transition-all hover:bg-black/60 inline-flex items-center justify-center cursor-pointer"
                >
                    {t('nav.about')}
                </a>
            </div>
        </div>
        </div>
    </section>
  )
}

export default Hero
