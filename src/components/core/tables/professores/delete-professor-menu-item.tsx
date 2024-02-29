'use client';

import { Trash2Icon } from 'lucide-react';

import { DropdownMenuItem } from '@/components/shared/ui/dropdown-menu';

import { useModal } from '@/hooks/use-modal-store';

import { Teacher } from '@/utils/types';

interface ExcluirProfessorMenuItemProps {
  teacher: Teacher;
}

export const ExcluirProfessorMenuItem = ({ teacher }: ExcluirProfessorMenuItemProps) => {
  const { onOpen } = useModal();

  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('excluirProfessor', { teacher });
      }}
      className="gap-2 text-red-500"
    >
      Excluir <Trash2Icon className="size-4" />
    </DropdownMenuItem>
  );
};
