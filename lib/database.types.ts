export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      alunos: {
        Row: {
          cpf: string;
          created_at: string;
          email: string | null;
          id: string;
          id_pagamentos: string[] | null;
          id_responsavel: string | null;
          nome: string;
          plano: Database['public']['Enums']['planos'] | null;
          telefone: string | null;
          tem_responsavel: boolean;
        };
        Insert: {
          cpf: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          id_pagamentos?: string[] | null;
          id_responsavel?: string | null;
          nome: string;
          plano?: Database['public']['Enums']['planos'] | null;
          telefone?: string | null;
          tem_responsavel: boolean;
        };
        Update: {
          cpf?: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          id_pagamentos?: string[] | null;
          id_responsavel?: string | null;
          nome?: string;
          plano?: Database['public']['Enums']['planos'] | null;
          telefone?: string | null;
          tem_responsavel?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'alunos_id_responsavel_fkey';
            columns: ['id_responsavel'];
            referencedRelation: 'pagamentos';
            referencedColumns: ['id'];
          },
        ];
      };
      alunos_turmas: {
        Row: {
          created_at: string;
          id: string;
          id_aluno: string | null;
          id_turma: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          id_aluno?: string | null;
          id_turma?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          id_aluno?: string | null;
          id_turma?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'alunos_turmas_id_aluno_fkey';
            columns: ['id_aluno'];
            referencedRelation: 'alunos';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'alunos_turmas_id_turma_fkey';
            columns: ['id_turma'];
            referencedRelation: 'turmas';
            referencedColumns: ['id'];
          },
        ];
      };
      pagamentos: {
        Row: {
          created_at: string;
          id: string;
          preco: number | null;
          tipo: string;
          unidade: string;
          vigencia: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          preco?: number | null;
          tipo: string;
          unidade: string;
          vigencia: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          preco?: number | null;
          tipo?: string;
          unidade?: string;
          vigencia?: string;
        };
        Relationships: [];
      };
      perfis: {
        Row: {
          cpf: string;
          created_at: string;
          email: string;
          id: string;
          nome: string;
          tipo: string;
        };
        Insert: {
          cpf: string;
          created_at?: string;
          email: string;
          id?: string;
          nome: string;
          tipo: string;
        };
        Update: {
          cpf?: string;
          created_at?: string;
          email?: string;
          id?: string;
          nome?: string;
          tipo?: string;
        };
        Relationships: [];
      };
      presenca_alunos: {
        Row: {
          created_at: string;
          data_aula: string;
          esta_presente: boolean;
          id: number;
          id_aluno: string;
          id_turma: string;
        };
        Insert: {
          created_at?: string;
          data_aula: string;
          esta_presente: boolean;
          id?: number;
          id_aluno: string;
          id_turma: string;
        };
        Update: {
          created_at?: string;
          data_aula?: string;
          esta_presente?: boolean;
          id?: number;
          id_aluno?: string;
          id_turma?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'presenca_alunos_id_aluno_fkey';
            columns: ['id_aluno'];
            referencedRelation: 'alunos';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'presenca_alunos_id_turma_fkey';
            columns: ['id_turma'];
            referencedRelation: 'turmas';
            referencedColumns: ['id'];
          },
        ];
      };
      responsaveis: {
        Row: {
          cpf: string;
          created_at: string;
          email: string | null;
          id: string;
          nome: string;
          telefone: string | null;
        };
        Insert: {
          cpf: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          nome: string;
          telefone?: string | null;
        };
        Update: {
          cpf?: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          nome?: string;
          telefone?: string | null;
        };
        Relationships: [];
      };
      turma_lista_de_espera: {
        Row: {
          contato: string;
          created_at: string;
          id: number;
          id_turma: string;
          nome: string;
        };
        Insert: {
          contato: string;
          created_at?: string;
          id?: number;
          id_turma: string;
          nome: string;
        };
        Update: {
          contato?: string;
          created_at?: string;
          id?: number;
          id_turma?: string;
          nome?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'turma_lista_de_espera_id_turma_fkey';
            columns: ['id_turma'];
            referencedRelation: 'turmas';
            referencedColumns: ['id'];
          },
        ];
      };
      turmas: {
        Row: {
          created_at: string;
          horario: string;
          id: string;
          id_professor: string;
          unidade: string;
        };
        Insert: {
          created_at?: string;
          horario: string;
          id?: string;
          id_professor: string;
          unidade: string;
        };
        Update: {
          created_at?: string;
          horario?: string;
          id?: string;
          id_professor?: string;
          unidade?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'turmas_id_professor_fkey';
            columns: ['id_professor'];
            referencedRelation: 'perfis';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin_user: {
        Args: {
          user_id: string;
        };
        Returns: boolean;
      };
      is_professor_user: {
        Args: {
          user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      planos: 'mensal' | 'trimestral' | 'semestral' | 'anual';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
