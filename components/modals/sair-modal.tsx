"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const SairModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "logout";

  const [isLoading, setIsLoading] = useState(false);

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem absoluta certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem absoluta certeza? Depois de se desconectar você terá que se
            conectar novamente.
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
