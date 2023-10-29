'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { alunos } from '@/utils/types';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ListaEsperaDataTable } from '@/components/tables/turmas/turma/lista-espera/lista-espera-data-table';
import { ListaEsperaColumns } from '@/components/tables/turmas/turma/lista-espera/lista-espera-columns';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { HistoricoDataTable } from '@/components/tables/turmas/turma/historico/historico-data-table';
import { historicoColumns } from '@/components/tables/turmas/turma/historico/historico-columns';

export const HistoricoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === 'historicoAlunoTurma';

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-scroll md:p-6 p-4 rounded-lg no-scrollbar md:w-[80%] w-[95%]">
        <DialogHeader className="justify-center items-center md:py-6 py-4">
          <DialogTitle className="text-slate-900 font-extrabold md:text-5xl text-2xl">
            Histórico de Presença
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full">
          <div className="flex flex-col w-full items-center">
            <h3 className="pb-2 w-full">{data?.aluno?.aluno.nome}</h3>
            <div className="flex gap-1.5 w-full items-center">
              <HistoricoDataTable
                columns={historicoColumns}
                data={data?.aluno?.presenca || []}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="py-4">
          <div className="flex items-center justify-end w-full gap-2">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Fechar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
