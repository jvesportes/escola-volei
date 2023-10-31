'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { ClassType, Turma } from '@/utils/types';
import { Trash2Icon } from 'lucide-react';
interface Props {
  turma: ClassType;
}

export const ExcluirTurmaMenuItem = ({ turma }: Props) => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('excluirTurma', { turma });
      }}
      className="gap-2 text-red-500"
    >
      Excluir <Trash2Icon className="h-4 w-4" />
    </DropdownMenuItem>
  );
};
