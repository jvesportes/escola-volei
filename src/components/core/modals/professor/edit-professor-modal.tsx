'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { formatToCPF, formatToPhone, isCPF, isPhone } from 'brazilian-values';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';
import { useToast } from '@/components/shared/ui/use-toast';

import { useModal } from '@/hooks/use-modal-store';

import { api } from '@/services';

const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }).min(5, {
    message: 'O email deve ter pelo menos 5 caracteres',
  }),
  nome: z.string().min(5, {
    message: 'O nome deve ter pelo menos 5 caracteres',
  }),
  telefone: z.string().refine((telefone) => isPhone(telefone)),
  cpf: z.string().refine((cpf) => isCPF(cpf)),
  senha: z.string().optional(),
});

export const EditProfessorModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      email: data?.teacher?.email!,
      cpf: data?.teacher?.cpf!,
      nome: data?.teacher?.nome!,
      telefone: data?.teacher?.telefone!,
      senha: '',
    },
    defaultValues: {
      email: data?.teacher?.email,
      cpf: data?.teacher?.cpf,
      nome: data?.teacher?.nome,
      telefone: data?.teacher?.telefone,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const result = await api.teacher.edit(data?.teacher?.id!, {
        cpf: values.cpf,
        email: values.email,
        nome: values.nome,
        password: values.senha,
        telefone: values.telefone,
      });
      if (result.error) throw new Error('Erro ao criar professor.');
      form.reset();
      location.reload();

      toast({
        title: 'Sucesso ao criar professor!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao criar professor.',
        variant: 'destructive',
      });
      console.error('[CRIAR PROFESSOR ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  }

  const isModalOpen = isOpen && type === 'editProfessor';

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar overflow-scroll rounded-lg bg-white p-4 md:p-6">
        <DialogHeader className="items-center justify-center py-4 md:py-6">
          <DialogTitle className="text-2xl font-bold text-zinc-900">Editar Professor</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="grid grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-2 md:grid-cols-[repeat(2,1fr)] md:gap-x-8 md:gap-y-4">
                <div className="grid w-full  items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome" {...field} defaultValue={data?.teacher?.nome} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            {...field}
                            defaultValue={data?.teacher?.email}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid w-full  items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Telefone"
                            {...field}
                            defaultValue={data?.teacher?.telefone}
                            onChange={(e) =>
                              form.setValue('telefone', formatToPhone(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="CPF"
                            {...field}
                            defaultValue={data?.teacher?.cpf}
                            onChange={(e) => form.setValue('cpf', formatToCPF(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="senha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input placeholder="Senha" {...field} type="password" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="py-6">
              <div className="flex w-full items-center justify-end gap-2">
                <Button disabled={isLoading} onClick={onClose} variant="ghost">
                  Cancelar
                </Button>
                <Button disabled={isLoading} type="submit">
                  {!isLoading ? 'Editar' : 'Editando...'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
