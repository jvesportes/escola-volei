"use client";

import { Apple, HomeIcon, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export const NavigationTabbar = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/dashboard");
      }}
      className="bg-white flex flex-row p-4 rounded-tr-lg rounded-tl-lg w-full h-[92px] shadow-[0px_-2px_40px_0px_rgba(0,0,0,0.10)] justify-center items-center gap-6"
    >
      <div className="flex flex-col items-center h-full p-2 text-slate-900 border-slate-900 border-b cursor-pointer">
        <HomeIcon className="h-6 w-6" />
        <span className="text-xs not-italic font-medium leading-5">Início</span>
      </div>
      <div
        onClick={() => {
          router.push("/dashboard/alunos");
        }}
        className="flex flex-col items-center h-full p-2 text-slate-500 cursor-pointer"
      >
        <User className="h-6 w-6" />
        <span className="text-xs not-italic font-medium leading-5">Alunos</span>
      </div>
      <div
        onClick={() => {
          router.push("/dashboard/turmas");
        }}
        className="flex flex-col items-center h-full p-2 text-slate-500 cursor-pointer"
      >
        <Users className="h-6 w-6" />
        <span className="text-xs not-italic font-medium leading-5">Turmas</span>
      </div>
      <div
        onClick={() => {
          router.push("/dashboard/professores");
        }}
        className="flex flex-col items-center h-full p-2 text-slate-500 cursor-pointer"
      >
        <Apple className="h-6 w-6" />
        <span className="text-xs not-italic font-medium leading-5">
          Professores
        </span>
      </div>
    </div>
  );
};
