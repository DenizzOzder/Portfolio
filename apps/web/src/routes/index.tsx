import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from '@/layouts/Layout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';

// Eagerly load the Home page for instant interaction when possible
import Home from '@/pages/Home';

// Lazy load other pages so they don't block the initial main page bundle
const About = lazy(() => import('@/pages/About'));
const Projects = lazy(() => import('@/pages/Projects'));
const Contact = lazy(() => import('@/pages/Contact'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));

// Lazy load admin pages
const AdminLogin = lazy(() => import('@/pages/admin/Login'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminProjects = lazy(() => import('@/pages/admin/AdminProjects'));
const AdminEducation = lazy(() => import('@/pages/admin/AdminEducation'));
const AdminCareer = lazy(() => import('@/pages/admin/AdminCareer'));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'));
const AdminCertificates = lazy(() => import('@/pages/admin/AdminCertificates').catch(() => {
  // Graceful fallback if file is missing (will create next)
  return { default: () => <div className="p-6 text-white text-center">Sertifikalar Modülü Yapım Aşamasında</div> };
}));
const AdminAbout = lazy(() => import('@/pages/admin/AdminAbout'));

// Suspense fallback for lazy routes
const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-screen w-full bg-[#050010]" />}>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  // Main Public Layout
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
  // Admin App
  {
    path: "/admin/login",
    element: (
      <LazyRoute>
        <AdminLogin />
      </LazyRoute>
    ),
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: (
              <LazyRoute>
                <AdminDashboard />
              </LazyRoute>
            )
          },
          {
            path: "projects",
            element: <LazyRoute><AdminProjects /></LazyRoute>
          },
          {
            path: "education",
            element: <LazyRoute><AdminEducation /></LazyRoute>
          },
          {
            path: "career",
            element: <LazyRoute><AdminCareer /></LazyRoute>
          },
          {
            path: "certificates",
            element: <LazyRoute><AdminCertificates /></LazyRoute>
          },
          {
            path: "about",
            element: <LazyRoute><AdminAbout /></LazyRoute>
          },
          {
            path: "settings",
            element: <LazyRoute><AdminSettings /></LazyRoute>
          },
        ]
      }
    ]
  }
]);
