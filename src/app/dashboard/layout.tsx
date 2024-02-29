/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useEffect, useState } from 'react';

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
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 hidden h-full flex-col md:flex">
        <NavigationSidebar />
      </div>
      <div className="sticky inset-0 top-[calc(100%_-_92px)] z-30 h-0 md:hidden">
        <NavigationTabbar />
      </div>
      <main className={cn(isOpen ? 'md:pl-[256px]' : 'md:pl-[138px]', 'h-full bg-slate-50')}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
