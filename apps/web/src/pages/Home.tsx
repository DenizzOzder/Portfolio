import Hero from '@/components/ui/Hero'
import { AboutMe } from '@/components/ui/AboutMe'
import { Education } from '@/components/ui/Education'
import { TechStack } from '@/components/ui/TechStack'
import { Careers } from '@/components/ui/Careers'
import { FeaturedProjects } from '@/components/ui/FeaturedProjects'
import { ContactForm } from '@/components/ui/ContactForm'

const Home = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden scroll-smooth bg-[#050010]">
      {/* Hero section */}
      <div className="relative w-full min-h-screen z-10">
        <Hero />
        {/* Soft edge transparent blend going into the next section */}
        <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-[#050010] to-transparent pointer-events-none z-20"></div>
      </div>
      
      {/* TechStack section - negative margin to pull it UP slightly under the gradient mask */}
      <div className="relative w-full min-h-screen -mt-10 pt-10 z-0">
        <TechStack />
        {/* Smooth transition from TechStack to Careers */}
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-b from-transparent to-[#050010] pointer-events-none z-20"></div>
      </div>
      {/* Featured Projects section */}
      <FeaturedProjects />
      {/* Careers Section */}
      <div className="-mt-16 relative z-10 w-full">
        <Careers />
      </div>

      {/* About Me Section */}
      <div className="relative z-10 w-full">
        <AboutMe />
      </div>

      {/* Education Section */}
      <div className="-mt-16 relative z-10 w-full mb-10 md:mb-20">
        <Education />
      </div>

      {/* Contact Form */}
      <ContactForm />

    </div>
  )
}

export default Home
