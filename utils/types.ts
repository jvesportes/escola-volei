export interface Turma {
  nome: string;
  professor: string;
  horario: string;
  alunos: AlunoTurma[];
  local: "Zona Norte" | "Zona Leste" | "Zona Sul";
  id: string;
}

export interface AlunoTurma {
  aluno: Aluno;
  presenca: AlunoPresenca[];
}
export interface AlunoPresenca {
  date: Date;
  presenca: boolean;
}

export const turmas: Turma[] = [
  {
    id: "1",
    alunos: [
      {
        aluno: {
          nome: "Maria",
          email: "aa@gmail.com",
          telefone: "(011) 99512-0214",
          cpf: "042.014.015-12",
          responsavel: false,
          plano: "Mensal",
          pagamento: "Em dia",
        },
        presenca: [
          {
            date: new Date("2021-09-01"),
            presenca: true,
          },
        ],
      },
    ],
    nome: "Turma 1",
    professor: "João",
    horario: "19:00",
    local: "Zona Norte",
  },
  {
    id: "2",
    alunos: [
      {
        aluno: {
          nome: "Pedro",
          email: "bb@gmail.com",
          telefone: "(011) 99512-0214",
          cpf: "042.014.015-12",
          responsavel: false,
          plano: "Mensal",
          pagamento: "Em dia",
        },
        presenca: [
          {
            date: new Date("2021-09-01"),
            presenca: true,
          },
        ],
      },
    ],
    nome: "Turma 2",
    professor: "Maria",
    horario: "20:00",
    local: "Zona Sul",
  },
  {
    id: "3",
    alunos: [
      {
        aluno: {
          nome: "Ana",
          email: "cc@gmail.com",
          telefone: "(011) 99512-0214",
          cpf: "042.014.015-12",
          responsavel: false,
          plano: "Mensal",
          pagamento: "Em dia",
        },
        presenca: [
          {
            date: new Date("2021-09-01"),
            presenca: true,
          },
        ],
      },
    ],
    nome: "Turma 3",
    professor: "Pedro",
    horario: "18:00",
    local: "Zona Leste",
  },
];

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
