import { IUser } from '@/services/entities/user/model';

export interface AuthenticationContextType {
  isAdmin: boolean;
  hasUser: boolean;
  user: IUser | null;
}

export interface AuthenticationProviderProps {
  children: React.ReactNode;
}
