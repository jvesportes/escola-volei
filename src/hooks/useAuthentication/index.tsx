'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { IUser } from '@/services/entities/user/model';

import { GetUser } from '@/utils/getUser';

import { AuthenticationContextType, AuthenticationProviderProps } from './interface';

export const AuthenticationContext = createContext<AuthenticationContextType | undefined>(
  undefined,
);

export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    setUser(GetUser());
  }, []);

  const hasUser = user ? Object.keys(user).length > 0 : false;
  const isAdmin = user?.user_metadata?.tipo === 'admin';

  const contextValue = {
    isAdmin,
    hasUser,
    user,
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
