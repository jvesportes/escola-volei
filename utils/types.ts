export interface Student {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  cpf: string;
  plano?: 'mensal' | 'trimestral' | 'semestral' | 'anual';
  responsavel?: Responsable;
  pagamentos?: Payment[];
}
export interface Responsable {
  id?: string;
  nome: string;
  email?: string;
  telefone?: string;
  cpf: string;
}
export interface Payment {
  id?: string;
  dataPagamento: Date;
  vigencia: Date;
  preco: number;
  plano: 'mensal' | 'trimestral' | 'semestral' | 'anual';
}

export interface Turma {
  nome: string;
  professor: string;
  horario: string;
  alunos: AlunoTurma[];
  local: 'Zona Norte' | 'Zona Leste' | 'Zona Sul';
  id: string;
  listaEspera: AlunoEspera[];
}
export interface Professor {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;
}

export interface AlunoEspera {
  posicao: number;
  nome: string;
  telefone: string;
  cpf: string;
  email: string;
}

export interface AlunoTurma {
  aluno: Aluno;
  presenca: AlunoPresenca[];
}
export interface AlunoPresenca {
  date: Date;
  presenca: boolean;
}

export const professores: Professor[] = [
  {
    id: '1',
    nome: 'João',
    email: 'juliojose@gmail.com',
    telefone: '(011) 99512-0214',
    cpf: '042.014.015-12',
    senha: '123456',
  },
  {
    id: '2',
    nome: 'Juca',
    email: 'jucaojose@gmail.com',
    telefone: '(011) 99512-0214',
    cpf: '042.014.015-12',
    senha: '123456',
  },
  {
    id: '3',
    nome: 'Maria',
    email: 'mariajose@gmail.com',
    telefone: '(011) 99512-0214',
    cpf: '042.014.015-12',
    senha: '123456',
  },
];

export const turmas: Turma[] = [
  {
    id: '1',
    alunos: [
      {
        aluno: {
          nome: 'Maria',
          email: 'aa@gmail.com',
          telefone: '(011) 99512-0214',
          cpf: '042.014.015-12',
          responsavel: false,
          plano: 'Mensal',
          pagamentos: [
            {
              pagamentoDate: new Date('2021-09-01'),
              vencimentoDate: new Date('2021-10-01'),
              valor: 100,
              plano: 'Mensal',
              situacao: 'Em dia',
            },
            {
              pagamentoDate: new Date('2021-08-01'),
              vencimentoDate: new Date('2021-12-01'),
              valor: 228,
              plano: 'Trimestral',
              situacao: 'Em dia',
            },
          ],
        },
        presenca: [
          {
            date: new Date('2021-09-01'),
            presenca: true,
          },
          {
            date: new Date('2021-09-01'),
            presenca: true,
          },
          {
            date: new Date('2021-09-01'),
            presenca: true,
          },
          {
            date: new Date('2021-09-01'),
            presenca: true,
          },
          {
            date: new Date('2021-09-01'),
            presenca: true,
          },
        ],
      },
    ],
    nome: 'Turma 1',
    professor: 'João',
    horario: '19:00',
    local: 'Zona Norte',
    listaEspera: [
      {
        cpf: '123.456.789-00',
        email: 'maria@gmail.com',
        nome: 'Maria',
        posicao: 1,
        telefone: '(011) 99512-0214',
      },
      {
        cpf: '987.654.321-00',
        email: 'joao@gmail.com',
        nome: 'João',
        posicao: 2,
        telefone: '(011) 99512-0214',
      },
    ],
  },
  {
    id: '2',
    listaEspera: [
      {
        cpf: '123.456.789-00',
        email: 'maria@gmail.com',
        nome: 'Maria',
        posicao: 1,
        telefone: '(011) 99512-0214',
      },
      {
        cpf: '987.654.321-00',
        email: 'joao@gmail.com',
        nome: 'João',
        posicao: 2,
        telefone: '(011) 99512-0214',
      },
    ],
    alunos: [
      {
        aluno: {
          nome: 'Pedro',
          email: 'bb@gmail.com',
          telefone: '(011) 99512-0214',
          cpf: '042.014.015-12',
          responsavel: false,
          plano: 'Mensal',
          pagamentos: [
            {
              pagamentoDate: new Date('2021-09-01'),
              vencimentoDate: new Date('2021-10-01'),
              valor: 100,
              plano: 'Mensal',
              situacao: 'Em dia',
            },
            {
              pagamentoDate: new Date('2021-08-01'),
              vencimentoDate: new Date('2021-12-01'),
              valor: 228,
              plano: 'Trimestral',
              situacao: 'Em dia',
            },
          ],
        },
        presenca: [
          {
            date: new Date('2021-09-01'),
            presenca: true,
          },
        ],
      },
    ],
    nome: 'Turma 2',
    professor: 'Maria',
    horario: '20:00',
    local: 'Zona Sul',
  },
  {
    id: '3',
    listaEspera: [
      {
        cpf: '123.456.789-00',
        email: 'maria@gmail.com',
        nome: 'Maria',
        posicao: 1,
        telefone: '(011) 99512-0214',
      },
      {
        cpf: '987.654.321-00',
        email: 'joao@gmail.com',
        nome: 'João',
        posicao: 2,
        telefone: '(011) 99512-0214',
      },
    ],
    alunos: [
      {
        aluno: {
          nome: 'Ana',
          email: 'cc@gmail.com',
          telefone: '(011) 99512-0214',
          cpf: '042.014.015-12',
          responsavel: false,
          plano: 'Mensal',
          pagamentos: [
            {
              pagamentoDate: new Date('2021-09-01'),
              vencimentoDate: new Date('2021-10-01'),
              valor: 100,
              plano: 'Mensal',
              situacao: 'Em dia',
            },
            {
              pagamentoDate: new Date('2021-08-01'),
              vencimentoDate: new Date('2021-12-01'),
              valor: 228,
              plano: 'Trimestral',
              situacao: 'Em dia',
            },
          ],
        },
        presenca: [
          {
            date: new Date('2021-09-01'),
            presenca: true,
          },
        ],
      },
    ],
    nome: 'Turma 3',
    professor: 'Pedro',
    horario: '18:00',
    local: 'Zona Leste',
  },
];

