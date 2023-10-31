import {
  Aluno,
  AlunoEspera,
  AlunoPresenca,
  AlunoTurma,
  Pagamento,
  Payment,
  Professor,
  Student,
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
  | 'excluirPagamentoAluno'
  | 'addAlunoTurma';

interface ModalData {
  student?: Student;
  payment?: Payment;
  turma?: Turma;
  aluno?: AlunoTurma;
  alunoNormal?: Aluno;
  professor?: Professor;
  pagamento?: Pagamento;
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
