"use client";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Apple,
  Home,
  LogOut,
  User,
  Users,
  ChevronsLeftRight,
} from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar-store";
import { cn } from "@/lib/utils";

// melhorias --> adicionar tooltip, aumentar o padding dos icones quando fechada e animação de abrir e fechar.
export const NavigationSidebar = () => {
  const { isOpen, onOpen } = useSidebar();
  return (
    <div
      className={cn(
        isOpen && "w-64",
        "flex flex-col h-full items-center z-50 gap-8 border-r bg-background px-4 pt-16 pb-8 shadow-lg transition"
      )}
    >
      <Avatar className="w-[105px] h-[105px] border">
        <AvatarImage src="logo.png" />
        <AvatarFallback className="text-5xl font-extrabold bg-white">
          EV
        </AvatarFallback>
      </Avatar>
      <Separator />

      <div
        className={cn(
          isOpen && "w-full",
          "flex flex-col gap-2 h-full transition"
        )}
      >
        <div
          onClick={() => onOpen()}
          className="absolute top-[187px] right-[-14px] bg-white p-[6px] border rounded-lg text-slate-500 cursor-pointer"
        >
          <ChevronsLeftRight className="w-4 h-4" />
        </div>
        <div className="flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition cursor-pointer">
          <Home className="w-6 h-6 text-slate-900" />
          {isOpen && (
            <span className="text-slate-900 leading-6 text-xl">Início</span>
          )}
        </div>
        <div className="flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900  rounded-full transition cursor-pointer">
          <User className="w-6 h-6 " />
          {isOpen && <span className=" leading-6 text-xl">Alunos</span>}
        </div>
        <div className="flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900  rounded-full transition cursor-pointer">
          <Users className="w-6 h-6 " />
          {isOpen && <span className="leading-6 text-xl">Turmas</span>}
        </div>
        <div className="flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition cursor-pointer">
          <Apple className="w-6 h-6 " />
          {isOpen && <span className=" leading-6 text-xl">Professores</span>}
        </div>
      </div>
      <Separator />
      <div
        className={cn(
          isOpen && "w-full",
          "flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900  rounded-full transition cursor-pointer"
        )}
      >
        <LogOut className="w-6 h-6 " />
        {isOpen && <span className=" leading-6 text-xl">Sair</span>}
      </div>
    </div>
  );
};
