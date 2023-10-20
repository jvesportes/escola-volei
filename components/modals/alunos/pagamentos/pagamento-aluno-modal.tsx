"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PagamentosDataTable } from "@/components/tables/alunos/pagamentos/pagamentos-data-table";
import { pagamentosColumns } from "@/components/tables/alunos/pagamentos/pagamentos-columns";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const PagamentoAlunoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "pagamentoAluno";

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-hidden md:p-6 p-4 rounded-lg no-scrollbar">
        <DialogHeader className="justify-center items-center md:py-6 py-4">
          <DialogTitle className="text-slate-900 font-extrabold md:text-5xl text-2xl">
            Pagamento Aluno
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full">
          <div className="flex flex-col w-full items-center">
            <h3 className="pb-2 w-full">{data?.alunoNormal?.nome}</h3>
            <div className="flex gap-1.5 w-full items-center">
              <PagamentosDataTable
                columns={pagamentosColumns}
                data={data?.alunoNormal?.pagamentos || []}
              />
            </div>
          </div>
        </div>
        <Separator className="md:my-8 my-2" />
        <div className="flex flex-col md:gap-6 gap-4">
          <div className="flex flex-row gap-2 items-center">
            <h3>Adicionar Pagamento</h3>
            <span className="font-semibold text-slate-900 text-xs uppercase">
              OPCIONAL
            </span>
          </div>
          <div className="grid md:grid-cols-[repeat(2,1fr)] grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-x-2 gap-y-2 md:gap-x-8 md:gap-y-4">
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="dataPagamento">Data de Pagamento</Label>
              <Input
                type="date"
                id="dataPagamento"
                placeholder="Data de Pagamento"
              />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="plano">Plano</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Selecione um plano"
                    className="text-slate-500"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="semestral">Semestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="valor">Valor</Label>
              <Input type="number" id="valor" placeholder="Valor" />
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 py-4">
          <div className="flex items-center justify-end w-full gap-2">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancelar
            </Button>
            <Button disabled={isLoading}>Adicionar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
