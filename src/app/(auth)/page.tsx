'use client';

import React from 'react';
import Image from 'next/image';

import { supabase } from '@/lib';
import LogoIcon from '@assets/images/logo/light/logo-icon.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';

import useAuthentication from '@/hooks/useAuthentication';

import { LoginSchema, LoginSchemaType } from './validation/schema';

export default function LoginPage() {
  const { handleLogin } = useAuthentication();
  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  async function onSubmit(values: LoginSchemaType) {
    setIsLoading(true);

    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await supabase.auth.signInWithPassword(data);

      handleLogin(response);
    } catch (error) {
      toast.error('Erro ao fazer login', {
        description: 'Credenciais inválidas. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid size-full min-h-screen grid-cols-12 items-center justify-center gap-8 bg-white">
      <div
        className={`hidden size-full bg-zinc-950 bg-[url('/assets/images/pattern.png')] bg-cover md:col-span-6 md:block`}
      />
      <div className="col-span-12 flex size-full flex-col items-center gap-8 md:col-span-6 md:justify-center">
        <div
          className={`block h-48 w-full bg-zinc-950 bg-[url('/assets/images/pattern.png')] bg-cover md:hidden`}
        />
        <div className="flex flex-col items-center gap-6">
          <div className="flex size-24 rounded-full border border-zinc-100 p-6">
            <Image src={LogoIcon} width={72} height={72} alt="JV Esportes" />
          </div>
          <div className="flex flex-col gap-2 text-center ">
            <h1 className="text-lg font-bold md:text-xl">Acesso a conta</h1>
            <p className="text-sm text-zinc-600 md:text-base">
              Digite seu e-mail de acesso abaixo para
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            className="container flex w-full max-w-md flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Digite seu e-mail" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={passwordVisibility ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        className="pr-10"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        className="absolute inset-y-[5px] right-1 size-8"
                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                      >
                        {passwordVisibility ? (
                          <EyeOffIcon className="size-5 text-zinc-500" />
                        ) : (
                          <EyeIcon className="size-5 text-zinc-500" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" isLoading={isLoading} className="group mt-4 pl-6">
              Entrar
              <ChevronRight className="ease ml-1 size-5 transition-transform duration-500 group-hover:translate-x-1" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
