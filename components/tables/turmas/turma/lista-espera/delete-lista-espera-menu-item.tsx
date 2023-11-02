'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { WaitListStudent } from '@/services/api/class/type';
import { Trash2Icon } from 'lucide-react';
import { FC } from 'react';
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
      Excluir <Trash2Icon className="h-4 w-4" />
    </DropdownMenuItem>
  );
};
