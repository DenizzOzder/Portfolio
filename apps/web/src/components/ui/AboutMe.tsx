import { useNavigate } from 'react-router-dom';

export const AboutMe = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center z-10 bg-[#050010] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10 flex flex-col items-center text-center">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-pink-600/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Hakkımda
          </span>
        </h2>
        
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-12 opacity-80"></div>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed md:leading-[1.8] font-medium max-w-4xl mx-auto drop-shadow-md">
          Backend odaklı bir Full Stack geliştirici olarak,{' '}
          <span className="text-purple-300 font-bold drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            GraphQL tabanlı katmanlı mimariler
          </span>{' '}
          üzerinde çalışıyor;{' '}
          <span className="text-pink-300 font-bold drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            React, TypeScript, Firebase
          </span>{' '}
          ve{' '}
          <span className="text-pink-300 font-bold drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            MongoDB
          </span>{' '}
          kullanarak ölçeklenebilir ve sürdürülebilir web uygulamaları geliştiriyorum. Temiz kod, mimari disiplin ve production kalitesinde çözümler üretmeye odaklanıyorum.
        </p>

        <div className="mt-12 flex justify-center">
            <button
                onClick={() => navigate('/about')}
                className="px-8 py-3 bg-white/5 border border-purple-500/30 text-purple-200 font-bold rounded-2xl shadow-lg backdrop-blur-md hover:bg-white/10 hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
            >
                Daha Fazla Bilgi Al
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>

      </div>
    </section>
  );
};
