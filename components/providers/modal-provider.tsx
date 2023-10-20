"use client";

import { useEffect, useState } from "react";

import { AddAlunoModal } from "../modals/alunos/add-aluno-modal";
import { EditAlunoModal } from "../modals/alunos/edit-aluno-modal";
import { ExcluirAlunoModal } from "../modals/alunos/excluir-aluno-modal";
import { AddTurmaModal } from "../modals/turmas/add-turma-modal";
import { EditTurmaModal } from "../modals/turmas/edit-turma-modal";
import { ExcluirTurmaModal } from "../modals/turmas/excluir-turma-modal";
import { ExcluirAlunoTurmaModal } from "../modals/turmas/turma/excluir-turma-modal";
import { AddAlunoTurma } from "../modals/turmas/turma/add-aluno-turma";
import { ListaEsperaModal } from "../modals/turmas/turma/lista-espera/lista-espera-modal";
import { AddProfessorModal } from "../modals/professor/add-professor-modal";
import { EditProfessorModal } from "../modals/professor/edit-professor-modal";
import { ExcluirProfessorModal } from "../modals/professor/excluir-professor-modal";
import { SairModal } from "../modals/sair-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddAlunoModal />
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
    </>
  );
};
