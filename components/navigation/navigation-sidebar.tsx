'use client';
import { Separator } from '../ui/separator';
import { Avatar } from '../ui/avatar';
import {
  Apple,
  Home,
  LogOut,
  User,
  Users,
  ChevronsLeftRight,
} from 'lucide-react';
import { useSidebar } from '@/hooks/use-sidebar-store';
import { cn } from '@/lib/utils';
import image from '@/public/logo.png';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import Image from 'next/image';
import { useRouterActiveness } from '@/hooks';
import { hasRoleAccess } from '@/utils';

// melhorias --> adicionar tooltip, aumentar o padding dos icones quando fechada e animação de abrir e fechar.
export const NavigationSidebar = () => {
  const { isOpen, onOpen } = useSidebar();
  const { onOpen: abrirModal } = useModal();
  const user = {};

  const [isDashboardPage, isAlunosPage, isTurmasPage, isProfessoresPage] =
    useRouterActiveness([
      {
        expected: '/dashboard',
        mode: 'exact',
      },
      {
        expected: 'alunos',
      },
      {
        expected: 'turmas',
      },
      {
        expected: 'professores',
      },
    ]);

  const router = useRouter();
  return (
    <aside
      className={cn(
        isOpen && 'w-64',
        'flex flex-col h-full items-center z-50 gap-8 border-r bg-background px-4 pt-16 pb-8 shadow-lg transition-all'
      )}
    >
      <Avatar className="w-[105px] h-[105px] border">
        <Image src={image} alt="logo" />
      </Avatar>
      <Separator />

      <nav
        className={cn(
          isOpen && 'w-full',
          'flex flex-col gap-2 h-full transition'
        )}
      >
        <button
          onClick={() => onOpen()}
          className="absolute top-[187px] right-[-14px] bg-white p-[6px] border rounded-lg text-slate-500 cursor-pointer"
        >
          <ChevronsLeftRight className="w-4 h-4" />
        </button>
        <a
          onClick={() => {
            router.push('/dashboard');
          }}
          className={cn(
            isDashboardPage && 'text-slate-900 bg-slate-100',
            'flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition cursor-pointer'
          )}
        >
          <Home
            className={cn(
              isDashboardPage ? 'text-slate-900' : 'text-slate-500',
              'w-6 h-6'
            )}
          />
          {isOpen && (
            <span
              className={cn(
                isDashboardPage ? 'text-slate-900' : 'text-slate-500',
                'leading-6 text-xl'
              )}
            >
              Início
            </span>
          )}
        </a>
        {hasRoleAccess() && (
          <a
            onClick={() => {
              router.push('/dashboard/alunos');
            }}
            className={cn(
              isAlunosPage && 'text-slate-900 bg-slate-100',
              'flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition cursor-pointer'
            )}
          >
            <User
              className={cn(
                isAlunosPage ? 'text-slate-900' : 'text-slate-500',
                'w-6 h-6'
              )}
            />
            {isOpen && (
              <span
                className={cn(
                  isAlunosPage ? 'text-slate-900' : 'text-slate-500',
                  'leading-6 text-xl'
                )}
              >
                Alunos
              </span>
            )}
          </a>
        )}
        <a
          onClick={() => {
            router.push('/dashboard/turmas');
          }}
          className={cn(
            isTurmasPage && 'text-slate-900 bg-slate-100',
            'flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition cursor-pointer'
          )}
        >
          <Users
            className={cn(
              isTurmasPage ? 'text-slate-900' : 'text-slate-500',
              'w-6 h-6'
            )}
          />
          {isOpen && (
            <span
              className={cn(
                isTurmasPage ? 'text-slate-900' : 'text-slate-500',
                'leading-6 text-xl'
              )}
            >
              Turmas
            </span>
          )}
        </a>
        {hasRoleAccess() && (
          <a
            onClick={() => {
              router.push('/dashboard/professores');
            }}
            className={cn(
              isProfessoresPage && 'text-slate-900 bg-slate-100',
              'flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition cursor-pointer'
            )}
          >
            <Apple
              className={cn(
                isProfessoresPage ? 'text-slate-900' : 'text-slate-500',
                'w-6 h-6'
              )}
            />
            {isOpen && (
              <span
                className={cn(
                  isProfessoresPage ? 'text-slate-900' : 'text-slate-500',
                  'leading-6 text-xl'
                )}
              >
                Professores
              </span>
            )}
          </a>
        )}
      </nav>
      <Separator />
      <button
        onClick={() => {
          abrirModal('logout');
        }}
        className={cn(
          isOpen && 'w-full',
          'flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900  rounded-full transition cursor-pointer'
        )}
      >
        <LogOut className="w-6 h-6 " />
        {isOpen && <span className=" leading-6 text-xl">Sair</span>}
      </button>
    </aside>
  );
};
