import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6 px-4 md:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 relative z-50">
        <a 
          href="/" 
          onClick={handleLogoClick} 
          className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 hover:scale-105 transition-transform"
        >
            Deniz Can Özder
        </a>
        
        <nav className="hidden md:flex gap-8 text-gray-300 font-medium">
            <a href="#about" onClick={(e) => handleNavigation(e, 'about')} className="hover:text-purple-400 transition-colors cursor-pointer">Hakkımda</a>
            <a href="#projects" onClick={(e) => handleNavigation(e, 'projects')} className="hover:text-purple-400 transition-colors cursor-pointer">Projeler</a>
            <a href="#contact" onClick={(e) => handleNavigation(e, 'contact')} className="hover:text-purple-400 transition-colors cursor-pointer">İletişim</a>
        </nav>

        {/* Mobile Menu Icon */}
        <button 
          className="md:hidden text-white hover:text-purple-400 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#050010]/95 backdrop-blur-lg z-40 transition-all duration-300 flex flex-col items-center justify-center md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col gap-8 text-2xl text-gray-300 font-medium text-center">
            <a href="#about" onClick={(e) => handleNavigation(e, 'about')} className="hover:text-purple-400 transition-colors cursor-pointer">Hakkımda</a>
            <a href="#projects" onClick={(e) => handleNavigation(e, 'projects')} className="hover:text-purple-400 transition-colors cursor-pointer">Projeler</a>
            <a href="#contact" onClick={(e) => handleNavigation(e, 'contact')} className="hover:text-purple-400 transition-colors cursor-pointer">İletişim</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
