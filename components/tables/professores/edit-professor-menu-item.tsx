'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { Professor, Teacher } from '@/utils/types';
import { Edit } from 'lucide-react';

interface EditProfessorMenuItemProps {
  teacher: Teacher;
}

export const EditProfessorMenuItem = ({
  teacher,
}: EditProfessorMenuItemProps) => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('editProfessor', { teacher });
      }}
      className="gap-2"
    >
      Editar <Edit className="h-4 w-4 text-slate-500" />{' '}
    </DropdownMenuItem>
  );
};
