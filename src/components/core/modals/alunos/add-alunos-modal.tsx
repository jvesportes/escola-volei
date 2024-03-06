'use client';

import { useState } from 'react';

import { FileUpload } from '@/components/core/file-upload';
import { Button } from '@/components/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shared/ui/dialog';
import { useToast } from '@/components/shared/ui/use-toast';

import { useModal } from '@/hooks/use-modal-store';
import { useAlunosStore } from '@/stores/useAlunosStore';

import { api } from '@/services';

import { CSVtoJson } from '@/utils/types';

export const AddAlunosModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { toast } = useToast();

  const [jsonValue, setJsonValue] = useState<unknown>();
  const [isFileLoading, setFileLoading] = useState(false);
  const { addStudent } = useAlunosStore();

  async function onSubmit() {
    console.error(jsonValue);
    try {
      setIsLoading(true);
      const result = await api.student.addStudentsCSV(jsonValue as CSVtoJson[]);
      result.data?.forEach((student) => !(student instanceof Error) && addStudent(student));
      if (result.error) throw new Error('Erro ao adicionar alunos');
      toast({
        title: 'Sucesso ao adicionar alunos!',
        variant: 'success',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Erro ao adicionar alunos.',
        variant: 'destructive',
      });
      console.error('[CRIAR ALUNOS ERRO]', error);
    } finally {
      setIsLoading(false);
    }
  }

  const isModalOpen = isOpen && type === 'addAlunos';

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar overflow-scroll rounded-lg bg-white p-4 md:p-6">
        <DialogHeader className="items-center justify-center py-4 md:py-6">
          <DialogTitle className="text-2xl font-bold text-zinc-900">Adicionar Alunos</DialogTitle>
        </DialogHeader>
        {jsonValue ? (
          <div className="flex flex-col gap-2 p-1">
            <span className="text-center">Arquivo carregado com sucesso!</span>
            <Button onClick={onSubmit} disabled={isLoading}>
              {isLoading ? 'Carregando...' : 'Adicionar alunos'}
            </Button>
            <Button
              onClick={() => {
                location.reload();
              }}
              variant={'secondary'}
            >
              Mudar Arquivo
            </Button>
          </div>
        ) : (
          <FileUpload
            isLoading={isFileLoading}
            setJsonValue={setJsonValue}
            file={jsonValue}
            setIsLoading={setFileLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
