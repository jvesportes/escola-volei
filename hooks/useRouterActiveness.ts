import { usePathname } from "next/navigation";

export function useRouterActiveness(expectedRoute: string | string[]) {
  const pathname = usePathname();

  if (Array.isArray(expectedRoute)) {
    return expectedRoute.map((route) => pathname.includes(route));
  }

  return pathname.includes(expectedRoute)
}
