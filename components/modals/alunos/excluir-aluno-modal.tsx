'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAlunosStore } from '@/app/store/useAlunosStore';
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
import { useToast } from '@/components/ui/use-toast';
import { useModal } from '@/hooks/use-modal-store';
import { api } from '@/services';

export const ExcluirAlunoModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'excluirAluno';
  const { removeStudent } = useAlunosStore();

  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);
      await api.student.delete(data?.student?.id!);
      removeStudent(data?.student?.id!);
      toast({
        title: 'Sucesso ao excluir aluno!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao excluir aluno.',
        variant: 'destructive',
      });
      console.log('[EXCLUIR ALUNO ERRO]', error);
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
            excluirá permanentemente este aluno de nossos servidores.
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
