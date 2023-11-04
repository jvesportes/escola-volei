'use client';

import { useState } from 'react';
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

export const ExcluirTurmaModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === 'excluirTurma';

  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    try {
      setIsLoading(true);
      const result = await api.class.delete(data.turma?.id!);
      if (result.error) throw new Error('Erro ao excluir turma.');
      location.reload();
      toast({
        title: 'Sucesso ao excluir turma!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao excluir turma.',
        variant: 'destructive',
      });
      console.log('[EXCLUIR TURMA ERROR]', error);
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
            Você tem absoluta certeza? Esta ação não pode ser desfeita. Isso
            excluirá permanentemente esta turma de nossos servidores.
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
