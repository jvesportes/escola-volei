type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
export interface Aluno {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  responsavel: boolean;
  plano: "Mensal" | "Trimestral" | "Anual";
  pagamento: "Atrasado" | "Em dia";
}

export const alunos: Aluno[] = [
  {
    nome: "Maria",
    email: "mariaeduarda22@gmail.com",
    telefone: "(011) 99512-0214",
    cpf: "042.014.015-12",
    responsavel: false,
    plano: "Mensal",
    pagamento: "Em dia",
  },
  {
    nome: "João",
    email: "joao.silva@gmail.com",
    telefone: "(011) 98765-4321",
    cpf: "123.456.789-00",
    responsavel: true,
    plano: "Anual",
    pagamento: "Atrasado",
  },
  {
    nome: "Ana",
    email: "ana.maria@hotmail.com",
    telefone: "(021) 99876-5432",
    cpf: "987.654.321-00",
    responsavel: false,
    plano: "Trimestral",
    pagamento: "Em dia",
  },
  {
    nome: "Pedro",
    email: "pedro.santos@yahoo.com",
    telefone: "(031) 91234-5678",
    cpf: "111.222.333-44",
    responsavel: true,
    plano: "Mensal",
    pagamento: "Atrasado",
  },
];
