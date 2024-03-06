'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/shared/ui/command';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/shared/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/ui/popover';
import { ScrollArea } from '@/components/shared/ui/scroll-area';
import { useToast } from '@/components/shared/ui/use-toast';

import { useStudents } from '@/hooks/student/useStudents';
import { useModal } from '@/hooks/use-modal-store';

import { api } from '@/services';

import { cn } from '@/lib/utils';

import { Button } from '../../../../shared/ui/button';

const FormSchema = z.object({
  aluno: z.string(),
});

export const AddAlunoTurma = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { toast } = useToast();
  const { data: alunos, isLoading: alunosIsLoading } = useStudents();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);

      const result = await api.class.addStudent(data?.turma?.id!, values.aluno);
      if (result.error) throw new Error('Erro ao adicionar aluno à turma.');
      form.reset();
      location.reload();
      toast({
        title: 'Sucesso ao adicionar aluno à turma!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao adicionar aluno à turma.',
        description: (error as Error).message,
        variant: 'destructive',
      });
      console.error('[ADICIONAR ALUNO TURMA ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  }

  const isModalOpen = isOpen && type === 'addAlunoTurma';

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar overflow-scroll rounded-lg bg-white p-4 md:p-6">
        <DialogHeader className="items-center justify-center py-4 md:py-6">
          <DialogTitle className="text-2xl font-bold text-zinc-900">Escolha o Aluno</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <div className="grid w-full  items-center justify-center gap-1.5">
                <FormField
                  control={form.control}
                  name="aluno"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Aluno</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className={cn(
                                'w-[200px] justify-between',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? alunos.find((aluno) => aluno.id === field.value)?.nome
                                : 'Selecione um aluno...'}
                              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Selecione um aluno..." />
                            <CommandEmpty>Nenhum aluno encontrado.</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea>
                                {alunos.map((aluno) => (
                                  <CommandItem
                                    key={aluno.id}
                                    value={aluno.id}
                                    onSelect={() => {
                                      form.setValue('aluno', aluno.id);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        form.getValues('aluno') === aluno.id
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {aluno.nome}
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
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
