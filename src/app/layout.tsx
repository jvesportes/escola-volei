import { cn } from '@/lib/utils';

import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ModalProvider } from '@/components/core/providers/modal-provider';
import { Toaster } from '@/components/shared/ui/toaster';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Escola Vôlei',
  description: 'Escolinha Vôlei',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(font.className)}>
        <ModalProvider />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
