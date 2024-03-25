'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { formatToCPF, formatToPhone, isCPF, isPhone } from 'brazilian-values';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { ListaEsperaColumns } from '@/components/core/tables/turma/lista-espera/lista-espera-columns';
import { ListaEsperaDataTable } from '@/components/core/tables/turma/lista-espera/lista-espera-data-table';
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
import { Separator } from '@/components/shared/ui/separator';
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
});

export const ListaEsperaModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { toast } = useToast();
  const isModalOpen = isOpen && type === 'listaEspera';

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      cpf: '',
      nome: '',
      telefone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const result = await api.class.addStudentWaitList({
        id_turma: data.turma?.id!,
        nome: values.nome,
        email: values.email,
        telefone: values.telefone,
        cpf: values.cpf,
      });
      if (result.error) throw new Error('Erro ao adicionar aluno na lista de espera.');
      location.reload();
      form.reset();
      toast({
        title: 'Sucesso ao adicionar aluno na lista de espera!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao adicionar aluno na lista de espera.',
        variant: 'destructive',
      });
      console.error('[ALUNO LISTA ESPERA ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar w-[95%] overflow-scroll rounded-lg bg-white p-4 md:w-4/5 md:p-6">
        <DialogHeader className="items-center justify-center py-4 md:py-6">
          <DialogTitle className="text-2xl font-bold text-zinc-900">Lista de Espera</DialogTitle>
        </DialogHeader>
        <h3 className="pb-2">{data.turma?.nome}</h3>
        <div className="flex w-full  items-center justify-center gap-1.5">
          <ListaEsperaDataTable
            columns={ListaEsperaColumns}
            data={data?.turma?.listaEspera || []}
          />
        </div>
        <Separator className="my-4 md:my-8" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex flex-row items-center gap-2">
                  <h3>Adicionar Aluno</h3>
                  <span className="text-xs font-semibold uppercase text-zinc-900">OPCIONAL</span>
                </div>
                <div className="grid grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-2 md:grid-cols-[repeat(2,1fr)] md:gap-x-8 md:gap-y-4">
                  <div className="grid w-full  items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome" {...field} />
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
                            <Input placeholder="Email" {...field} />
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
                              onChange={(e) => form.setValue('cpf', formatToCPF(e.target.value))}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="py-4">
              <div className="flex w-full items-center justify-end gap-2">
                <Button disabled={isLoading} onClick={onClose} variant="ghost">
                  Cancelar
                </Button>
                <Button disabled={isLoading} type="submit">
                  {!isLoading ? 'Adicionar' : 'Adicionando...'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
