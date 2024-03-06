'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { adminMenuPaths } from '@/constants/menuPaths';
import LogoHorizontal from '@assets/images/logo-horizontal.svg';
import LogoIcon from '@assets/images/logo-icon.svg';
import { ChevronRight, LogOut } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';
import { Separator } from '@/components/shared/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shared/ui/tooltip';

import { useModal } from '@/hooks/use-modal-store';
import { useSidebar } from '@/hooks/use-sidebar-store';
import useAuthentication from '@/hooks/useAuthentication';

import { cn } from '@/lib/utils';
import { checkIsActive } from '@/utils/checkActive';

export const NavigationSidebar = () => {
  const { isOpen, onOpen } = useSidebar();
  const { onOpen: openModalLogout } = useModal();
  const { isAdmin } = useAuthentication();
  const path = usePathname();

  return (
    <aside
      className={cn(
        'hidden z-50 fixed inset-y-0 md:flex h-full flex-col items-center gap-8 border-r border-zinc-900 bg-zinc-950 pt-12 pb-8',
        {
          'w-16 px-2': !isOpen,
          'w-64 px-4': isOpen,
        },
        'transition-all ease',
      )}
    >
      <TooltipProvider>
        <Link href="/dashboard" passHref>
          <Image
            src={isOpen ? LogoHorizontal : LogoIcon}
            alt="JV Esportes"
            className={cn({
              'size-12': !isOpen,
              'w-fit h-12': isOpen,
            })}
          />
        </Link>

        <nav className={cn('flex size-full flex-col gap-2', 'ease transition-all')}>
          <Button
            aria-label={isOpen ? 'Comprimir Menu' : 'Expandir Menu'}
            onClick={() => onOpen()}
            size="icon"
            className="absolute -right-8 top-24 border border-zinc-800 bg-zinc-900 text-zinc-400"
          >
            <ChevronRight
              className={cn('size-5, transition-all duration-500', {
                '-rotate-180': isOpen,
              })}
            />
          </Button>

          {isAdmin &&
            adminMenuPaths.map((item) => (
              <Tooltip key={item.label} disableHoverableContent={isOpen}>
                <TooltipTrigger>
                  <Link href={item.path} className="w-full">
                    <Button
                      size={isOpen ? 'default' : 'icon'}
                      className={cn(
                        'inline-flex w-full gap-4 border border-zinc-900/50 hover:bg-zinc-900/50',
                        {
                          'justify-start': isOpen,
                          'justify-center': !isOpen,
                          'text-white bg-zinc-900/50 font-semibold': checkIsActive(
                            item.path,
                            path,
                            true,
                          ),
                          'text-zinc-400 font-medium': !checkIsActive(item.path, path, true),
                        },
                      )}
                    >
                      <item.icon
                        className={cn('size-5', {
                          'text-orange-500': checkIsActive(item.path, path, true),
                          'text-white': !checkIsActive(item.path, path, true),
                        })}
                      />
                      {isOpen && item.label}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
        </nav>
        <div className="flex w-full flex-col gap-4">
          <Separator className="bg-zinc-900" />
          <Button
            onClick={() => {
              openModalLogout('logout');
            }}
            size={isOpen ? 'default' : 'icon'}
            className="inline-flex w-full gap-4"
          >
            <LogOut className="size-5" />
            {isOpen && 'Sair da conta'}
          </Button>
        </div>
      </TooltipProvider>
    </aside>
  );
};
