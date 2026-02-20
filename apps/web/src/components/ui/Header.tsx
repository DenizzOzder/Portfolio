import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6 px-4 md:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Deniz Can Özder
        </Link>
        
        <nav className="hidden md:flex gap-8 text-gray-300 font-medium">
            <Link to="/about" className="hover:text-purple-400 transition-colors">Hakkımda</Link>
            <Link to="/projects" className="hover:text-purple-400 transition-colors">Projeler</Link>
            <Link to="/contact" className="hover:text-purple-400 transition-colors">İletişim</Link>
        </nav>

        {/* Mobile Menu Icon (Placeholder) */}
        <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
