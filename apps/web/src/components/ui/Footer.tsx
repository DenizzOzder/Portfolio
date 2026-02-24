export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-8 text-center bg-[#05001a] text-gray-400 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-4">
        <button 
          onClick={scrollToTop}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
          aria-label="Yukarı Çık"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Deniz Özder. Bütün hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};
