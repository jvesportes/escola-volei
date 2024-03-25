'use client';

import { useState } from 'react';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';
import { Separator } from '@/components/shared/ui/separator';
import { useToast } from '@/components/shared/ui/use-toast';

import { useModal } from '@/hooks/use-modal-store';

import { api } from '@/services';
import { Insert } from '@/services/api/student/type';

const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }).min(5, {
    message: 'O email deve ter pelo menos 5 caracteres',
  }),
  nome: z.string().min(5, {
    message: 'O nome deve ter pelo menos 5 caracteres',
  }),
  telefone: z.string().refine((telefone) => isPhone(telefone)),
  cpf: z.string().refine((cpf) => isCPF(cpf)),
  plano: z.enum(['mensal', 'trimestral', 'semestral', 'anual']),
  responsavelNome: z.string().optional(),
  responsavelTelefone: z.string().optional(),
  responsavelCpf: z.string().optional(),
  responsavelEmail: z.string().optional(),
});

export const AddAlunoModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      cpf: '',
      nome: '',
      telefone: '',
      responsavelNome: '',
      responsavelTelefone: '',
      responsavelCpf: '',
      responsavelEmail: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      let aluno: Insert = {
        cpf: values.cpf,
        email: values.email,
        nome: values.nome,
        telefone: values.telefone,
        plano: values.plano,
        tem_responsavel: values.responsavelNome ? true : false,
      } as Insert;
      if (aluno.tem_responsavel) {
        aluno.responsavel = {
          cpf: values.responsavelCpf!,
          email: values.responsavelEmail,
          nome: values.responsavelNome!,
          telefone: values.responsavelTelefone,
        };
      }
      const result = await api.student.create(aluno);
      if (result) form.reset();
      location.reload();
      toast({
        title: 'Sucesso ao criar aluno!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao criar aluno.',
        variant: 'destructive',
      });
      console.error('[CRIAR ALUNO ERRO]', error);
    } finally {
      setIsLoading(false);
    }
  }

  const isModalOpen = isOpen && type === 'addAluno';

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar overflow-scroll rounded-lg bg-white p-4 md:p-6">
        <DialogHeader>
          <DialogTitle>Adicionar Aluno</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="grid grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-2 md:grid-cols-[repeat(2,1fr)] md:gap-x-8 md:gap-y-4">
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
                    name="plano"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plano</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Selecione um plano"
                                className="text-zinc-500"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mensal">Mensal</SelectItem>
                              <SelectItem value="trimestral">Trimestral</SelectItem>
                              <SelectItem value="semestral">Semestral</SelectItem>
                              <SelectItem value="anual">Anual</SelectItem>
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
                {/* <div className="grid w-full  items-center gap-1.5">
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
                                placeholder="Selecione uma unidade"
                                className="text-zinc-500"
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
                </div> */}
              </div>
              <Separator className="my-2" />
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex flex-row items-center gap-2">
                  <h3>Responsável</h3>
                  <span className="text-xs font-semibold uppercase text-zinc-900">OPCIONAL</span>
                </div>
                <div className="grid grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-2 md:grid-cols-[repeat(2,1fr)] md:gap-x-8 md:gap-y-4">
                  <div className="grid w-full  items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="responsavelNome"
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
                      name="responsavelEmail"
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
                      name="responsavelTelefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Telefone"
                              {...field}
                              onChange={(e) =>
                                form.setValue('responsavelTelefone', formatToPhone(e.target.value))
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
                      name="responsavelCpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="CPF"
                              {...field}
                              onChange={(e) =>
                                form.setValue('responsavelCpf', formatToCPF(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="py-6">
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
