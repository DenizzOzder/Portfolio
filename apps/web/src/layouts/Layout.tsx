import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import { SpaceBackground } from '@/components/SpaceBackground'

export const Layout = () => (
  <div className="relative min-h-screen text-white font-sans selection:bg-purple-500/30">
    <SpaceBackground />
    <div className="relative z-10">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  </div>
)
