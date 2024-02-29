/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { Fragment, useEffect, useState } from 'react';

import { NavigationSidebar } from '@/components/layout/SideBar';
import { NavigationTabbar } from '@/components/layout/TabBar';

import { useSidebar } from '@/hooks/use-sidebar-store';

import { cn } from '@/lib/utils';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);
  if (typeof window === 'undefined') return null;
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Fragment>
      <NavigationSidebar />
      <div className="h-full">
        <div className="sticky inset-0 top-[calc(100%_-_92px)] z-30 h-0 md:hidden">
          <NavigationTabbar />
        </div>
        <main
          className={cn('min-h-screen h-full bg-slate-50', {
            'md:pl-16': !isOpen,
            'md:pl-64': isOpen,
          })}
        >
          {children}
        </main>
      </div>
    </Fragment>
  );
};

export default MainLayout;
