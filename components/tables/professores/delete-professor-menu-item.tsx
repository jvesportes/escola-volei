"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Trash2Icon } from "lucide-react";

export const ExcluirProfessorMenuItem = () => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen("excluirProfessor");
      }}
      className="gap-2 text-red-500"
    >
      Excluir <Trash2Icon className="h-4 w-4" />
    </DropdownMenuItem>
  );
};
