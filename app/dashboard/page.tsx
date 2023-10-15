import { Card } from "@/components/ui/card";

import { GoBackButton } from "@/components/navigation/go-back-button";
import { ArrowRight, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
const DashboardPage = () => {
  return (
    <div className="flex w-full h-full md:px-16 md:py-6 md:gap-12 gap-6 p-4 flex-col">
      <div className="flex flex-col">
        <GoBackButton />
        <h2>Escolinha de Vôlei</h2>
        <span className="text-slate-500 text-[14px] leading-5">
          Páginas/Início
        </span>
      </div>
      <div className="flex flex-col md:gap-8 gap-6">
        <div className="flex flex-col md:gap-6 gap-4">
          <h1>Olá Júlio Soares!</h1>
          <div className="flex flex-row md:gap-6 gap-4 overflow-y-scroll no-scrollbar">
            <Card className="md:p-6 p-4">
              <div className="flex flex-row justify-between md:gap-6 gap-4 items-center">
                <div className="flex flex-row gap-2">
                  <User className="w-8 h-8 text-slate-900" strokeWidth={2} />
                  <h2>Alunos</h2>
                </div>
                <Button size={"icon"}>
                  <ArrowRight className="text-white h-4 w-4" strokeWidth={3} />
                </Button>
              </div>
            </Card>
            <Card className="md:p-6 p-4">
              <div className="flex flex-row justify-between md:gap-6 gap-4 items-center">
                <div className="flex flex-row gap-2">
                  <User className="w-8 h-8 text-slate-900" strokeWidth={2} />
                  <h2>Alunos</h2>
                </div>
                <Button size={"icon"}>
                  <ArrowRight className="text-white h-4 w-4" strokeWidth={3} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex flex-col md:gap-6 gap-4">
          <h2>Dados</h2>
          <div className="flex flex-row md:gap-6 gap-4 overflow-y-scroll no-scrollbar">
            <Card className="p-6 gap-2">
              <div className="flex flex-row justify-between">
                <span className="font-medium text-[14px] leading-5 text-slate-900">
                  Total de Turmas
                </span>
                <Users className="w-4 h-4 text-slate-500" strokeWidth={3} />
              </div>
              <div className="flex flex-col">
                <h3>13 Turmas</h3>
                <span className="text-emerald-500 font-medium text-[14px] leading-5">
                  +20% desdê o último mês.
                </span>
              </div>
            </Card>
            <Card className="p-6 gap-2">
              <div className="flex flex-row justify-between">
                <span className="font-medium text-[14px] leading-5 text-slate-900">
                  Total de Turmas
                </span>
                <Users className="w-4 h-4 text-slate-500" strokeWidth={3} />
              </div>
              <div className="flex flex-col">
                <h3>13 Turmas</h3>
                <span className="text-emerald-500 font-medium text-[14px] leading-5">
                  +20% desdê o último mês.
                </span>
              </div>
            </Card>
            <Card className="p-6 gap-2">
              <div className="flex flex-row justify-between">
                <span className="font-medium text-[14px] leading-5 text-slate-900">
                  Total de Turmas
                </span>
                <Users className="w-4 h-4 text-slate-500" strokeWidth={3} />
              </div>
              <div className="flex flex-col">
                <h3>13 Turmas</h3>
                <span className="text-emerald-500 font-medium text-[14px] leading-5">
                  +20% desdê o último mês.
                </span>
              </div>
            </Card>
            <Card className="p-6 gap-2">
              <div className="flex flex-row justify-between">
                <span className="font-medium text-[14px] leading-5 text-slate-900">
                  Total de Turmas
                </span>
                <Users className="w-4 h-4 text-slate-500" strokeWidth={3} />
              </div>
              <div className="flex flex-col">
                <h3>13 Turmas</h3>
                <span className="text-red-500 font-medium text-[14px] leading-5">
                  +20% desdê o último mês.
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
