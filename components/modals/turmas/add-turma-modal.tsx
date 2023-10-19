"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";

export const AddTurmaModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "addTurma";

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-scroll md:p-6 p-4 rounded-lg no-scrollbar">
        <DialogHeader className="justify-center items-center md:py-6 py-4">
          <DialogTitle className="text-slate-900 font-extrabold md:text-5xl text-2xl">
            Adicionar Turma
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:gap-8 gap-4">
          <div className="grid md:grid-cols-[repeat(2,1fr)] grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-x-2 gap-y-2 md:gap-x-8 md:gap-y-4">
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input type="text" id="nome" placeholder="Nome" />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="professor">Professor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Selecione um professor"
                    className="text-slate-500"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="joao">João</SelectItem>
                  <SelectItem value="julio">Júlio</SelectItem>
                  <SelectItem value="cesar">César</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="horario">Horário</Label>
              <Input type="text" id="horario" placeholder="Horário" />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="unidade">Unidade</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Selecione uma Unidade"
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
