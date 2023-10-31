'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { api } from '@/services';
import { useToast } from '@/components/ui/use-toast';

export const ExcluirPagamentoAlunoModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'excluirPagamentoAluno';
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    try {
      setIsLoading(true);
      await api.student.deletePayment(data?.payment?.id!);
      router.refresh();
      window.location.reload();
      toast({
        title: 'Sucesso ao excluir pagamento do aluno!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao excluir pagamento do aluno.',
        variant: 'destructive',
      });
      console.log('[EXCLUIR PAGAMENTO DO ALUNO ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem absoluta certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem absoluta certeza? Que deseja apagar este pagamento, ele
            será excluido permanentemente dos nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
