'use client';

import { Trash2Icon } from 'lucide-react';

import { DropdownMenuItem } from '@/components/shared/ui/dropdown-menu';

import { useModal } from '@/hooks/use-modal-store';

import { Payment } from '@/utils/types';

interface DeletePagmaentoAlunoMenuItemProps {
  payment: Payment;
}

export const DeletePagmaentoAlunoMenuItem = ({ payment }: DeletePagmaentoAlunoMenuItemProps) => {
  const { onOpen } = useModal();

  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('excluirPagamentoAluno', { payment });
      }}
      className="gap-2 text-red-500"
    >
      Excluir <Trash2Icon className="size-4" />
    </DropdownMenuItem>
  );
};
