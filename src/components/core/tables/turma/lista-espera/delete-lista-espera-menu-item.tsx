'use client';

import { FC } from 'react';

import { Trash2Icon } from 'lucide-react';

import { DropdownMenuItem } from '@/components/shared/ui/dropdown-menu';

import { useModal } from '@/hooks/use-modal-store';

import { WaitListStudent } from '@/services/api/class/type';

type Props = {
  alunoEspera: WaitListStudent;
};

export const ExcluirListaEsperaAlunoMenuItem: FC<Props> = ({ alunoEspera }) => {
  const { onOpen } = useModal();

  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen('excluirAlunoListaEspera', { alunoEspera });
      }}
      className="gap-2 text-red-500"
    >
      Excluir <Trash2Icon className="size-4" />
    </DropdownMenuItem>
  );
};
