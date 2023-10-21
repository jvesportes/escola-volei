'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { Professor } from '@/utils/types';
import { Trash2Icon } from 'lucide-react';

interface ExcluirProfessorMenuItemProps {
  professor: Professor;
}

export const ExcluirProfessorMenuItem = ({
  professor,
}: ExcluirProfessorMenuItemProps) => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('excluirProfessor', { professor });
      }}
      className="gap-2 text-red-500"
    >
      Excluir <Trash2Icon className="h-4 w-4" />
    </DropdownMenuItem>
  );
};
