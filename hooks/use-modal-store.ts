import {
  Aluno,
  AlunoEspera,
  AlunoPresenca,
  AlunoTurma,
  Professor,
  Turma,
} from '@/utils/types';
import { create } from 'zustand';
export type ModalType =
  | 'addAluno'
  | 'editAluno'
  | 'excluirAluno'
  | 'addTurma'
  | 'editTurma'
  | 'excluirTurma'
  | 'excluirAlunoTurma'
  | 'listaEspera'
  | 'addProfessor'
  | 'editProfessor'
  | 'excluirProfessor'
  | 'logout'
  | 'historicoAlunoTurma'
  | 'pagamentoAluno'
  | 'addAlunoTurma';

interface ModalData {
  turma?: Turma;
  aluno?: AlunoTurma;
  alunoNormal?: Aluno;
  professor?: Professor;
}
interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
