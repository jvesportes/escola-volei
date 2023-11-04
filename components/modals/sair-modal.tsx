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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { useToast } from '../ui/use-toast';

export const SairModal = () => {
  const supabase = createClientComponentClient<Database>();
  const { isOpen, onClose, type, data } = useModal();
  const { toast } = useToast();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'logout';

  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    supabase.auth.signOut();
    toast({
      title: 'Deslogado com sucesso!',
      variant: 'success',
    });
    router.push('/');
    localStorage.removeItem('@user');
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem absoluta certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem absoluta certeza? Depois de se desconectar você terá que se
            conectar novamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
