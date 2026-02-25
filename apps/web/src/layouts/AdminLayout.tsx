import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Projeler', path: '/admin/projects' },
    { label: 'Eğitimler', path: '/admin/education' },
    { label: 'Kariyer', path: '/admin/career' },
    { label: 'Sertifikalar', path: '/admin/certificates' },
    { label: 'Profil Ayr.', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen flex w-full bg-[#050010] text-[#f8f8f2]">
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#1a103c',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      }} />
      
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 bg-white/5 border-r border-white/10 flex flex-col">
        <div className="p-6">
          <Link to="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
             Admin Panel
          </Link>
          <p className="text-xs text-gray-500 mt-2 font-medium">Portfolio Manager v1.0</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center w-full px-4 py-3 rounded-xl transition-all font-semibold ${
                  isActive 
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 font-bold transition-all border border-transparent hover:border-red-500/20"
           >
             Güvenli Çıkış
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto w-full relative">
         <div className="p-8 max-w-7xl mx-auto w-full">
            <Outlet />
         </div>
      </main>
    </div>
  );
};
