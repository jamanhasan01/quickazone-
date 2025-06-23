'use client';

import { useSession } from 'next-auth/react';
import GlobalLoader from './GlobalLoader';

export default function AuthHandler({ children }) {
  const { status } = useSession();

  if (status === 'loading') {
    return <GlobalLoader />;
  }

  return <>{children}</>;
}