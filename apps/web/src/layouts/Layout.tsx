import { Outlet } from 'react-router-dom'
import Header from '@/components/ui/Header'
import { FloatingActionGroup } from '@/components/ui/FloatingActionGroup'

export const Layout = () => (
  <div className="relative min-h-screen text-white font-sans selection:bg-purple-500/30">
    <FloatingActionGroup />
    <div className="relative z-10">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  </div>
)
