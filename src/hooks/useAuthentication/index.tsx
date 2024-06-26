/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';

import { IUser } from '@/services/entities/user/model';

import { Database } from '@/lib/database.types';
import { getUser } from '@/utils/getUser';

import { AuthenticationContextType, AuthenticationProviderProps } from './interface';

export const AuthenticationContext = createContext<AuthenticationContextType | undefined>(
  undefined,
);

export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<IUser | null>(getUser);
  const router = useRouter();
  const pathName = usePathname();

  const hasUser = user ? Object.keys(user).length > 0 : false;
  const isAdmin = user?.user_metadata?.tipo === 'admin';

  if (typeof window === 'undefined') return null;

  useEffect(() => {
    if (!user) {
      router.replace('/');

      return;
    }
    if (!pathName.includes('/dashboard')) {
      router.replace('/dashboard');

      return;
    }
  }, [pathName, router, user]);

  function handleLogin(data: AuthTokenResponsePassword) {
    localStorage.setItem('@user', JSON.stringify(data.data.user));
    setUser(getUser());
    router.push('/dashboard');
  }

  function handleLogout() {
    supabase.auth.signOut();
    localStorage.removeItem('@user');
    setUser(null);
    router.replace('/');
  }

  const contextValue = {
    isAdmin,
    hasUser,
    user,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>{children}</AuthenticationContext.Provider>
  );
};

const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('useAuthenticationContext must be used within a AuthenticationProvider');
  }

  return context;
};

export default useAuthentication;
