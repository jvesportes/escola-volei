'use client';

import { AddAlunoModal } from '../core/modals/alunos/add-aluno-modal';
import { AddAlunosModal } from '../core/modals/alunos/add-alunos-modal';
import { EditAlunoModal } from '../core/modals/alunos/edit-aluno-modal';
import { ExcluirAlunoModal } from '../core/modals/alunos/excluir-aluno-modal';
import { ExcluirPagamentoAlunoModal } from '../core/modals/alunos/pagamentos/excluir-pagamento-aluno-modal';
import { PagamentoAlunoModal } from '../core/modals/alunos/pagamentos/pagamento-aluno-modal';
import { AddProfessorModal } from '../core/modals/professor/add-professor-modal';
import { EditProfessorModal } from '../core/modals/professor/edit-professor-modal';
import { ExcluirProfessorModal } from '../core/modals/professor/excluir-professor-modal';
import { SairModal } from '../core/modals/sair-modal';
import { AddTurmaModal } from '../core/modals/turmas/add-turma-modal';
import { EditTurmaModal } from '../core/modals/turmas/edit-turma-modal';
import { ExcluirTurmaModal } from '../core/modals/turmas/excluir-turma-modal';
import { AddAlunoTurma } from '../core/modals/turmas/turma/add-aluno-turma';
import { ExcluirAlunoTurmaModal } from '../core/modals/turmas/turma/excluir-turma-modal';
import { HistoricoModal } from '../core/modals/turmas/turma/historico/historico-modal';
import { ExcluirAlunoListaEsperaModal } from '../core/modals/turmas/turma/lista-espera/excluir-lista-espera-modal';
import { ListaEsperaModal } from '../core/modals/turmas/turma/lista-espera/lista-espera-modal';

export const ModalProvider = () => {
  return (
    <>
      <AddAlunoModal />
      <AddAlunosModal />
      <EditAlunoModal />
      <ExcluirAlunoModal />
      <AddTurmaModal />
      <EditTurmaModal />
      <ExcluirTurmaModal />
      <ExcluirAlunoTurmaModal />
      <AddAlunoTurma />
      <ListaEsperaModal />
      <AddProfessorModal />
      <EditProfessorModal />
      <ExcluirProfessorModal />
      <SairModal />
      <HistoricoModal />
      <PagamentoAlunoModal />
      <ExcluirPagamentoAlunoModal />
      <ExcluirAlunoListaEsperaModal />
    </>
  );
};
