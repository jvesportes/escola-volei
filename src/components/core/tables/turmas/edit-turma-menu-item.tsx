'use client';

import { Edit } from 'lucide-react';

import { DropdownMenuItem } from '@/components/shared/ui/dropdown-menu';

import { useModal } from '@/hooks/use-modal-store';

import { ClassType } from '@/utils/types';

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
      Editar <Edit className="size-4 text-slate-500" />{' '}
    </DropdownMenuItem>
  );
};
