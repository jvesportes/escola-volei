'use client';

import { NavigationSidebar } from '@/components/navigation/navigation-sidebar';
import { NavigationTabbar } from '@/components/navigation/navigation-tabbar';
import { useSidebar } from '@/hooks/use-sidebar-store';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

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
      <div className="hidden md:flex h-full z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <div className="md:hidden z-30 sticky h-0 inset-y-0 inset-x-0 top-[calc(100%_-_92px)]">
        <NavigationTabbar />
      </div>
      <main
        className={cn(
          isOpen ? 'md:pl-[256px]' : 'md:pl-[138px]',
          'h-full bg-slate-50'
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
