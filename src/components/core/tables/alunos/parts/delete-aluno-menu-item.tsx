'use client';

import { Trash2Icon } from 'lucide-react';

import { DropdownMenuItem } from '@/components/shared/ui/dropdown-menu';

import { useModal } from '@/hooks/use-modal-store';

import { Student } from '@/utils/types';

interface Props {
  student: Student;
}
export const ExcluirAlunoMenuItem = ({ student }: Props) => {
  const { onOpen } = useModal();

  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('excluirAluno', { student });
      }}
      className="gap-2 text-red-500"
    >
      Excluir <Trash2Icon className="size-4" />
    </DropdownMenuItem>
  );
};
