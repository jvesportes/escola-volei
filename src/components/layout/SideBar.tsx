'use client';

import Image from 'next/image';
import Link from 'next/link';

import { adminMenuPaths } from '@/constants/menuPaths';
import LogoHorizontal from '@assets/images/logo-horizontal.svg';
import LogoIcon from '@assets/images/logo-icon.svg';
import { ChevronsLeftRight, LogOut } from 'lucide-react';

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

import { cn } from '@/lib/utils';
import { hasRoleAccess } from '@/utils';

export const NavigationSidebar = () => {
  const { isOpen, onOpen } = useSidebar();
  const { onOpen: openModalLogout } = useModal();

  return (
    <aside
      className={cn(
        'z-50 fixed inset-y-0 flex h-full flex-col items-center gap-8 border-r bg-zinc-950 pt-12 pb-8',
        {
          'w-16 px-2': !isOpen,
          'w-64 px-4': isOpen,
        },
        'transition-all ease',
      )}
    >
      <TooltipProvider>
        <Link href="/">
          <Image
            src={isOpen ? LogoHorizontal : LogoIcon}
            alt="JV Esportes"
            className={cn({
              'size-12': !isOpen,
              'w-fit h-12': isOpen,
            })}
          />
        </Link>

        <Separator className="bg-white/10" />

        <nav className={cn('flex size-full flex-col gap-2', 'ease transition-all')}>
          <Button
            aria-label={isOpen ? 'Comprimir Menu' : 'Expandir Menu'}
            onClick={() => onOpen()}
            size="icon"
            className="absolute -right-7 top-24 border border-zinc-600 bg-zinc-800 text-zinc-400"
          >
            <ChevronsLeftRight className="size-5" />
          </Button>

          {hasRoleAccess() &&
            adminMenuPaths.map((item) => (
              <Tooltip key={item.label} disableHoverableContent={isOpen}>
                <TooltipTrigger>
                  <Link href={item.path} className="w-full">
                    <Button
                      size={isOpen ? 'default' : 'icon'}
                      className={cn('inline-flex w-full gap-4', {
                        'justify-start': isOpen,
                        'justify-center': !isOpen,
                      })}
                    >
                      <item.icon className="size-5" />
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
          <Separator className="bg-white/10" />
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
