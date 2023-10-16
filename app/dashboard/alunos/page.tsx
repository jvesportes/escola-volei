import { GoBackButton } from "@/components/navigation/go-back-button";
import { columns } from "@/components/tables/columns";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { payments } from "@/utils/types";

const AlunosPage = () => {
  return (
    <div className="flex w-full h-full md:px-16 md:py-6 md:gap-12 gap-6 p-4 flex-col overflow-y-scroll pb-32 scroll-smooth">
      <div className="flex flex-col">
        <GoBackButton disabled={false} />
        <h2>Escolinha de Vôlei</h2>
        <span className="text-slate-500 text-[14px] leading-5">
          Páginas/Alunos
        </span>
      </div>
      <Card className="md:p-6 p-4 w-full">
        <div className="flex flex-col md:gap-6 gap-4 w-full">
          <h1>Alunos</h1>
          <div className="flex flex-col md:gap-4 gap-2">
            <DataTable columns={columns} data={payments} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AlunosPage;
