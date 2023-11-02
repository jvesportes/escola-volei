'use client';

import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';
import { hasRoleAccess } from '@/utils';
import { Apple, HomeIcon, LogOut, User, Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export const NavigationTabbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { onOpen: abrirModal } = useModal();
  const isDashboardPage = pathname == '/dashboard';
  const isAlunosPage = pathname == '/dashboard/alunos';
  const isTurmasPage = pathname == '/dashboard/turmas';
  const isProfessoresPage = pathname == '/dashboard/professores';

  return (
    <div className="bg-white flex flex-row p-4 rounded-tr-lg rounded-tl-lg w-full h-[92px] shadow-[0px_-2px_40px_0px_rgba(0,0,0,0.10)] justify-center items-center gap-6">
      <div
        onClick={() => {
          router.push('/dashboard');
        }}
        className={cn(
          isDashboardPage
            ? 'text-slate-900 border-slate-900 border-b'
            : 'text-slate-500',
          'flex flex-col items-center h-full p-2  cursor-pointer'
        )}
      >
        <HomeIcon className="h-6 w-6" />
        <span className="text-xs not-italic font-medium leading-5">Início</span>
      </div>
      {hasRoleAccess() && (
        <div
          onClick={() => {
            router.push('/dashboard/alunos');
          }}
          className={cn(
            isAlunosPage
              ? 'text-slate-900 border-slate-900 border-b'
              : 'text-slate-500',
            'flex flex-col items-center h-full p-2  cursor-pointer'
          )}
        >
          <User className="h-6 w-6" />
          <span className="text-xs not-italic font-medium leading-5">
            Alunos
          </span>
        </div>
      )}

      <div
        onClick={() => {
          router.push('/dashboard/turmas');
        }}
        className={cn(
          isTurmasPage
            ? 'text-slate-900 border-slate-900 border-b'
            : 'text-slate-500',
          'flex flex-col items-center h-full p-2  cursor-pointer'
        )}
      >
        <Users className="h-6 w-6" />
        <span className="text-xs not-italic font-medium leading-5">Turmas</span>
      </div>
      {hasRoleAccess() && (
        <div
          onClick={() => {
            router.push('/dashboard/professores');
          }}
          className={cn(
            isProfessoresPage
              ? 'text-slate-900 border-slate-900 border-b'
              : 'text-slate-500',
            'flex flex-col items-center h-full p-2  cursor-pointer'
          )}
        >
          <Apple className="h-6 w-6" />
          <span className="text-xs not-italic font-medium leading-5">
            Professores
          </span>
        </div>
      )}
      <div
        onClick={() => {
          abrirModal('logout');
        }}
        className="flex flex-col items-center h-full p-2 text-slate-500 cursor-pointer"
      >
        <LogOut className="h-6 w-6" />
        <span className="text-xs not-italic font-medium leading-5">Sair</span>
      </div>
    </div>
  );
};
