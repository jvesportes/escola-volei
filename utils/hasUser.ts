import { UserType } from '.';

export function hasUser() {
  const user = JSON.parse(
    window.localStorage.getItem('@user') || '{}'
  ) as UserType;
  return Object.keys(user).length > 0;
}
