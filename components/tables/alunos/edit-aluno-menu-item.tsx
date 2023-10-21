'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { Aluno } from '@/utils/types';
import { Edit } from 'lucide-react';

interface Props {
  alunoNormal: Aluno;
}

export const EditAlunoMenuItem = ({ alunoNormal }: Props) => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('editAluno', { alunoNormal });
      }}
      className="gap-2"
    >
      Editar <Edit className="h-4 w-4 text-slate-500" />{' '}
    </DropdownMenuItem>
  );
};
