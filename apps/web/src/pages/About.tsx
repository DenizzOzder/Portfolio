import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAboutData } from '@/hooks/useAbout';
import { useGlobalLoaderSync } from '@/hooks/useGlobalLoaderSync';

const About = () => {
  const { data: rows = [], isLoading } = useAboutData();
  useGlobalLoaderSync(isLoading, 'Hikayem Yükleniyor...');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Framer Motion constraints for text decoding or sliding
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <div className="w-full min-h-screen bg-[#050010] text-white overflow-hidden pb-24">
      
      {/* Hero Header */}
      <div className="relative w-full pt-40 pb-20 px-4 md:px-8 flex flex-col items-center justify-center text-center">
        {/* Abstract background blur effect for hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <motion.h1 
          className="relative z-10 text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-gray-400 tracking-tight drop-shadow-lg mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          Benim Hikayem
        </motion.h1>
        
        <motion.p 
          className="relative z-10 text-gray-400 text-lg md:text-xl max-w-2xl font-medium"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          Kodların arkasındaki vizyonu, tasarımın ardındaki felsefeyi ve bu yolculukta beni motive eden detayları keşfedin.
        </motion.p>
      </div>

      {/* Zig-Zag Rows Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-24 md:gap-32 mt-10">
        {rows.map((row) => {
          const isLeftImage = row.imagePosition === 'left';
          
          return (
            <div 
              key={row.id} 
              className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${
                isLeftImage ? '' : 'md:flex-row-reverse'
              }`}
            >
              
              {/* Image Column */}
              <motion.div 
                className="w-full md:w-1/2 relative group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={isLeftImage ? slideInLeft : slideInRight}
              >
                {/* Image Glow/Shadow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                
                <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-black/50">
                  <img 
                    src={row.imageUrl} 
                    alt={row.title || 'About Image'} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050010]/80 via-transparent to-transparent opacity-60"></div>
                </div>
              </motion.div>

              {/* Text Column */}
              <motion.div 
                className="w-full md:w-1/2 flex flex-col justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={isLeftImage ? slideInRight : slideInLeft} // Text animation comes from the opposite side
              >
                {row.title && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-md">
                    {row.title}
                  </h2>
                )}
                
                <div className="prose prose-invert prose-lg text-gray-300 leading-relaxed font-light">
                  {/* To handle simple newlines safely in React */}
                  {row.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default About;
