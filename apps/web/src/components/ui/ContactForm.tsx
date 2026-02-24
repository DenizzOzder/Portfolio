import React from 'react';

export const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder functionality
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="relative w-full py-20 px-4 z-10 bg-[#050010] flex flex-col items-center justify-center border-t border-purple-900/20">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-pink-600/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-2xl w-full mx-auto relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-md">
            İletişime Geçin
          </span>
        </h2>
        <p className="text-gray-400 mb-10 text-lg">Projeniz mi var? Beraber çalışalım.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-purple-200">İsim</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Adınız Soyadınız" 
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors w-full"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-pink-200">E-Posta</label>
              <input 
                type="email" 
                id="email" 
                placeholder="mail@ornek.com" 
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors w-full"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-200">Mesaj</label>
            <textarea 
              id="message" 
              rows={4}
              placeholder="Mesajınız..." 
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors w-full resize-none"
              required
            ></textarea>
          </div>

          <div className="flex justify-center mt-4">
            <button 
              type="submit" 
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:-translate-y-1 transition-all duration-300 w-full md:w-auto min-w-[200px]"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
