import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from '@/layouts/Layout';


// Eagerly load the Home page for instant interaction when possible
import Home from '@/pages/Home';

// Lazy load other pages so they don't block the initial main page bundle
const About = lazy(() => import('@/pages/About'));
const Projects = lazy(() => import('@/pages/Projects'));
const Contact = lazy(() => import('@/pages/Contact'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));

// Suspense fallback for lazy routes
const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-screen w-full bg-[#050010]" />}>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: (
          <LazyRoute>
            <About />
          </LazyRoute>
        ),
      },
      {
        path: "/projects",
        element: (
          <LazyRoute>
            <Projects />
          </LazyRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <LazyRoute>
            <Contact />
          </LazyRoute>
        ),
      },
      {
        path: "/project/:id",
        element: (
          <LazyRoute>
            <ProjectDetail />
          </LazyRoute>
        ),
      },
    ]
  },
]);
