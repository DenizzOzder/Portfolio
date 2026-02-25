import React, { useState } from 'react';
import { useNavigate, useLocation, type Location } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Giriş başarılı, yönlendiriliyorsunuz...');
      
      // Restore previous route or default to dashboard
      const state = location.state as { from?: Location } | null;
      const from = state?.from?.pathname || '/admin';
      
      // Small delay for toast
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Giriş yapılırken bir hata oluştu');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050010] p-4 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
         <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
               Admin Login
            </h1>
            <p className="text-gray-400 text-sm font-medium">Lütfen yönetici bilgilerinizi giriniz</p>
         </div>

         <form onSubmit={handleLogin} className="space-y-6">
            <div>
               <label className="block text-sm font-bold text-gray-300 mb-2">E-posta Adresi</label>
               <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  placeholder="admin@example.com"
                  required
               />
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-300 mb-2">Şifre</label>
               <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
               />
            </div>

            <button 
               type="submit" 
               disabled={isLoading}
               className={`w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center shadow-xl transition-all duration-300 ${
                 isLoading ? 'bg-purple-600/50 text-white/50 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 hover:-translate-y-1 hover:shadow-purple-500/25'
               }`}
            >
               {isLoading ? (
                  <span className="flex items-center gap-2">
                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Giriş Yapılıyor...
                  </span>
               ) : 'Sisteme Giriş Yap'}
            </button>
         </form>

         <div className="mt-8 text-center text-xs text-gray-600">
             &copy; {new Date().getFullYear()} Deniz Özder Portfolio Manager
         </div>
      </div>
    </div>
  );
};

export default Login;
