/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useRouter } from 'next/navigation';

import { lightFormat } from 'date-fns';
import { FileText, MoreHorizontal } from 'lucide-react';

import { ExcluirAlunoTurmaMenuItem } from '@/components/core/tables/turma/delete-turma-aluno-menu-item';
import { HistoricoAlunoTurmaMenuItem } from '@/components/core/tables/turma/historico-turma-aluno-menu-item';
import { turmaColumns } from '@/components/core/tables/turma/turma-columns';
import { SingleTurmaDataTable } from '@/components/core/tables/turma/turma-data-table';
import { Button } from '@/components/shared/ui/button';
import { Card } from '@/components/shared/ui/card';
import { Checkbox } from '@/components/shared/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import { Separator } from '@/components/shared/ui/separator';
import { useToast } from '@/components/shared/ui/use-toast';

import { useClass } from '@/hooks/class/useClass';
import { usePresences } from '@/hooks/student/usePresences';
import { useModal } from '@/hooks/use-modal-store';
import useAuthentication from '@/hooks/useAuthentication';

import { api } from '@/services';

import { StudentClassType } from '@/utils/types';

interface TurmaPageProps {
  params: {
    turmaId: string;
  };
}
const TurmaPage = ({ params }: TurmaPageProps) => {
  const { turmaId } = params;
  const { onOpen } = useModal();
  const { hasUser, isAdmin } = useAuthentication();

  const { data: turma, isLoading } = useClass(turmaId);

  const router = useRouter();
  if (!hasUser) router.push('/');

  const { toast } = useToast();

  const newTurmaColumns = [...turmaColumns];
  newTurmaColumns.push({
    accessorKey: 'presenca.presencas',
    header: 'Presença',
    cell: ({ row }) => {
      const studentClass: any = row.original;
      const isPresent =
        studentClass.presenca !== undefined &&
        studentClass.presenca.presencas[0].data === lightFormat(new Date(), 'yyyy-MM-dd') &&
        studentClass.presenca.presencas[0].estaPresente;
      const handlePresence = async () => {
        try {
          const result = await api.class.handleStudentPresence(turma?.id!, studentClass.id);
          if (result.error) throw new Error('Erro ao dar presença ao aluno.');
          location.reload();
        } catch (error) {
          toast({
            title: 'Erro ao dar presença ao aluno.',
            description: (error as Error).message,
            variant: 'destructive',
          });
          console.error('[PRESENÇA ALUNO TURMA ERROR]', error);
        }
      };

      return (
        <div className="items-top flex space-x-2">
          <Checkbox
            id="terms1"
            checked={!!isPresent}
            onClick={() => {
              handlePresence();
            }}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Presença
            </label>
          </div>
        </div>
      );
    },
  });
  if (isAdmin) {
    newTurmaColumns.push({
      id: 'ações',
      accessorKey: 'Ações',
      header: 'Ações',
      cell: ({ row }) => {
        const aluno = row.original;
        const { data: presences } = usePresences(turma?.id!, aluno.id);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <HistoricoAlunoTurmaMenuItem presences={presences!} student={aluno} />
              <Separator />
              <ExcluirAlunoTurmaMenuItem student={aluno} turma={turma!} />
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
        const { data: presences } = usePresences(turma?.id!, aluno.id);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <HistoricoAlunoTurmaMenuItem presences={presences!} student={aluno} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });
  }

  return (
    <div className="flex size-full flex-col gap-6 overflow-y-scroll scroll-smooth p-4 pb-32 md:gap-12 md:px-16 md:py-6">
      <Card className="w-full p-4 md:p-6">
        {isLoading ? (
          <></>
        ) : (
          <div className="flex w-full flex-col gap-4 md:gap-6">
            <div className="flex flex-row justify-between">
              <h1>{turma?.nome}</h1>
              {isAdmin && (
                <Button
                  size={'sm'}
                  variant={'secondary'}
                  onClick={() => {
                    onOpen('listaEspera', { turma });
                  }}
                >
                  <span className="hidden md:flex">Lista de Espera</span>
                  <FileText className="size-5 text-zinc-900 md:hidden" />
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <SingleTurmaDataTable
                columns={newTurmaColumns}
                data={turma?.alunosTurmas as unknown as StudentClassType[]}
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
