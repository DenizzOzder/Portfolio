import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Header from '@/components/ui/Header';
import { FloatingActionGroup } from '@/components/ui/FloatingActionGroup';
import { Footer } from '@/components/ui/Footer';
import { GlobalLoader } from '@/components/ui/GlobalLoader';
import { useEffect } from 'react';

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change or handle custom logic if needed
    // The GlobalLoader is now purely driven by startLoading/stopLoading in components
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-purple-500/30 flex flex-col">
      <GlobalLoader />
      <ScrollRestoration />
      
      <div className="relative z-10 flex-grow flex flex-col">
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Outlet />
        </main>
        
        {/* Footer should be at the bottom of the layout, shown on every page */}
        <Footer />
      </div>
      
      {/* Absolute positioned elements stay outside main flow */}
      <FloatingActionGroup />
    </div>
  );
};
