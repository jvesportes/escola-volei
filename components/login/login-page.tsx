import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const LoginPage = () => {
  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center h-full p-4 bg-white">
      <div className="flex flex-col gap-6 items-center">
        <Image
          src="/logo.png"
          className={"flex border border-slate-200 rounded-full"}
          width={100}
          height={100}
          alt={"logo"}
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-center">Bem-Vindo de Volta!</h1>
          <p className="text-[14px] text-slate-500 text-center">
            Olá! Bem-vindo de volta, explore as incríveis funcionalidades do
            nosso sistema.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full items-center justify-center">
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Usuário</Label>
            <Input type="username" id="username" placeholder="Usuário" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="senha">Senha</Label>
            <Input type="password" id="password" placeholder="Senha" />
          </div>
        </div>
        <Button className="w-full max-w-sm">Entrar</Button>
      </div>
    </div>
  );
};
