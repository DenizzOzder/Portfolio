/**
 * Utility to resolve technology names to their corresponding Devicon SVG paths.
 * Returns undefined if no exact or generic match is found.
 */
export const TECH_ICON_MAP: Record<string, string> = {
  // HTML / CSS
  'html': 'html5/html5-original.svg',
  'html5': 'html5/html5-original.svg',
  'html/css': 'html5/html5-original.svg',
  'css': 'css3/css3-original.svg',
  'css3': 'css3/css3-original.svg',
  'sass': 'sass/sass-original.svg',
  'scss': 'sass/sass-original.svg',
  'less': 'less/less-plain-wordmark.svg',
  'tailwind': 'tailwindcss/tailwindcss-original.svg',
  'tailwindcss': 'tailwindcss/tailwindcss-original.svg',
  'bootstrap': 'bootstrap/bootstrap-original.svg',
  'material ui': 'materialui/materialui-original.svg',
  'mui': 'materialui/materialui-original.svg',
  'chakra ui': 'chakraui/chakraui-original.svg',
  'ant design': 'antdesign/antdesign-original.svg',

  // JavaScript / TypeScript ecosystem
  'javascript': 'javascript/javascript-original.svg',
  'js': 'javascript/javascript-original.svg',
  'typescript': 'typescript/typescript-original.svg',
  'ts': 'typescript/typescript-original.svg',

  // React & Frameworks
  'react': 'react/react-original.svg',
  'reactjs': 'react/react-original.svg',
  'react native': 'react/react-original.svg',
  'reactnative': 'react/react-original.svg',
  'next.js': 'nextjs/nextjs-original.svg',
  'nextjs': 'nextjs/nextjs-original.svg',
  'next': 'nextjs/nextjs-original.svg',
  'vue': 'vuejs/vuejs-original.svg',
  'vuejs': 'vuejs/vuejs-original.svg',
  'vue.js': 'vuejs/vuejs-original.svg',
  'nuxt': 'nuxtjs/nuxtjs-original.svg',
  'nuxtjs': 'nuxtjs/nuxtjs-original.svg',
  'nuxt.js': 'nuxtjs/nuxtjs-original.svg',
  'angular': 'angular/angular-original.svg',
  'angularjs': 'angular/angular-original.svg',
  'svelte': 'svelte/svelte-original.svg',
  'remix': 'remix/remix-original.svg',
  'solidjs': 'solidjs/solidjs-original.svg',
  'astro': 'astro/astro-original.svg',

  // State Management
  'redux': 'redux/redux-original.svg',
  'zustand': 'react/react-original.svg', // generic fallback mapping to react

  // Backend / Languages
  'node.js': 'nodejs/nodejs-original.svg',
  'nodejs': 'nodejs/nodejs-original.svg',
  'node': 'nodejs/nodejs-original.svg',
  'express': 'express/express-original.svg',
  'expressjs': 'express/express-original.svg',
  'express.js': 'express/express-original.svg',
  'nestjs': 'nestjs/nestjs-original.svg',
  'nest': 'nestjs/nestjs-original.svg',
  'nest.js': 'nestjs/nestjs-original.svg',
  'python': 'python/python-original.svg',
  'py': 'python/python-original.svg',
  'django': 'django/django-plain.svg',
  'flask': 'flask/flask-original.svg',
  'java': 'java/java-original.svg',
  'spring': 'spring/spring-original.svg',
  'spring boot': 'spring/spring-original.svg',
  'c#': 'csharp/csharp-original.svg',
  'csharp': 'csharp/csharp-original.svg',
  '.net': 'dot-net/dot-net-original.svg',
  'dotnet': 'dot-net/dot-net-original.svg',
  'c++': 'cplusplus/cplusplus-original.svg',
  'cpp': 'cplusplus/cplusplus-original.svg',
  'go': 'go/go-original.svg',
  'golang': 'go/go-original.svg',
  'rust': 'rust/rust-original.svg',
  'php': 'php/php-original.svg',
  'laravel': 'laravel/laravel-original.svg',
  'ruby': 'ruby/ruby-original.svg',
  'ruby on rails': 'rails/rails-original-wordmark.svg',
  'rails': 'rails/rails-original-wordmark.svg',
  'swift': 'swift/swift-original.svg',
  'kotlin': 'kotlin/kotlin-original.svg',
  'dart': 'dart/dart-original.svg',
  'flutter': 'flutter/flutter-original.svg',

  // Databases
  'mongodb': 'mongodb/mongodb-original.svg',
  'mongo': 'mongodb/mongodb-original.svg',
  'mysql': 'mysql/mysql-original.svg',
  'postgresql': 'postgresql/postgresql-original.svg',
  'postgres': 'postgresql/postgresql-original.svg',
  'sql': 'mysql/mysql-original.svg',
  'sql server': 'microsoftsqlserver/microsoftsqlserver-plain.svg',
  'redis': 'redis/redis-original.svg',

  // Cloud & DevOps
  'firebase': 'firebase/firebase-plain.svg',
  'docker': 'docker/docker-original.svg',
  'kubernetes': 'kubernetes/kubernetes-plain.svg',
  'k8s': 'kubernetes/kubernetes-plain.svg',
  'aws': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
  'amazon web services': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
  'azure': 'azure/azure-original.svg',
  'google cloud': 'googlecloud/googlecloud-original.svg',
  'gcp': 'googlecloud/googlecloud-original.svg',
  'linux': 'linux/linux-original.svg',
  'ubuntu': 'ubuntu/ubuntu-original.svg',

  // Tooling / Other
  'git': 'git/git-original.svg',
  'github': 'github/github-original.svg',
  'gitlab': 'gitlab/gitlab-original.svg',
  'figma': 'figma/figma-original.svg',
  'webpack': 'webpack/webpack-original.svg',
  'vite': 'vitejs/vitejs-original.svg',
  'postman': 'postman/postman-original.svg',
  'insomnia': 'insomnia/insomnia-original.svg',
  'vercel': 'vercel/vercel-original.svg',
  'visual studio': 'visualstudio/visualstudio-plain.svg',
  'vscode': 'vscode/vscode-original.svg',
  'jwt': 'jsonwebtokens/jsonwebtokens-original.svg',
  'json web token': 'jsonwebtokens/jsonwebtokens-original.svg',
  'npm': 'npm/npm-original-wordmark.svg',
  'yarn': 'yarn/yarn-original.svg',
  'pnpm': 'pnpm/pnpm-original.svg',
  
  // APIs
  'graphql': 'graphql/graphql-plain.svg',
  'rest api': 'azuresqldatabase/azuresqldatabase-original.svg', // generic database fallback
  'rest': 'azuresqldatabase/azuresqldatabase-original.svg',
  
  // Mobile
  'android': 'android/android-original.svg',
  'ios': 'apple/apple-original.svg',

  // Specific Requests
  'chart.js': 'javascript/javascript-original.svg', // Devicon lacks ChartJS naturally, fallback to generic JS context
  'chartjs': 'javascript/javascript-original.svg',  
};

/**
 * Resolves a technology name (case-insensitive, trims spaces) 
 * to its corresponding Devicon SVG path.
 * 
 * @param name - The technology name (e.g., 'TypeScript', 'TS', ' ReactJs ')
 * @returns The CDN path snippet (e.g., 'typescript/typescript-original.svg'), or undefined.
 */
export function resolveIconName(name: string): string | undefined {
  if (!name) return undefined;
  
  // Normalize exactly to lowercase and trim spaces
  const normalized = name.toLowerCase().trim();
  
  // Direct match in the dictionary
  if (TECH_ICON_MAP[normalized]) {
    return TECH_ICON_MAP[normalized];
  }

  // Fallback: Check if the string without spaces matches (e.g. "React JS" -> "reactjs")
  const noSpaceNormalized = normalized.replace(/\s+/g, '');
  if (TECH_ICON_MAP[noSpaceNormalized]) {
    return TECH_ICON_MAP[noSpaceNormalized];
  }

  // No match
  return undefined;
}
