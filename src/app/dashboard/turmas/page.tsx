'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useClasses } from '@/hooks';
import { MoreHorizontal } from 'lucide-react';

import { ExcluirTurmaMenuItem } from '@/components/core/tables/turmas/delete-turma-menu-item';
import { EditTurmaMenuItem } from '@/components/core/tables/turmas/edit-turma-menu-item';
import { turmasColumns } from '@/components/core/tables/turmas/turmas-columns';
import { TurmaDataTable } from '@/components/core/tables/turmas/turmas-data-table';
import { BackButton } from '@/components/layout/BackButton';
import { Button } from '@/components/shared/ui/button';
import { Card } from '@/components/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

import { hasRoleAccess, hasUser } from '@/utils';
import { ClassType } from '@/utils/types';

const TurmasPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  if (!hasUser()) router.push('/');

  const { data: turmas, isLoading } = useClasses();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const newTurmasColumns = [...turmasColumns];

  if (hasRoleAccess()) {
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
    <div className="flex size-full flex-col gap-6 overflow-y-scroll scroll-smooth p-4 pb-32 md:gap-12 md:px-16 md:py-6">
      <div className="flex flex-col">
        <BackButton disabled={false} />
        <h2>Escolinha de Vôlei</h2>
        <span className="text-[14px] leading-5 text-slate-500">Páginas/Turmas</span>
      </div>
      <Card className="w-full p-4 md:p-6">
        <div className="flex w-full flex-col gap-4 md:gap-6">
          <h1>Turmas</h1>
          <div className="flex flex-col gap-2 md:gap-4">
            {isLoading ? <></> : <TurmaDataTable columns={newTurmasColumns} data={turmas} />}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TurmasPage;
