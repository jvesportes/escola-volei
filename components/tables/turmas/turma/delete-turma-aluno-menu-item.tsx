'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { ClassType, Student } from '@/utils/types';
import { Trash2Icon } from 'lucide-react';
interface Props {
  student: Student;
  turma: ClassType;
}
export const ExcluirAlunoTurmaMenuItem = ({ student, turma }: Props) => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('excluirAlunoTurma', { student, turma });
      }}
      className="gap-2 text-red-500"
    >
      Excluir <Trash2Icon className="h-4 w-4" />
    </DropdownMenuItem>
  );
};
