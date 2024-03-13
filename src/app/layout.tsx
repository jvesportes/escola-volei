import { cn } from '@/lib/utils';

import '@/styles/globals.css';

import type { Metadata } from 'next';

import { GeistSans } from 'geist/font/sans';

import { ModalProvider } from '@/components/providers/modal-provider';
import MultiContextProvider from '@/components/providers/MultiContextProvider';
import { Toaster } from '@/components/shared/ui/sonner';

import { AuthenticationProvider } from '@/hooks/useAuthentication';

export const metadata: Metadata = {
  title: 'Escola Vôlei',
  description: 'Escolinha Vôlei',
};

const providers = [AuthenticationProvider];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(GeistSans.className, 'scroll-smooth')}>
        <Toaster richColors />
        <MultiContextProvider providers={providers}>
          {children}
          <ModalProvider />
        </MultiContextProvider>
      </body>
    </html>
  );
}
