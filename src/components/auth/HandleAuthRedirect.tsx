'use client';

import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const publicRoutes = ['/login', '/signup', '/'];

export function HandleAuthRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = publicRoutes.includes(pathname);

    if (!user && !isPublicRoute) {
      const next = pathname + '?' + searchParams.toString();
      router.push(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [user, loading, router, pathname, searchParams]);

  return null; // This component does not render anything
}
