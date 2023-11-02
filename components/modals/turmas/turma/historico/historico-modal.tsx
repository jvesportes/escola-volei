'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useState } from 'react';
import { useModal } from '@/hooks/use-modal-store';

import { Button } from '@/components/ui/button';
import { HistoricoDataTable } from '@/components/tables/turmas/turma/historico/historico-data-table';
import { historicoColumns } from '@/components/tables/turmas/turma/historico/historico-columns';
import { Presence } from '@/utils/types';

export const HistoricoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
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
            <h3 className="pb-2 w-full">{data?.student?.nome}</h3>
            <div className="flex gap-1.5 w-full items-center">
              <HistoricoDataTable
                columns={historicoColumns}
                data={data?.presences as unknown as Presence[]}
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
