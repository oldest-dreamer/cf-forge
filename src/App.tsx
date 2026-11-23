import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { RequireAuth, GuestOnly } from '@/components/RequireAuth';
import { ForgeLoader } from '@/components/ForgeLoader';
import { AccountProvider } from '@/lib/account';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

const Auth = lazy(() => import('@/pages/Auth'));
const Contests = lazy(() => import('@/pages/Contests'));
const Tags = lazy(() => import('@/pages/Tags'));
const TagDetail = lazy(() => import('@/pages/TagDetail'));
const Problems = lazy(() => import('@/pages/Problems'));
const Problem = lazy(() => import('@/pages/Problem'));
const Learn = lazy(() => import('@/pages/Learn'));
const Profile = lazy(() => import('@/pages/Profile'));
const Playground = lazy(() => import('@/pages/Playground'));

const wrap = (el: ReactNode) => <Suspense fallback={<div className="min-h-[60vh]" />}>{el}</Suspense>;
const guest = (el: ReactNode) => (
  <GuestOnly>
    <Suspense fallback={<ForgeLoader />}>{el}</Suspense>
  </GuestOnly>
);

const router = createBrowserRouter([
  { path: '/login', element: guest(<Auth mode="signin" />) },
  { path: '/signup', element: guest(<Auth mode="signup" />) },
  {
    element: (
      <RequireAuth>
        <AccountProvider>
          <Layout />
        </AccountProvider>
      </RequireAuth>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/contests', element: wrap(<Contests />) },
      { path: '/tags', element: wrap(<Tags />) },
      { path: '/tags/:slug', element: wrap(<TagDetail />) },
      { path: '/problems', element: wrap(<Problems />) },
      { path: '/problems/:id', element: wrap(<Problem />) },
      { path: '/learn', element: wrap(<Learn />) },
      { path: '/profile', element: wrap(<Profile />) },
      { path: '/run', element: wrap(<Playground />) },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
