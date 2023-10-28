'use client';

import Image from 'next/image';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { useToast } from '../ui/use-toast';
import { classService } from '@/services/api/class';

export const LoginPage = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient<Database>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const user = session?.user;

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (result.error) {
        toast({
          title: 'Erro ao fazer login',
          description: result.error.message,
          variant: 'destructive',
        });
      }

      const tokens = {
        access_token: result.data?.session?.access_token,
        refresh_token: result.data?.session?.refresh_token,
      };

      localStorage.setItem('@tokens', JSON.stringify(tokens));
      localStorage.setItem('@user', JSON.stringify(result.data?.user));

      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  async function handleTest() {
    const turmaData = {
      created_at: '2023-10-24',
      horario: '08:00 AM',
      id_professor: '9e63818a-1684-426d-b471-1e6df3cb36a8',
      unidade: 'Unidade Aaaaaa',
    };

    try {
      // const result = await supabase
      //   .from('turmas')
      //   .insert([
      //     {
      //       horario: '13:00',
      //       id_professor: '9e63818a-1684-426d-b471-1e6df3cb36a8',
      //       unidade: 'unidade teste',
      //     },
      //   ])
      //   .select();
      classService.create(turmaData);
      console.log('Dados de turma inseridos com sucesso:');
    } catch (error) {
      console.error('Erro ao inserir dados de turma:', error);
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center h-full p-4 bg-white">
      <div className="flex flex-col gap-6 items-center">
        <Image
          src="/logo.png"
          className={'flex border border-slate-200 rounded-full'}
          width={100}
          height={100}
          alt={'logo'}
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
            <Label htmlFor="username">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
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
        <Button
          className="w-full max-w-sm"
          onClick={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Entrar'}
        </Button>
        <Button
          className="w-full max-w-sm"
          onClick={handleTest}
          disabled={isLoading}
        >
          TESTE
        </Button>
      </div>
    </div>
  );
};
