'use client';

import { useRouter } from 'next/navigation';

import { useClasses } from '@/hooks';
import { MoreHorizontal, UsersIcon } from 'lucide-react';

import { ExcluirTurmaMenuItem } from '@/components/core/tables/turmas/delete-turma-menu-item';
import { EditTurmaMenuItem } from '@/components/core/tables/turmas/edit-turma-menu-item';
import { turmasColumns } from '@/components/core/tables/turmas/turmas-columns';
import { TurmaDataTable } from '@/components/core/tables/turmas/turmas-data-table';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

import useAuthentication from '@/hooks/useAuthentication';

import { ClassType } from '@/utils/types';

const TurmasPage = () => {
  const { hasUser, isAdmin } = useAuthentication();
  const router = useRouter();
  if (!hasUser) router.push('/');

  const { data: turmas, isLoading } = useClasses();

  const newTurmasColumns = [...turmasColumns];

  if (isAdmin) {
    newTurmasColumns.push({
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const turma: ClassType = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">
                <MoreHorizontal className="size-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Editar</DropdownMenuLabel>
              <EditTurmaMenuItem turma={turma} />
              <DropdownMenuSeparator />
              <ExcluirTurmaMenuItem turma={turma} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });
  }

  return (
    <div className="flex flex-col gap-12">
      <header className="inline-flex items-center gap-4 bg-zinc-950 px-4 py-16 text-white md:px-12">
        <div className="inline-flex size-11 items-center justify-center rounded-lg bg-indigo-100 md:size-12">
          <UsersIcon className="size-5 min-w-5 text-indigo-400 md:size-6" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold md:text-2xl">Turmas</h1>
          <p className="text-sm text-zinc-400">Tenha acesso aos controle de turmas.</p>
        </div>
      </header>
      <div className="flex flex-col gap-2 px-12 md:gap-4">
        {isLoading ? <div></div> : <TurmaDataTable columns={newTurmasColumns} data={turmas} />}
      </div>
    </div>
  );
};

export default TurmasPage;
