"use client";

import { useEffect, useState } from "react";

import { AddAlunoModal } from "../modals/alunos/add-aluno-modal";
import { EditAlunoModal } from "../modals/alunos/edit-aluno-modal";
import { ExcluirAlunoModal } from "../modals/alunos/excluir-aluno-modal";
import { AddTurmaModal } from "../modals/turmas/add-turma-modal";
import { EditTurmaModal } from "../modals/turmas/edit-turma-modal";
import { ExcluirTurmaModal } from "../modals/turmas/excluir-turma-modal";
import { ExcluirAlunoTurmaModal } from "../modals/turmas/turma/excluir-turma-modal";

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
    </>
  );
};
