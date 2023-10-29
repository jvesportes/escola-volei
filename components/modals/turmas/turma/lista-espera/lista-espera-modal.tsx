'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';

import { Button } from '@/components/ui/button';
import { ListaEsperaDataTable } from '@/components/tables/turmas/turma/lista-espera/lista-espera-data-table';
import { ListaEsperaColumns } from '@/components/tables/turmas/turma/lista-espera/lista-espera-columns';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/services';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }).min(5, {
    message: 'O email deve ter pelo menos 5 caracteres',
  }),
  nome: z.string().min(5, {
    message: 'O nome deve ter pelo menos 5 caracteres',
  }),
  telefone: z.string().min(5, {
    message: 'O telefone deve ter pelo menos 5 caracteres',
  }),
  cpf: z.string().min(5, {
    message: 'O cpf deve ter pelo menos 5 caracteres',
  }),
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
      await api.class.addStudentWaitList('', '');
      form.reset();
      router.refresh();
      toast({
        title: 'Sucesso ao adicionar aluno na lista de espera!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao adicionar aluno na lista de espera.',
        variant: 'destructive',
      });
      console.log('[ALUNO LISTA ESPERA ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-scroll md:p-6 p-4 rounded-lg no-scrollbar md:w-[80%] w-[95%]">
        <DialogHeader className="justify-center items-center md:py-6 py-4">
          <DialogTitle className="text-slate-900 font-extrabold md:text-5xl text-2xl">
            Lista de Espera
          </DialogTitle>
        </DialogHeader>
        <h3 className="pb-2">{data.turma?.nome}</h3>
        <div className="flex w-full  items-center gap-1.5 justify-center">
          <ListaEsperaDataTable
            columns={ListaEsperaColumns}
            data={data?.turma?.listaEspera || []}
          />
        </div>
        <Separator className="my-4 md:my-8" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <div className="flex flex-col md:gap-6 gap-4">
                <div className="flex flex-row gap-2 items-center">
                  <h3>Adicionar Aluno</h3>
                  <span className="font-semibold text-slate-900 text-xs uppercase">
                    OPCIONAL
                  </span>
                </div>
                <div className="grid md:grid-cols-[repeat(2,1fr)] grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-x-2 gap-y-2 md:gap-x-8 md:gap-y-4">
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
                            <Input placeholder="Telefone" {...field} />
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
                            <Input placeholder="CPF" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="py-4">
              <div className="flex items-center justify-end w-full gap-2">
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
