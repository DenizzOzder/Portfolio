import { BlackHoleBackground } from '../effects/BlackHoleBackground';

// Organized Tech Data for Inverse Pyramid Layout with CDN/Devicon mapping
const techGroups = [
  // Top Row (9 items)
  [
    { name: 'C#', iconName: 'csharp/csharp-original.svg' },
    { name: 'C++', iconName: 'cplusplus/cplusplus-original.svg' },
    { name: 'Java', iconName: 'java/java-original.svg' },
    { name: 'JavaScript', iconName: 'javascript/javascript-original.svg' },
    { name: 'TypeScript', iconName: 'typescript/typescript-original.svg' },
    { name: 'HTML5', iconName: 'html5/html5-original.svg' },
    { name: 'CSS3', iconName: 'css3/css3-original.svg' },
    { name: 'React', iconName: 'react/react-original.svg' },
    { name: 'Bootstrap', iconName: 'bootstrap/bootstrap-original.svg' }
  ],
  // Second Row (7 items)
  [
    { name: 'Node.js', iconName: 'nodejs/nodejs-original.svg' },
    { name: 'MySQL', iconName: 'mysql/mysql-original.svg' },
    { name: 'SQL Server', iconName: 'microsoftsqlserver/microsoftsqlserver-plain.svg' },
    { name: 'MongoDB', iconName: 'mongodb/mongodb-original.svg' },
    { name: 'Firebase', iconName: 'firebase/firebase-plain.svg' },
    { name: 'Redis', iconName: 'redis/redis-original.svg' },
    { name: 'Docker', iconName: 'docker/docker-original.svg' }
  ],
  // Third Row (5 items)
  [
    { name: 'Tailwind', iconName: 'tailwindcss/tailwindcss-original.svg' },
    { name: 'Git', iconName: 'git/git-original.svg' },
    { name: 'GitHub', iconName: 'github/github-original.svg' },
    { name: 'Postman', iconName: 'postman/postman-original.svg' },
    { name: 'Figma', iconName: 'figma/figma-original.svg' }
  ],
  // Fourth Row (3 items)
  [
    { name: 'Vercel', iconName: 'vercel/vercel-original.svg' },
    { name: 'REST API', iconName: 'azuresqldatabase/azuresqldatabase-original.svg' }, // generic standin
    { name: 'Office', iconName: 'microsoftsqlserver/microsoftsqlserver-plain.svg' } // Msiocrosoft alternative
  ],
  // Bottom Row (1 item)
  [
    { name: 'Visual Studio', iconName: 'visualstudio/visualstudio-plain.svg' } // Replace with a focal point
  ]
];

export const TechStack = () => {
  return (
    <section 
      id="techstack" 
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-4 overflow-hidden snap-center"
    >
      <BlackHoleBackground />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl">
            Teknoloji Yığını
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Geliştirme sürecinde güvendiğim ve deneyim sahibi olduğum modern araçlar, diller ve mimariler.
          </p>
        </div>

        {/* Pyramid Layout Container */}
        <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
          {techGroups.map((group, rowIndex) => (
            <div 
              key={`row-${rowIndex}`} 
              className="flex flex-wrap justify-center gap-4 md:gap-6 w-full"
            >
              {group.map((tech) => (
                <div 
                  key={tech.name}
                  className={`
                    group relative flex flex-col items-center justify-center 
                    w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 
                    bg-white/10 backdrop-blur-md
                    border border-white/10 rounded-2xl md:rounded-[20px]
                    transition-all duration-300 ease-out
                    hover:-translate-y-2 hover:bg-white/20 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]
                    cursor-pointer
                  `}
                >
                  <img 
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.iconName}`} 
                      alt={tech.name}
                      className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 opacity-80 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
                      onError={(e) => {
                         // Fallback empty or custom SVG if unpkg fails
                         e.currentTarget.style.display = 'none';
                         e.currentTarget.parentElement?.querySelector('.fallback-text')?.classList.remove('hidden');
                      }}
                  />
                  
                  <span className="fallback-text hidden text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                    {tech.name.substring(0,2)}
                  </span>

                  <span className="text-[10px] md:text-xs font-medium text-gray-500 group-hover:text-gray-200 transition-colors mt-2 text-center px-1 leading-tight">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
