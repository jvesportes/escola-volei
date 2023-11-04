'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '../../ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
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
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { api } from '@/services';
import { Insert } from '@/services/api/student/type';
import { useToast } from '@/components/ui/use-toast';
import { formatToCPF, formatToPhone } from 'brazilian-values';

const formSchema = z.object({
  email: z.string().email().min(5),
  nome: z.string().min(5),
  telefone: z.string().min(5),
  cpf: z.string().min(5),
  plano: z.enum(['mensal', 'trimestral', 'semestral', 'anual']),
  responsavelNome: z.string().optional(),
  responsavelTelefone: z.string().optional(),
  responsavelCpf: z.string().optional(),
  responsavelEmail: z.string().optional(),
});

export const EditAlunoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      cpf: data?.student?.cpf!,
      email: data?.student?.email!,
      nome: data?.student?.nome!,
      telefone: data?.student?.telefone!,
      plano: data?.student?.plano!,
    },
    defaultValues: {
      email: data.alunoNormal?.email,
      cpf: data.alunoNormal?.cpf,
      nome: data.alunoNormal?.nome,
      telefone: data.alunoNormal?.telefone,
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
      await api.student.edit(data?.student?.id!, aluno);
      //refetch aluno.
      form.reset();
      router.refresh();
      location.reload();
      toast({
        title: 'Sucesso ao editar aluno!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao editar aluno.',
        variant: 'destructive',
      });
      console.log('[EDITAR ALUNO ERRO]', error);
    } finally {
      setIsLoading(false);
    }
  }

  const isModalOpen = isOpen && type === 'editAluno';

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-scroll md:p-6 p-4 rounded-lg no-scrollbar">
        <DialogHeader className="justify-center items-center md:py-6 py-4">
          <DialogTitle className="text-slate-900 font-extrabold md:text-5xl text-2xl">
            Editar Aluno
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:gap-8 gap-4">
              <div className="grid md:grid-cols-[repeat(2,1fr)] grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-x-2 gap-y-2 md:gap-x-8 md:gap-y-4">
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
                            defaultValue={data?.student?.email!}
                          />
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
                          <Input
                            placeholder="Nome"
                            {...field}
                            defaultValue={data?.student?.nome!}
                          />
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
                            defaultValue={'mensal'}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Selecione um plano"
                                className="text-slate-500"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mensal">Mensal</SelectItem>
                              <SelectItem value="trimestral">
                                Trimestral
                              </SelectItem>
                              <SelectItem value="semestral">
                                Semestral
                              </SelectItem>
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
                            defaultValue={data?.student?.telefone!}
                            onChange={(e) =>
                              form.setValue(
                                'telefone',
                                formatToPhone(e.target.value)
                              )
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
                            defaultValue={data?.student?.cpf!}
                            onChange={(e) =>
                              form.setValue('cpf', formatToCPF(e.target.value))
                            }
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
                            defaultValue={'zonasul'}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Selecione uma unidade"
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
                </div> */}
              </div>
              <Separator className="md:my-8 my-2" />
              <div className="flex flex-col md:gap-6 gap-4">
                <div className="flex flex-row gap-2 items-center">
                  <h3>Responsável</h3>
                  <span className="font-semibold text-slate-900 text-xs uppercase">
                    OPCIONAL
                  </span>
                </div>
                <div className="grid md:grid-cols-[repeat(2,1fr)] grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-x-2 gap-y-2 md:gap-x-8 md:gap-y-4">
                  <div className="grid w-full  items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="responsavelNome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nome"
                              {...field}
                              defaultValue={data?.student?.responsavel?.nome!}
                            />
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
                            <Input
                              placeholder="Email"
                              {...field}
                              defaultValue={data?.student?.responsavel?.email!}
                            />
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
                              defaultValue={
                                data?.student?.responsavel?.telefone!
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
                              defaultValue={data?.student?.responsavel?.cpf!}
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
              <div className="flex items-center justify-end w-full gap-2">
                <Button disabled={isLoading} onClick={onClose} variant="ghost">
                  Cancelar
                </Button>
                <Button disabled={isLoading} type="submit">
                  {!isLoading ? 'Salvar' : 'Salvando...'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
