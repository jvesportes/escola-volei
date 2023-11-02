'use client';
import { GoBackButton } from '@/components/navigation/go-back-button';
import { ExcluirAlunoTurmaMenuItem } from '@/components/tables/turmas/turma/delete-turma-aluno-menu-item';
import { HistoricoAlunoTurmaMenuItem } from '@/components/tables/turmas/turma/historico-turma-aluno-menu-item';
import { turmaColumns } from '@/components/tables/turmas/turma/turma-columns';
import { SingleTurmaDataTable } from '@/components/tables/turmas/turma/turma-data-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useClass } from '@/hooks/class/useClass';
import { usePresences } from '@/hooks/student/usePresences';
import { useModal } from '@/hooks/use-modal-store';
import { api } from '@/services';
import { hasRoleAccess, hasUser } from '@/utils';
import { StudentClassType } from '@/utils/types';
import { lightFormat } from 'date-fns';
import { FileText, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  if (!hasUser()) router.push('/');

  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const user = {};
  const newTurmaColumns = [...turmaColumns];
  newTurmaColumns.push({
    accessorKey: 'presenca.presencas',
    header: 'Presença',
    cell: ({ row }) => {
      const studentClass: any = row.original;
      const isPresent =
        studentClass.presenca !== undefined &&
        studentClass.presenca.presencas[0].data ===
          lightFormat(new Date(), 'yyyy-MM-dd') &&
        studentClass.presenca.presencas[0].estaPresente;
      const handlePresence = async () => {
        try {
          const result = await api.class.handleStudentPresence(
            turma?.id!,
            studentClass.id
          );
          if (result.error) throw new Error('Erro ao dar presença ao aluno.');
          window.location.reload();
        } catch (error) {
          toast({
            title: 'Erro ao dar presença ao aluno.',
            description: (error as Error).message,
            variant: 'destructive',
          });
          console.log('[PRESENÇA ALUNO TURMA ERROR]', error);
        }
      };
      return (
        <div className="items-top flex space-x-2">
          <Checkbox
            id="terms1"
            checked={isPresent ? true : false}
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
  if (hasRoleAccess()) {
    newTurmaColumns.push({
      id: 'ações',
      accessorKey: 'Ações',
      header: 'Ações',
      cell: ({ row }) => {
        const aluno = row.original;
        const { data: presences, isLoading: isPresencesLoading } = usePresences(
          turma?.id!,
          aluno.id!
        );
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
                presences={presences!}
                student={aluno}
              />
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
        const { data: presences, isLoading: isPresencesLoading } = usePresences(
          turma?.id!,
          aluno.id!
        );
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
                presences={presences!}
                student={aluno}
              />
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
        {isLoading ? (
          <></>
        ) : (
          <div className="flex flex-col md:gap-6 gap-4 w-full">
            <div className="flex flex-row justify-between">
              <h1>{turma?.nome}</h1>
              {hasRoleAccess() && (
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
