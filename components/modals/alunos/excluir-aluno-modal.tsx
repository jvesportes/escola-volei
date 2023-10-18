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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const ExcluirAlunoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "excluirAluno";

  const [isLoading, setIsLoading] = useState(false);

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem absoluta certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem absoluta certeza? Esta ação não pode ser desfeita. Isso
            excluirá permanentemente este aluno de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
