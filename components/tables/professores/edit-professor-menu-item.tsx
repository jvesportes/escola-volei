'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { Professor } from '@/utils/types';
import { Edit } from 'lucide-react';

interface EditProfessorMenuItemProps {
  professor: Professor;
}

export const EditProfessorMenuItem = ({
  professor,
}: EditProfessorMenuItemProps) => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('editProfessor', { professor });
      }}
      className="gap-2"
    >
      Editar <Edit className="h-4 w-4 text-slate-500" />{' '}
    </DropdownMenuItem>
  );
};
