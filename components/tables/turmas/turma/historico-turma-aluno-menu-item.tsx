'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { Presence, Student } from '@/utils/types';
import { FileText } from 'lucide-react';

interface HistoricoAlunoTurmaMenuItemProps {
  presences: Presence[];
  student: Student;
}

export const HistoricoAlunoTurmaMenuItem = ({
  presences,
  student,
}: HistoricoAlunoTurmaMenuItemProps) => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('historicoAlunoTurma', { presences, student });
      }}
      className="gap-2 text-slate-900 hover:bg-slate-100"
    >
      Histórico <FileText className="h-4 w-4" />
    </DropdownMenuItem>
  );
};
