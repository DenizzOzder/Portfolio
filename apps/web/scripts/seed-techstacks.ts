import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TECH_STACKS = [
  { name: 'C#', iconName: 'csharp/csharp-original.svg', sortOrder: 1 },
  { name: 'C++', iconName: 'cplusplus/cplusplus-original.svg', sortOrder: 2 },
  { name: 'Java', iconName: 'java/java-original.svg', sortOrder: 3 },
  { name: 'JavaScript', iconName: 'javascript/javascript-original.svg', sortOrder: 4 },
  { name: 'TypeScript', iconName: 'typescript/typescript-original.svg', sortOrder: 5 },
  { name: 'HTML5', iconName: 'html5/html5-original.svg', sortOrder: 6 },
  { name: 'CSS3', iconName: 'css3/css3-original.svg', sortOrder: 7 },
  { name: 'React', iconName: 'react/react-original.svg', sortOrder: 8 },
  { name: 'Bootstrap', iconName: 'bootstrap/bootstrap-original.svg', sortOrder: 9 },
  { name: 'Node.js', iconName: 'nodejs/nodejs-original.svg', sortOrder: 10 },
  { name: 'MySQL', iconName: 'mysql/mysql-original.svg', sortOrder: 11 },
  { name: 'SQL Server', iconName: 'microsoftsqlserver/microsoftsqlserver-plain.svg', sortOrder: 12 },
  { name: 'MongoDB', iconName: 'mongodb/mongodb-original.svg', sortOrder: 13 },
  { name: 'Firebase', iconName: 'firebase/firebase-plain.svg', sortOrder: 14 },
  { name: 'Redis', iconName: 'redis/redis-original.svg', sortOrder: 15 },
  { name: 'Docker', iconName: 'docker/docker-original.svg', sortOrder: 16 },
  { name: 'Tailwind', iconName: 'tailwindcss/tailwindcss-original.svg', sortOrder: 17 },
  { name: 'Git', iconName: 'git/git-original.svg', sortOrder: 18 },
  { name: 'GitHub', iconName: 'github/github-original.svg', sortOrder: 19 },
  { name: 'Postman', iconName: 'postman/postman-original.svg', sortOrder: 20 },
  { name: 'Figma', iconName: 'figma/figma-original.svg', sortOrder: 21 },
  { name: 'Vercel', iconName: 'vercel/vercel-original.svg', sortOrder: 22 },
  { name: 'REST API', iconName: 'azuresqldatabase/azuresqldatabase-original.svg', sortOrder: 23 },
  { name: 'Visual Studio', iconName: 'visualstudio/visualstudio-plain.svg', sortOrder: 24 },
];

async function seedTechStacks() {
  console.log('--- Seeding TechStacks to Firestore ---');
  const col = collection(db, 'techstacks');
  for (const tech of TECH_STACKS) {
    const ref = doc(col);
    await setDoc(ref, tech);
    console.log(`✅ ${tech.name}`);
  }
  console.log('🎉 Done!');
  process.exit(0);
}

seedTechStacks().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
