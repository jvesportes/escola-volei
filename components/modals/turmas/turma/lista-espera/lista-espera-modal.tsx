"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { alunos } from "@/utils/types";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ListaEsperaDataTable } from "@/components/tables/turmas/turma/lista-espera/lista-espera-data-table";
import { ListaEsperaColumns } from "@/components/tables/turmas/turma/lista-espera/lista-espera-columns";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ListaEsperaModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "listaEspera";

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-scroll md:p-6 p-4 rounded-lg no-scrollbar">
        <DialogHeader className="justify-center items-center md:py-6 py-4">
          <DialogTitle className="text-slate-900 font-extrabold md:text-5xl text-2xl">
            Lista de Espera
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <h3 className="pb-2">{data.turma?.nome}</h3>
          <div className="flex w-full  items-center gap-1.5 justify-center">
            <ListaEsperaDataTable
              columns={ListaEsperaColumns}
              data={data?.turma?.listaEspera || []}
            />
          </div>
          <Separator className="my-4 md:my-8" />
          <div className="flex flex-col md:gap-6 gap-4">
            <div className="flex flex-row gap-2 items-center">
              <h3>Adicionar Aluno</h3>
              <span className="font-semibold text-slate-900 text-xs uppercase">
                OPCIONAL
              </span>
            </div>
            <div className="grid md:grid-cols-[repeat(2,1fr)] grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-x-2 gap-y-2 md:gap-x-8 md:gap-y-4">
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="nome">Nome</Label>
                <Input type="text" id="nome" placeholder="Nome" />
              </div>
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" placeholder="Email" />
              </div>

              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="telefone">Telefone</Label>
                <Input type="text" id="telefone" placeholder="Telefone" />
              </div>
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="cpf">CPF</Label>
                <Input type="text" id="cpf" placeholder="CPF" />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="py-4">
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
