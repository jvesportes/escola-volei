"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const EditAlunoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "editAluno";

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-scroll md:p-6 p-4 rounded-lg no-scrollbar">
        <DialogHeader className="justify-center items-center md:py-6 py-4">
          <DialogTitle className="text-slate-900 font-extrabold md:text-5xl text-2xl">
            Editar Aluno
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:gap-8 gap-4">
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
              <Label htmlFor="telefone">Telefone</Label>
              <Input type="text" id="telefone" placeholder="Telefone" />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="cpf">CPF</Label>
              <Input type="text" id="cpf" placeholder="CPF" />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="unidade">Unidade</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Selecione uma unidade"
                    className="text-slate-500"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensal">Zona Sul</SelectItem>
                  <SelectItem value="trimestral">Zona Leste</SelectItem>
                  <SelectItem value="semestral">Zona Norte</SelectItem>
                  <SelectItem value="anual">Zona Oeste</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className="md:my-8 my-2" />
          <div className="flex flex-col md:gap-6 gap-4">
            <div className="flex flex-row gap-2 items-center">
              <h3>Responsável</h3>
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
        <DialogFooter className="px-6 py-4">
          <div className="flex items-center justify-end w-full gap-2">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancelar
            </Button>
            <Button disabled={isLoading}>Salvar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
