import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authClient } from '@/lib/auth';
import { ForgeLoader } from './ForgeLoader';

/** Login is required for the whole site. Signed-out visitors go to /login. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { data, isPending } = authClient.useSession();
  const location = useLocation();

  if (isPending) return <ForgeLoader />;
  if (!data?.user) {
    const next = location.pathname + location.search + location.hash;
    return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />;
  }
  return <>{children}</>;
}

/** Signed-in visitors skip the auth pages. */
export function GuestOnly({ children }: { children: ReactNode }) {
  const { data, isPending } = authClient.useSession();
  const location = useLocation();
  if (isPending) return <ForgeLoader />;
  if (data?.user) {
    const next = new URLSearchParams(location.search).get('next');
    return <Navigate to={next && next.startsWith('/') && !next.startsWith('//') ? next : '/'} replace />;
  }
  return <>{children}</>;
}
