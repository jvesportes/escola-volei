'use client';
import { GoBackButton } from '@/components/navigation/go-back-button';
import { ExcluirTurmaMenuItem } from '@/components/tables/turmas/delete-turma-menu-item';
import { EditTurmaMenuItem } from '@/components/tables/turmas/edit-turma-menu-item';
import { turmasColumns } from '@/components/tables/turmas/turmas-columns';
import { TurmaDataTable } from '@/components/tables/turmas/turmas-data-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClasses } from '@/hooks';
import { hasRoleAccess } from '@/utils';
import { ClassType, Turma } from '@/utils/types';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

const TurmasPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { data: turmas, isLoading, error } = useClasses();
  console.log(turmas);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const user = {};
  const newTurmasColumns = [...turmasColumns];
  if (hasRoleAccess('admin', user)) {
    newTurmasColumns.push({
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const turma: ClassType = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">
                <MoreHorizontal className="h-6 w-6" />
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
    <div className="flex w-full h-full md:px-16 md:py-6 md:gap-12 gap-6 p-4 flex-col overflow-y-scroll pb-32 scroll-smooth">
      <div className="flex flex-col">
        <GoBackButton disabled={false} />
        <h2>Escolinha de Vôlei</h2>
        <span className="text-slate-500 text-[14px] leading-5">
          Páginas/Turmas
        </span>
      </div>
      <Card className="md:p-6 p-4 w-full">
        <div className="flex flex-col md:gap-6 gap-4 w-full">
          <h1>Turmas</h1>
          <div className="flex flex-col md:gap-4 gap-2">
            {isLoading ? (
              <></>
            ) : (
              <TurmaDataTable columns={newTurmasColumns} data={turmas} />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TurmasPage;
