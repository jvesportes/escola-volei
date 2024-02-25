'use client';

import { useState } from 'react';

import { useAlunosStore } from '@/app/store/useAlunosStore';
import { FileUpload } from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useModal } from '@/hooks/use-modal-store';
import { api } from '@/services';
import { CSVtoJson } from '@/utils/types';

export const AddAlunosModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { toast } = useToast();

  const [jsonValue, setJsonValue] = useState<unknown>();
  const [isFileLoading, setFileLoading] = useState(false);
  const { addStudent } = useAlunosStore();

  async function onSubmit() {
    console.log(jsonValue);
    try {
      setIsLoading(true);
      const result = await api.student.addStudentsCSV(jsonValue as CSVtoJson[]);
      result.data?.forEach(
        (student) => !(student instanceof Error) && addStudent(student)
      );
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
      console.log('[CRIAR ALUNOS ERRO]', error);
    } finally {
      setIsLoading(false);
    }
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
        {jsonValue ? (
          <div className="flex flex-col p-1 gap-2">
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
