'use client';

import Image from 'next/image';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '../ui/use-toast';
import { supabase } from '@/lib';
import { hasUser } from '@/utils';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [isMounted, setIsMounted] = useState(false);
  if (typeof window === 'undefined') return null;
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (hasUser()) router.push('/dashboard');
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
        return;
      }
      localStorage.setItem('@user', JSON.stringify(result.data?.user));

      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

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
      </div>
    </div>
  );
};
