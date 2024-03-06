'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { adminMenuPaths } from '@/constants/menuPaths';

import useAuthentication from '@/hooks/useAuthentication';

import { cn } from '@/lib/utils';
import { checkIsActive } from '@/utils/checkActive';

import { Button } from '../shared/ui/button';

export const NavigationTabbar = () => {
  const router = useRouter();
  const path = usePathname();
  const { isAdmin } = useAuthentication();

  return (
    <nav
      id="tabbar"
      className="fixed bottom-0 left-0 z-50 inline-flex h-24 w-full items-center justify-center gap-4 bg-zinc-950 px-4 py-2 shadow-[0px_-2px_40px_0px_rgba(0,0,0,0.10)] md:hidden"
    >
      {isAdmin &&
        adminMenuPaths.map((item) => (
          <Link key={item.label} href={item.path} className="w-full">
            <Button
              size="icon"
              className={cn('flex gap-2 size-16 w-full p-3 flex-col items-center h-full')}
            >
              <item.icon
                className={cn('size-5', {
                  'text-orange-500': checkIsActive(item.path, path, true),
                })}
              />
              <span
                className={cn('text-xs', {
                  'text-white bg-zinc-900/50 font-semibold': checkIsActive(item.path, path, true),
                  'text-zinc-400 font-medium': !checkIsActive(item.path, path, true),
                })}
              >
                {item.label}
              </span>
            </Button>
          </Link>
        ))}
    </nav>
  );
};
