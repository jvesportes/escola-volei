'use client';

import { useState } from 'react';

import { historicoColumns } from '@/components/core/tables/turmas/turma/historico/historico-columns';
import { HistoricoDataTable } from '@/components/core/tables/turmas/turma/historico/historico-data-table';
import { Button } from '@/components/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';

import { useModal } from '@/hooks/use-modal-store';

import { Presence } from '@/utils/types';

export const HistoricoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === 'historicoAlunoTurma';

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar w-[95%] overflow-scroll rounded-lg bg-white p-4 md:w-[80%] md:p-6">
        <DialogHeader className="items-center justify-center py-4 md:py-6">
          <DialogTitle className="text-2xl font-extrabold text-slate-900 md:text-5xl">
            Histórico de Presença
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full">
          <div className="flex w-full flex-col items-center">
            <h3 className="w-full pb-2">{data?.student?.nome}</h3>
            <div className="flex w-full items-center gap-1.5">
              <HistoricoDataTable
                columns={historicoColumns}
                data={data?.presences as unknown as Presence[]}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="py-4">
          <div className="flex w-full items-center justify-end gap-2">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Fechar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
