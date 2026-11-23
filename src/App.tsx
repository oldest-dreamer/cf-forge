import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

const Contests = lazy(() => import('@/pages/Contests'));
const Tags = lazy(() => import('@/pages/Tags'));
const TagDetail = lazy(() => import('@/pages/TagDetail'));
const Problems = lazy(() => import('@/pages/Problems'));
const Problem = lazy(() => import('@/pages/Problem'));
const Learn = lazy(() => import('@/pages/Learn'));

const wrap = (el: ReactNode) => <Suspense fallback={<div className="min-h-[60vh]" />}>{el}</Suspense>;

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/contests', element: wrap(<Contests />) },
      { path: '/tags', element: wrap(<Tags />) },
      { path: '/tags/:slug', element: wrap(<TagDetail />) },
      { path: '/problems', element: wrap(<Problems />) },
      { path: '/problems/:id', element: wrap(<Problem />) },
      { path: '/learn', element: wrap(<Learn />) },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
