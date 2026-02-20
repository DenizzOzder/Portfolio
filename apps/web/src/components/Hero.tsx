import { Icon } from './Icon';

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] -z-10"></div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                Full Stack
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 animate-gradient">
                Developer
            </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl font-light">
            Web uygulamaları ve dijital deneyimler geliştiriyorum
        </p>

        <div className="flex flex-col items-center gap-6">
            <div className="flex gap-6">
                <a href="#projects" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-105 inline-block cursor-pointer">
                    Projelerim
                </a>
                <a href="#about" className="px-8 py-4 bg-transparent border border-gray-600 hover:border-purple-500 text-white rounded-2xl font-medium transition-all hover:bg-purple-900/20 inline-block cursor-pointer">
                    Hakkımda
                </a>
            </div>
            
            <div className="flex gap-4 mt-2">
                <a 
                    href="https://www.linkedin.com/in/denizozder1/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 hover:border-purple-500 text-white rounded-xl transition-all hover:bg-purple-900/20 hover:scale-110"
                    aria-label="LinkedIn"
                >
                    <Icon name="linkedin" className="w-6 h-6" fill="currentColor" />
                </a>
                <a 
                    href="https://github.com/DenizzOzder" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 hover:border-purple-500 text-white rounded-xl transition-all hover:bg-purple-900/20 hover:scale-110"
                    aria-label="GitHub"
                >
                    <Icon name="github" className="w-6 h-6" fill="currentColor" />
                </a>
            </div>
        </div>
    </section>
  )
}

export default Hero
