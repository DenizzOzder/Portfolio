const Contact = () => {
    return (
      <div className="pt-32 px-4 md:px-12 min-h-screen text-white flex justify-center">
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
          <h1 className="text-3xl font-bold mb-6">İletişime Geç</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Ad Soyad</label>
              <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" placeholder="Adınız" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">E-posta</label>
              <input type="email" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" placeholder="ornek@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Mesaj</label>
              <textarea rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" placeholder="Mesajınız..."></textarea>
            </div>
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors">
              Gönder
            </button>
          </form>
        </div>
      </div>
    )
  }
  
  export default Contact
