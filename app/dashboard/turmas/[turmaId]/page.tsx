'use client';
import { GoBackButton } from '@/components/navigation/go-back-button';
import { ExcluirAlunoTurmaMenuItem } from '@/components/tables/turmas/turma/delete-turma-aluno-menu-item';
import { HistoricoAlunoTurmaMenuItem } from '@/components/tables/turmas/turma/historico-turma-aluno-menu-item';
import { turmaColumns } from '@/components/tables/turmas/turma/turma-columns';
import { SingleTurmaDataTable } from '@/components/tables/turmas/turma/turma-data-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useClass } from '@/hooks/class/useClass';
import { useStudents } from '@/hooks/student/useStudents';
import { useModal } from '@/hooks/use-modal-store';
import { hasRoleAccess } from '@/utils';
import { AlunoTurma, Student, turmas } from '@/utils/types';
import { FileText, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TurmaPageProps {
  params: {
    turmaId: string;
  };
}
const TurmaPage = ({ params }: TurmaPageProps) => {
  const { turmaId } = params;
  const { data, isOpen, onClose, onOpen, type } = useModal();
  const { data: turma, error, isLoading } = useClass(turmaId);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const user = {};
  const newTurmaColumns = [...turmaColumns];
  if (hasRoleAccess('admin', user)) {
    newTurmaColumns.push({
      id: 'ações',
      accessorKey: 'Ações',
      header: 'Ações',
      cell: ({ row }) => {
        const aluno = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <HistoricoAlunoTurmaMenuItem
                student={aluno.aluno as unknown as Student}
              />
              <Separator />
              <ExcluirAlunoTurmaMenuItem
                student={aluno.aluno as unknown as Student}
                turma={turma!}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });
  } else {
    newTurmaColumns.push({
      id: 'ações',
      accessorKey: 'Ações',
      header: 'Ações',
      cell: ({ row }) => {
        const aluno = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <HistoricoAlunoTurmaMenuItem
                student={aluno.aluno as unknown as Student}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });
  }
  //preciso arrumar esses erros, excluir, e passar historico, depois preciso permitir dar presença(em tempo real mudar, sem f5), depois lista de espera( excluir add, e listar) e também adicionar alunos
  // adicionar e excluir turma
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
        {isLoading ? (
          <></>
        ) : (
          <div className="flex flex-col md:gap-6 gap-4 w-full">
            <div className="flex flex-row justify-between">
              <h1>{turma?.nome}</h1>
              {hasRoleAccess('admin', user) && (
                <Button
                  size={'sm'}
                  variant={'secondary'}
                  onClick={() => {
                    onOpen('listaEspera', { turma });
                  }}
                >
                  <span className="md:flex hidden">Lista de Espera</span>
                  <FileText className="text-slate-900 md:hidden w-5 h-5" />
                </Button>
              )}
            </div>
            <div className="flex flex-col md:gap-4 gap-2">
              <SingleTurmaDataTable
                columns={newTurmaColumns}
                data={turma?.presenca!}
                turma={turma!}
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TurmaPage;
