'use client';

import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const publicRoutes = ['/login', '/signup', '/'];

export function HandleAuthRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    if (loading) return;

    const isPublicRoute = publicRoutes.includes(pathname);

    if (!user && !isPublicRoute) {
      const next = pathname + '?' + searchParams.toString();
      router.push(`/login?next=${encodeURIComponent(next)}`);
    }
    
    // Mark the initial check as done
    setIsInitialCheckDone(true);

  }, [user, loading, router, pathname, searchParams]);
  
  // While loading auth state or before the initial client-side check, render nothing.
  // This prevents any server-side rendering attempt of logic that depends on browser APIs.
  if (loading || !isInitialCheckDone) {
      return null;
  }

  return null; // This component does not render anything visible
}
