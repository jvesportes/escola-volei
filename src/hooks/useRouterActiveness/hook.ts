import { usePathname } from 'next/navigation';

import { RouteActivenessProps } from './type';

export function useRouterActiveness(expectedRoute: RouteActivenessProps[]) {
  const pathname = usePathname();

  return expectedRoute.map((route) => {
    const isActive =
      route.mode === 'exact' ? pathname === route.expected : pathname.includes(route.expected);

    return isActive;
  });
}
