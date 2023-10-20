"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Aluno, Pagamento } from "@/utils/types";
import { Trash2Icon } from "lucide-react";

interface PagamentoAlunoButtonProps {
  pagamento: Pagamento[];
  alunoNormal: Aluno;
}

export const PagamentoAlunoButton = ({
  pagamento,
  alunoNormal,
}: PagamentoAlunoButtonProps) => {
  const { onOpen } = useModal();
  return (
    <Button
      onClick={() => {
        onOpen("pagamentoAluno", { alunoNormal });
      }}
      variant={pagamento[0].situacao == "Em dia" ? "green" : "destructive"}
      size={"sm"}
    >
      {pagamento[0].situacao}
    </Button>
  );
};
