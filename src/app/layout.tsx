import { cn } from '@/lib/utils';

import '@/styles/globals.css';

import type { Metadata } from 'next';

import { GeistSans } from 'geist/font/sans';

import { ModalProvider } from '@/components/providers/modal-provider';
import { Toaster } from '@/components/shared/ui/toaster';

export const metadata: Metadata = {
  title: 'Escola Vôlei',
  description: 'Escolinha Vôlei',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(GeistSans.className)}>
        <ModalProvider />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
