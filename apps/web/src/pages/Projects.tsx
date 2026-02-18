const Projects = () => {
    return (
      <div className="pt-32 px-4 md:px-12 min-h-screen text-white">
        <h1 className="text-4xl font-bold mb-8">Projelerim</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors group">
              <div className="h-48 bg-gray-800 rounded-xl mb-4 overflow-hidden">
                {/* Project Image Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Proje İsmi {item}</h3>
              <p className="text-gray-400 text-sm">Proje açıklaması buraya gelecek.</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default Projects
