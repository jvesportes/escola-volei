'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '../../ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Separator } from '../../ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { api } from '@/services';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib';

const formSchema = z.object({
  nome: z.string().min(5, {
    message: 'O nome deve ter pelo menos 5 caracteres',
  }),
  horario: z.string().min(5, {
    message: 'O telefone deve ter pelo menos 5 caracteres',
  }),
  professor: z.enum(['joao', 'joao', 'julio']),
  unidade: z.enum(['zonasul', 'zonanorte', 'zonaoeste', 'zonaleste']),
});

export const AddTurmaModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      horario: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      console.log('entrou aqui')
      await api.class.create({
        horario: '09:00:00',
        id_professor: '9e63818a-1684-426d-b471-1e6df3cb36a8',
        unidade: values.unidade,
      });

      form.reset();
      router.refresh();
      toast({
        title: 'Sucesso ao criar turma!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao criar turma.',
        variant: 'destructive',
      });
      console.log('[CRIAR TURMA ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  }

  const isModalOpen = isOpen && type === 'addTurma';

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-scroll md:p-6 p-4 rounded-lg no-scrollbar">
        <DialogHeader className="justify-center items-center md:py-6 py-4">
          <DialogTitle className="text-slate-900 font-extrabold md:text-5xl text-2xl">
            Adicionar Turma
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:gap-8 gap-4">
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
                    name="professor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professor</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Selecione um professor"
                                className="text-slate-500"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="joao">João</SelectItem>
                              <SelectItem value="julio">Júlio</SelectItem>
                              <SelectItem value="cesar">César</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="horario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horário</FormLabel>
                        <FormControl>
                          <Input placeholder="Horário" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="unidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unidade</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Selecione uma Unidade"
                                className="text-slate-500"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="zonasul">Zona Sul</SelectItem>
                              <SelectItem value="zonaleste">
                                Zona Leste
                              </SelectItem>
                              <SelectItem value="zonanorte">
                                Zona Norte
                              </SelectItem>
                              <SelectItem value="zonaoeste">
                                Zona Oeste
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="py-6">
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
