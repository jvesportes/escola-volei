'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PagamentosDataTable } from '@/components/tables/alunos/pagamentos/pagamentos-data-table';
import { pagamentosColumns } from '@/components/tables/alunos/pagamentos/pagamentos-columns';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/services';
import { calcularDataVencimento } from '@/utils/calcularDataVencimento';

const formSchema = z.object({
  datePagamento: z.date(),
  valor: z.string(),
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
        preco: Number.parseInt(values.valor),
        plano: values.plano,
        vigencia: vigencia!,
      });
      form.reset();
      router.refresh();
      window.location.reload();
      toast({
        title: 'Sucesso ao adicionar pagamento do aluno!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao adicionar pagamento do aluno.',
        variant: 'destructive',
      });
      console.log('[CRIAR PAGAMENTO ALUNO ERRO]', error);
    } finally {
      setIsLoading(false);
    }
  }

  const isModalOpen = isOpen && type === 'pagamentoAluno';

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-scroll md:p-6 p-4 rounded-lg no-scrollbar md:w-[80%] w-[95%]">
        <div className="flex flex-col md:w-full box-border">
          <DialogHeader className="justify-center items-center md:py-6 py-4 w-full">
            <DialogTitle className="text-slate-900 font-extrabold md:text-5xl text-2xl">
              Informações De Pagamentos
            </DialogTitle>
          </DialogHeader>
          <div className="w-100">
            <div className="flex flex-col w-full items-center">
              <h3 className="pb-2 w-full">{data?.student?.nome}</h3>
              <div className="flex gap-1.5 w-full items-center">
                <PagamentosDataTable
                  columns={pagamentosColumns}
                  data={data?.student?.pagamentos || []}
                />
              </div>
            </div>
          </div>
          <Separator className="md:my-8 my-2" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col md:gap-6 gap-4">
                <div className="flex flex-row gap-2 items-center">
                  <h3>Adicionar Pagamento</h3>
                  <span className="font-semibold text-slate-900 text-xs uppercase">
                    OPCIONAL
                  </span>
                </div>
                <div className="grid md:grid-cols-[repeat(2,1fr)] grid-cols-[repeat(1,1fr)] grid-rows-[repeat(2,1fr)] gap-x-2 gap-y-2 md:gap-x-8 md:gap-y-4">
                  <div className="grid w-full  items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="datePagamento"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Data de Pagamento</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    ' pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP', { locale: ptBR })
                                  ) : (
                                    <span>Escolha uma data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
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
                      name="valor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor</FormLabel>
                          <FormControl>
                            <Input placeholder="Valor" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="px-6 py-4">
                <div className="flex items-center justify-end w-full gap-2">
                  <Button
                    disabled={isLoading}
                    onClick={onClose}
                    variant="ghost"
                  >
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
