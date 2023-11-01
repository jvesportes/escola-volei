'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '../../../ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { Separator } from '../../../ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { api } from '@/services';
import { useToast } from '@/components/ui/use-toast';
import { useStudents } from '@/hooks/student/useStudents';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      window.location.reload();
      toast({
        title: 'Sucesso ao adicionar aluno à turma!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao adicionar aluno à turma.',
        variant: 'destructive',
      });
      console.log('[ADICIONAR ALUNO TURMA ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  }

  const isModalOpen = isOpen && type === 'addAlunoTurma';

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-scroll md:p-6 p-4 rounded-lg no-scrollbar">
        <DialogHeader className="justify-center items-center md:py-6 py-4">
          <DialogTitle className="text-slate-900 font-extrabold md:text-5xl text-2xl">
            Escolha o Aluno
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <div className="grid w-full  items-center gap-1.5 justify-center">
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
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? alunos.find(
                                    (aluno) => aluno.id === field.value
                                  )?.nome
                                : 'Selecione um aluno...'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Selecione um aluno..." />
                            <CommandEmpty>
                              Nenhum aluno encontrado.
                            </CommandEmpty>
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
                                          : 'opacity-0'
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
