'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { pagamentosColumns } from '@/components/core/tables/alunos/pagamentos/pagamentos-columns';
import { PagamentosDataTable } from '@/components/core/tables/alunos/pagamentos/pagamentos-data-table';
import { Button } from '@/components/shared/ui/button';
import { Calendar } from '@/components/shared/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/shared/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/ui/popover';
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

import { cn } from '@/lib/utils';
import { calcularDataVencimento } from '@/utils/calcularDataVencimento';

const formSchema = z.object({
  datePagamento: z.date(),
  plano: z.enum(['mensal', 'trimestral', 'semestral', 'anual']),
});

export const PagamentoAlunoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const vigencia = calcularDataVencimento(values.plano);
      await api.student.addPayment(data?.student?.id!, {
        dataPagamento: values.datePagamento,
        plano: values.plano,
        vigencia: vigencia!,
      });
      form.reset();
      router.refresh();
      location.reload();
      toast({
        title: 'Sucesso ao adicionar contrato do aluno!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao adicionar contrato do aluno.',
        variant: 'destructive',
      });
      console.error('[CRIAR CONTRATO ALUNO ERRO]', error);
    } finally {
      setIsLoading(false);
    }
  }

  const isModalOpen = isOpen && type === 'pagamentoAluno';

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar w-[95%] overflow-scroll rounded-lg bg-white p-4 md:w-[80%] md:p-6">
        <div className="box-border flex flex-col md:w-full">
          <DialogHeader className="w-full items-center justify-center py-4 md:py-6">
            <DialogTitle className="text-2xl font-extrabold text-slate-900 md:text-5xl">
              Informações De Contratos
            </DialogTitle>
          </DialogHeader>
          <div className="w-100">
            <div className="flex w-full flex-col items-center">
              <h3 className="w-full pb-2">{data?.student?.nome}</h3>
              <div className="flex w-full items-center gap-1.5">
                <PagamentosDataTable
                  columns={pagamentosColumns}
                  data={data?.student?.pagamentos || []}
                />
              </div>
            </div>
          </div>
          <Separator className="my-2 md:my-8" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex flex-row items-center gap-2">
                  <h3>Adicionar Contrato</h3>
                  <span className="text-xs font-semibold uppercase text-slate-900">OPCIONAL</span>
                </div>
                <div className="grid grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-2 md:grid-cols-[repeat(2,1fr)] md:gap-x-8 md:gap-y-4">
                  <div className="grid w-full  items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="datePagamento"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Início do Contrato</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    ' pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP', { locale: ptBR })
                                  ) : (
                                    <span>Escolha uma data</span>
                                  )}
                                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
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
                                  className="text-slate-500"
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
                </div>
              </div>
              <DialogFooter className="px-6 py-4">
                <div className="flex w-full items-center justify-end gap-2">
                  <Button disabled={isLoading} onClick={onClose} variant="ghost">
                    Cancelar
                  </Button>
                  <Button disabled={isLoading}>Adicionar</Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
