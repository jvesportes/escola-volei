"use client";
import { GoBackButton } from "@/components/navigation/go-back-button";
import { turmaColumns } from "@/components/tables/turmas/turma/turma-columns";
import { SingleTurmaDataTable } from "@/components/tables/turmas/turma/turma-data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useModal } from "@/hooks/use-modal-store";
import { AlunoTurma, turmas } from "@/utils/types";
import { FileText } from "lucide-react";

interface TurmaPageProps {
  params: {
    turmaId: string;
  };
}
const TurmaPage = ({ params }: TurmaPageProps) => {
  const { turmaId } = params;
  const turma = turmas.find((turma) => turma.id === turmaId);
  const { data, isOpen, onClose, onOpen, type } = useModal();
  return (
    <div className="flex w-full h-full md:px-16 md:py-6 md:gap-12 gap-6 p-4 flex-col overflow-y-scroll pb-32 scroll-smooth">
      <div className="flex flex-col">
        <GoBackButton disabled={false} />
        <h2>Escolinha de Vôlei</h2>
        <span className="text-slate-500 text-[14px] leading-5">
          Páginas/Turmas
        </span>
      </div>
      <Card className="md:p-6 p-4 w-full">
        <div className="flex flex-col md:gap-6 gap-4 w-full">
          <div className="flex flex-row justify-between">
            <h1>{turma?.nome}</h1>
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => {
                onOpen("listaEspera", { turma });
              }}
            >
              <span className="md:flex hidden">Lista de Espera</span>
              <FileText className="text-slate-900 md:hidden w-5 h-5" />
            </Button>
          </div>
          <div className="flex flex-col md:gap-4 gap-2">
            <SingleTurmaDataTable
              columns={turmaColumns}
              data={turma?.alunos || []} // provide a default value for turma?.alunos
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TurmaPage;