export interface Aluno {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  responsavel: boolean;
  plano: 'Mensal' | 'Trimestral' | 'Anual';
  pagamentos: Pagamento[];
}
export interface Pagamento {
  pagamentoDate: Date;
  vencimentoDate: Date;
  valor: number;
  plano: 'Mensal' | 'Trimestral' | 'Anual';
  situacao: 'Atrasado' | 'Em dia';
}

export const alunos: Aluno[] = [
  {
    nome: 'Maria',
    email: 'mariaeduarda22@gmail.com',
    telefone: '(011) 99512-0214',
    cpf: '042.014.015-12',
    responsavel: false,
    plano: 'Mensal',
    pagamentos: [
      {
        pagamentoDate: new Date('2021-09-01'),
        vencimentoDate: new Date('2021-10-01'),
        valor: 100,
        plano: 'Mensal',
        situacao: 'Atrasado',
      },
      {
        pagamentoDate: new Date('2021-08-01'),
        vencimentoDate: new Date('2021-12-01'),
        valor: 228,
        plano: 'Trimestral',
        situacao: 'Em dia',
      },
    ],
  },
  {
    nome: 'João',
    email: 'joao.silva@gmail.com',
    telefone: '(011) 98765-4321',
    cpf: '123.456.789-00',
    responsavel: true,
    plano: 'Anual',
    pagamentos: [
      {
        pagamentoDate: new Date('2021-09-01'),
        vencimentoDate: new Date('2021-10-01'),
        valor: 100,
        plano: 'Mensal',
        situacao: 'Em dia',
      },
      {
        pagamentoDate: new Date('2021-08-01'),
        vencimentoDate: new Date('2021-12-01'),
        valor: 228,
        plano: 'Trimestral',
        situacao: 'Em dia',
      },
    ],
  },
  {
    nome: 'Ana',
    email: 'ana.maria@hotmail.com',
    telefone: '(021) 99876-5432',
    cpf: '987.654.321-00',
    responsavel: false,
    plano: 'Trimestral',
    pagamentos: [
      {
        pagamentoDate: new Date('2021-09-01'),
        vencimentoDate: new Date('2021-10-01'),
        valor: 100,
        plano: 'Mensal',
        situacao: 'Em dia',
      },
      {
        pagamentoDate: new Date('2021-08-01'),
        vencimentoDate: new Date('2021-12-01'),
        valor: 228,
        plano: 'Trimestral',
        situacao: 'Em dia',
      },
    ],
  },
  {
    nome: 'Pedro',
    email: 'pedro.santos@yahoo.com',
    telefone: '(031) 91234-5678',
    cpf: '111.222.333-44',
    responsavel: true,
    plano: 'Mensal',
    pagamentos: [
      {
        pagamentoDate: new Date('2021-09-01'),
        vencimentoDate: new Date('2021-10-01'),
        valor: 100,
        plano: 'Mensal',
        situacao: 'Em dia',
      },
      {
        pagamentoDate: new Date('2021-08-01'),
        vencimentoDate: new Date('2021-12-01'),
        valor: 228,
        plano: 'Trimestral',
        situacao: 'Em dia',
      },
    ],
  },
];
