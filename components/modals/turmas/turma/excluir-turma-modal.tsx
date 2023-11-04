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

export const ExcluirAlunoTurmaModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === 'excluirAlunoTurma';

  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    try {
      setIsLoading(true);
      const result = await api.class.deleteStudent(
        data?.turma?.id!,
        data?.student?.id!
      );
      if (result.error) throw new Error('Erro ao excluir aluno da turma.');
      router.refresh();
      location.reload();
      toast({
        title: 'Sucesso ao excluir aluno da turma!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao excluir aluno da turma.',
        variant: 'destructive',
      });
      console.log('[EXCLUIR ALUNO TURMA ERROR]', error);
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
            excluirá permanentemente este aluno desta turma.
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
