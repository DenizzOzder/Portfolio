import Particles from '../effects/Particles';

import { TechBadge } from './TechBadge';

const experiences = [
  {
    id: 1,
    title: 'Backend Developer',
    company: 'Bimakas',
    date: '2026 – Present',
    description: `TypeScript tabanlı Layered Architecture (Katmanlı Mimari: GraphQL Resolvers → Services → Repositories → Firebase) yapısında görev alıyor, sistemin geneline yeni feature'lar geliştiriyor ve servislerin optimizasyonunu sağlıyorum. Firebase üzerine kurgulanmış, güçlü ve ölçeklenebilir altyapıda modüller tasarlayarak süreçleri hızlandırıyorum. Görev aldığım ilk günden itibaren sorumluluklarımı production-ready standartlarda teslim ediyor; TypeScript ekosistemine hızlı adaptasyonumla aktif geliştirme döngüsüne değer katıyorum.`,
    techStacks: [
      'Katmanlı Mimari (GraphQL Resolvers → Services → Repositories → Firebase)',
      'TypeScript',
      'Firebase',
      'GraphQL'
    ]
  },
  {
    id: 2,
    title: 'System Administrator',
    company: '',
    date: '2022 – Present',
    description: `Sistem operasyonlarının devamlılığını sağlarken yazılım ekibiyle dirsek teması halinde çalışıyor, bug triage ve haftalık teknik raporlama süreçlerini uçtan uca yönetiyorum. Kritik sistemsel düzeydeki hataları henüz kullanıcıya yansımadan tespit ederek geliştirme ekiplerine iletiyor ve çözüm adımlarını yakından takip ediyorum. Hem teknik analiz hem de kriz anlarındaki problem çözme süreçlerinde inisiyatif alarak sistem kararlılığını artırıyorum.`,
    techStacks: [
      'HTML/CSS'
    ]
  }
];

export const Careers = () => {
  return (
    <section id="careers" className="relative w-full min-h-screen py-12 md:py-20 overflow-hidden bg-transparent flex flex-col items-center justify-center z-10 w-full">
      
      {/* Background Particles Container */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8 z-10 flex flex-col items-center max-w-7xl">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Deneyim
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-purple-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  {" "}& Kariyer
              </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Profesyonel yolculuğumdaki dönüm noktaları ve üstlendiğim görevlerim.</p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full">
          {/* Vertical Line Desktop - exactly in the middle */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-600/80 via-pink-500/80 to-transparent transform md:-translate-x-1/2 rounded-full hidden md:block" />

          {/* Vertical Line Mobile - on the left */}
          <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-600/80 via-pink-500/80 to-transparent rounded-full md:hidden block" />

          {/* Cards */}
          <div className="flex flex-col gap-8 md:gap-12 relative">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={exp.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:justify-start' : 'md:justify-end'} w-full pl-16 md:pl-0`}>
                  
                  {/* Timeline Dot (Mobile & Desktop) */}
                  <div className={`absolute md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.8)] z-20 border-4 border-[#050010] ${isEven ? 'left-6' : 'left-6'} md:block`} />

                  {/* Card Content Wrapper */}
                  <div className={`w-full md:w-[48%] ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                    <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-pink-500/50 hover:bg-white/[0.06] hover:-translate-y-1 relative group">
                      
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />

                      <div className="mb-4 text-center">
                        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-pink-300 uppercase bg-pink-500/10 rounded-full border border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.1)]">
                          {exp.date}
                        </span>
                        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                          {exp.title}
                        </h3>
                        {exp.company && (
                          <h4 className="text-xl font-semibold text-purple-300">
                            {exp.company}
                          </h4>
                        )}
                      </div>

                      <p className="text-gray-300 mb-8 leading-relaxed text-center font-medium">
                        {exp.description}
                      </p>

                      <div className="flex flex-col items-center gap-4 mt-8">
                        {/* Tech Stack Icons & Badges */}
                        <div className="flex flex-wrap gap-4 justify-center">
                          {exp.techStacks.map((t, idx) => (
                            <TechBadge key={idx} tech={t} />
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
