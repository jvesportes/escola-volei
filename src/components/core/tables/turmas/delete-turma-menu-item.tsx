'use client';

import { Trash2Icon } from 'lucide-react';

import { DropdownMenuItem } from '@/components/shared/ui/dropdown-menu';

import { useModal } from '@/hooks/use-modal-store';

import { ClassType } from '@/utils/types';

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
      Excluir <Trash2Icon className="size-4" />
    </DropdownMenuItem>
  );
};
