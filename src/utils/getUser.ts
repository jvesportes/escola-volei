import { IUser } from '@/services/entities/user/model';

export function getUser() {
  if (typeof window === 'undefined') return null;

  const user = localStorage.getItem('@user');
  if (typeof user === 'string') {
    return JSON.parse(user) as IUser;
  }

  return null;
}
