"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

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
            <Input
              type="username"
              id="username"
              placeholder="Usuário"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="senha">Senha</Label>
            <Input
              type="password"
              id="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        <Button className="w-full max-w-sm" onClick={handleSignIn}>
          Entrar
        </Button>
      </div>
    </div>
  );
};
