/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { supabase } from '@/lib';

import { Button } from '@/components/shared/ui/button';
import { Input } from '@/components/shared/ui/input';
import { Label } from '@/components/shared/ui/label';
import { useToast } from '@/components/shared/ui/use-toast';

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
          description: 'Credenciais inválidas. Tente novamente.',
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
    <div className="flex size-full flex-col items-center justify-center gap-8 bg-white p-4">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/logo.png"
          className={'flex rounded-full border border-slate-200'}
          width={100}
          height={100}
          alt={'logo'}
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-center">Bem-Vindo de Volta!</h1>
          <p className="text-center text-[14px] text-slate-500">
            Olá! Bem-vindo de volta, explore as incríveis funcionalidades do nosso sistema.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex w-full flex-col items-center justify-center gap-4">
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
        <Button className="w-full max-w-sm" onClick={handleSignIn} disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Entrar'}
        </Button>
      </div>
    </div>
  );
};