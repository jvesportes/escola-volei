'use client';

import { Button } from '@/components/shared/ui/button';

import { useModal } from '@/hooks/use-modal-store';

import { Payment, Student } from '@/utils/types';

interface PagamentoAlunoButtonProps {
  pagamento: Payment[];
  student: Student;
}

export const PagamentoAlunoButton = ({ pagamento, student }: PagamentoAlunoButtonProps) => {
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
      variant={situacao === '-' ? 'ghost' : situacao === 'Atrasado' ? 'destructive' : 'green'}
      size={'sm'}
    >
      {situacao}
    </Button>
  );
};
