export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-10 text-center bg-[#050010] relative z-20 mt-10">
      {/* Decorative top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-6">
        <button 
          onClick={scrollToTop}
          className="p-3 rounded-full transition-all duration-300 group bg-white/5 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:-translate-y-1 border border-white/5 hover:border-purple-500/30"
          aria-label="Yukarı Çık"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400 group-hover:text-pink-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        <p className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          &copy; {new Date().getFullYear()} Deniz Özder. Bütün hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};
