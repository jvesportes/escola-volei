"use client";

import { useEffect, useState } from "react";

import { AddAlunoModal } from "../modals/alunos/add-aluno-modal";
import { EditAlunoModal } from "../modals/alunos/edit-aluno-modal";
import { ExcluirAlunoModal } from "../modals/alunos/excluir-aluno-modal";

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
    </>
  );
};
