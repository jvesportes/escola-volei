import { UserType } from '.';

export function hasUser() {
  const user = JSON.parse(
    localStorage.getItem('@user') || '{}'
  ) as UserType;
  return Object.keys(user).length > 0;
}
