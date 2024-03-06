import { IUser } from '@/services/entities/user/model';

export function GetUser() {
  return JSON.parse(localStorage.getItem('@user') || '{}') as IUser;
}
