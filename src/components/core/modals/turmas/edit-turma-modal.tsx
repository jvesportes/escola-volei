'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/shared/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';
import { useToast } from '@/components/shared/ui/use-toast';

import { useModal } from '@/hooks/use-modal-store';
import { useProfessor } from '@/hooks/useProfessor';

import { api } from '@/services';

import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';

const formSchema = z.object({
  nome: z.string().min(5, {
    message: 'O nome deve ter pelo menos 5 caracteres',
  }),
  horario: z.string(),
  professor: z.string(),
  unidade: z.enum(['asasul', 'asanorte', 'parkway']),
});

export const EditTurmaModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { toast } = useToast();
  const { data: professores, error, isLoading: isProfessoresLoading } = useProfessor();

  const isModalOpen = isOpen && type === 'editTurma';

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      nome: data?.turma?.nome || '',
      horario: data?.turma?.horario || '',
      professor: data?.turma?.professor ? data?.turma?.professor.id! : '',
      unidade: data?.turma?.unidade || 'asasul',
    },
    defaultValues: {
      nome: data?.turma?.nome,
      horario: data?.turma?.horario,
      professor: data?.turma?.professor ? data?.turma?.professor.id! : '',
      unidade: data?.turma?.unidade,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const result = await api.class.edit(data?.turma?.id!, {
        horario: values.horario,
        id_professor: values.professor,
        unidade: values.unidade,
        nome: values.nome,
      });
      if (result.error) throw new Error('Erro ao editar turma');
      form.reset();
      location.reload();
      toast({
        title: 'Sucesso ao editar turma!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao editar turma.',
        variant: 'destructive',
      });
      console.error('[EDITAR TURMA ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar overflow-scroll rounded-lg bg-white p-4 md:p-6">
        <DialogHeader className="items-center justify-center py-4 md:py-6">
          <DialogTitle className="text-2xl font-extrabold text-zinc-900 md:text-5xl">
            Editar Turma
          </DialogTitle>
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
                          <Input placeholder="Nome" {...field} defaultValue={data?.turma?.nome} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {isProfessoresLoading ? (
                  <></>
                ) : (
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
                                  className="text-zinc-500"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {professores.map((professor) => (
                                  <SelectItem value={professor.id!} key={professor.id!}>
                                    {professor.nome}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                <div className="grid w-full  items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="horario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horário</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Horário"
                            {...field}
                            defaultValue={data?.turma?.horario}
                            type="time"
                          />
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
                                className="text-zinc-500"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asasul">Asa Sul</SelectItem>
                              <SelectItem value="asanorte">Asa Norte</SelectItem>
                              <SelectItem value="parkway">Park Way</SelectItem>
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
