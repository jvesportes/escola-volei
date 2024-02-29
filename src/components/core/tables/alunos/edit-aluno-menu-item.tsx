'use client';

import { Edit } from 'lucide-react';

import { DropdownMenuItem } from '@/components/shared/ui/dropdown-menu';

import { useModal } from '@/hooks/use-modal-store';

import { Student } from '@/utils/types';

interface Props {
  student: Student;
}

export const EditAlunoMenuItem = ({ student }: Props) => {
  const { onOpen } = useModal();

  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('editAluno', { student });
      }}
      className="gap-2"
    >
      Editar <Edit className="size-4 text-slate-500" />{' '}
    </DropdownMenuItem>
  );
};
