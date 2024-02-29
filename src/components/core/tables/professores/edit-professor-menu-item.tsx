'use client';

import { Edit } from 'lucide-react';

import { DropdownMenuItem } from '@/components/shared/ui/dropdown-menu';

import { useModal } from '@/hooks/use-modal-store';

import { Teacher } from '@/utils/types';

interface EditProfessorMenuItemProps {
  teacher: Teacher;
}

export const EditProfessorMenuItem = ({ teacher }: EditProfessorMenuItemProps) => {
  const { onOpen } = useModal();

  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('editProfessor', { teacher });
      }}
      className="gap-2"
    >
      Editar <Edit className="size-4 text-slate-500" />{' '}
    </DropdownMenuItem>
  );
};
