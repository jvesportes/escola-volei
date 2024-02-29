'use client';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  disabled?: boolean;
}

export function BackButton({ disabled = false }: Readonly<Props>) {
  return (
    <Link href="/dashboard">
      <button
        className={cn(
          disabled && 'pointer-events-none opacity-0',
          'inline-flex gap-2 py-2 text-slate-900 items-center',
        )}
      >
        <ArrowLeft className="size-4" />
        Voltar
      </button>
    </Link>
  );
}
