"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Edit } from "lucide-react";

export const EditTurmaMenuItem = () => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem
      onClick={() => {
        onOpen("editTurma");
      }}
      className="gap-2"
    >
      Editar <Edit className="h-4 w-4 text-slate-500" />{" "}
    </DropdownMenuItem>
  );
};
