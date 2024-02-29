'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import { cn } from '@/lib/utils';

export const GoBackButton = ({ disabled = false }: { disabled: boolean }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push('/dashboard');
      }}
      className={cn(
        disabled && 'pointer-events-none opacity-0',
        'flex flex-row gap-2 pb-2 text-slate-900 items-center cursor-pointer',
      )}
    >
      <ArrowLeft className="size-4" strokeWidth={3} />
      <span className="text-[14px] font-medium leading-5">Voltar</span>
    </div>
  );
};
