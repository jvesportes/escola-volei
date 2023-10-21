'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { Pagamento } from '@/utils/types';
import { Trash2Icon } from 'lucide-react';
interface DeletePagmaentoAlunoMenuItemProps {
  pagamento: Pagamento;
}

export const DeletePagmaentoAlunoMenuItem = ({
  pagamento,
}: DeletePagmaentoAlunoMenuItemProps) => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('excluirPagamentoAluno', { pagamento });
      }}
      className="gap-2 text-red-500"
    >
      Excluir <Trash2Icon className="h-4 w-4" />
    </DropdownMenuItem>
  );
};
