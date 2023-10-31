'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { ClassType, Turma } from '@/utils/types';
import { Edit } from 'lucide-react';
interface Props {
  turma: ClassType;
}

export const EditTurmaMenuItem = ({ turma }: Props) => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('editTurma', { turma });
      }}
      className="gap-2"
    >
      Editar <Edit className="h-4 w-4 text-slate-500" />{' '}
    </DropdownMenuItem>
  );
};
