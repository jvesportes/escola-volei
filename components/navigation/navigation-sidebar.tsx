import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Apple, Home, User, Users } from "lucide-react";

export const NavigationSidebar = async () => {
  return (
    <div className="flex flex-col h-full items-center z-50 gap-8 border-r bg-background px-4 pt-16 pb-8 shadow-lg">
      <Avatar className="w-[105px] h-[105px] border">
        <AvatarImage src="logo.png" />
        <AvatarFallback className="text-5xl font-extrabold bg-white">
          EV
        </AvatarFallback>
      </Avatar>
      <Separator />
      <div className="flex flex-col gap-2 w-64">
        <div className="flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition cursor-pointer">
          <Home className="w-6 h-6 text-slate-900" />
          <span className="text-slate-900 leading-6 text-xl">Início</span>
        </div>
        <div className="flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900  rounded-full transition cursor-pointer">
          <User className="w-6 h-6 " />
          <span className=" leading-6 text-xl">Alunos</span>
        </div>
        <div className="flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900  rounded-full transition cursor-pointer">
          <Users className="w-6 h-6 " />
          <span className="leading-6 text-xl">Turmas</span>
        </div>
        <div className="flex flex-row gap-2 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition cursor-pointer">
          <Apple className="w-6 h-6 " />
          <span className=" leading-6 text-xl">Professores</span>
        </div>
      </div>
    </div>
  );
};
