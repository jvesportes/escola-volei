import { AuthTokenResponsePassword } from '@supabase/supabase-js';

import { IUser } from '@/services/entities/user/model';

export interface AuthenticationContextType {
  isAdmin: boolean;
  hasUser: boolean;
  user: IUser | null;
  handleLogin: (data: AuthTokenResponsePassword) => void;
  handleLogout: () => void;
}

export interface AuthenticationProviderProps {
  children: React.ReactNode;
}
