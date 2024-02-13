'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FileUpload } from '@/components/file-upload';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useModal } from '@/hooks/use-modal-store';
import { api } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  fileUrl: z.string(),
});

export const AddAlunosModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // try {
    //   setIsLoading(true);
    //   const mocked = '';
    //   const result = await api.student.addStudentsCSV(mocked);
    //   if (result) form.reset();
    //   location.reload();
    //   toast({
    //     title: 'Sucesso ao adicionar alunos!',
    //     variant: 'success',
    //   });
    // } catch (error) {
    //   toast({
    //     title: 'Erro ao adicionar alunos.',
    //     variant: 'destructive',
    //   });
    //   console.log('[CRIAR ALUNOS ERRO]', error);
    // } finally {
    //   setIsLoading(false);
    // }
  }

  const isModalOpen = isOpen && type === 'addAlunos';

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-scroll md:p-6 p-4 rounded-lg no-scrollbar">
        <DialogHeader className="justify-center items-center md:py-6 py-4">
          <DialogTitle className="text-slate-900 font-extrabold md:text-5xl text-2xl">
            Adicionar Alunos
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="imageUploader"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
