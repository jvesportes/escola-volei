"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const GoBackButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/dashboard");
      }}
      className="flex flex-row gap-2 pb-2 text-slate-900 items-center cursor-pointer pointer-events-none opacity-0"
    >
      <ArrowLeft className="w-4 h-4" strokeWidth={3} />
      <span className="text-[14px] font-medium leading-5">Voltar</span>
    </div>
  );
};
