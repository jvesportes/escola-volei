'use client';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { Aluno, Pagamento, Payment, Student } from '@/utils/types';
import { Trash2Icon } from 'lucide-react';

interface PagamentoAlunoButtonProps {
  pagamento: Payment[];
  student: Student;
}

export const PagamentoAlunoButton = ({
  pagamento,
  student,
}: PagamentoAlunoButtonProps) => {
  const { onOpen } = useModal();
  const situacao =
    pagamento[0] === null || pagamento[0] === undefined
      ? '-'
      : new Date(pagamento[0].vigencia) < new Date()
      ? 'Atrasado'
      : 'Em dia';
  return (
    <Button
      className="w-20"
      onClick={() => {
        onOpen('pagamentoAluno', { student });
      }}
      variant={
        situacao === '-'
          ? 'ghost'
          : situacao === 'Atrasado'
          ? 'destructive'
          : 'green'
      }
      size={'sm'}
    >
      {situacao}
    </Button>
  );
};
