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
            isOneToOne: false;
            referencedRelation: 'responsaveis';
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
            isOneToOne: false;
            referencedRelation: 'alunos';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'alunos_turmas_id_turma_fkey';
            columns: ['id_turma'];
            isOneToOne: false;
            referencedRelation: 'turmas';
            referencedColumns: ['id'];
          },
        ];
      };
      pagamentos: {
        Row: {
          aluno_id: string | null;
          created_at: string;
          data_pagamento: string | null;
          id: string;
          preco: number | null;
          tipo: Database['public']['Enums']['planos'];
          vigencia: string;
        };
        Insert: {
          aluno_id?: string | null;
          created_at?: string;
          data_pagamento?: string | null;
          id?: string;
          preco?: number | null;
          tipo: Database['public']['Enums']['planos'];
          vigencia: string;
        };
        Update: {
          aluno_id?: string | null;
          created_at?: string;
          data_pagamento?: string | null;
          id?: string;
          preco?: number | null;
          tipo?: Database['public']['Enums']['planos'];
          vigencia?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'pagamentos_aluno_id_fkey';
            columns: ['aluno_id'];
            isOneToOne: false;
            referencedRelation: 'alunos';
            referencedColumns: ['id'];
          },
        ];
      };
      perfis: {
        Row: {
          cpf: string;
          created_at: string;
          email: string;
          id: string;
          nome: string;
          telefone: string | null;
          tipo: string;
        };
        Insert: {
          cpf: string;
          created_at?: string;
          email: string;
          id?: string;
          nome: string;
          telefone?: string | null;
          tipo: string;
        };
        Update: {
          cpf?: string;
          created_at?: string;
          email?: string;
          id?: string;
          nome?: string;
          telefone?: string | null;
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
            isOneToOne: false;
            referencedRelation: 'alunos';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'presenca_alunos_id_turma_fkey';
            columns: ['id_turma'];
            isOneToOne: false;
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
          cpf: string | null;
          created_at: string;
          email: string | null;
          id: number;
          id_turma: string;
          nome: string;
          telefone: string;
        };
        Insert: {
          cpf?: string | null;
          created_at?: string;
          email?: string | null;
          id?: number;
          id_turma: string;
          nome: string;
          telefone: string;
        };
        Update: {
          cpf?: string | null;
          created_at?: string;
          email?: string | null;
          id?: number;
          id_turma?: string;
          nome?: string;
          telefone?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'turma_lista_de_espera_id_turma_fkey';
            columns: ['id_turma'];
            isOneToOne: false;
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
          nome: string | null;
          unidade: string;
        };
        Insert: {
          created_at?: string;
          horario: string;
          id?: string;
          id_professor: string;
          nome?: string | null;
          unidade: string;
        };
        Update: {
          created_at?: string;
          horario?: string;
          id?: string;
          id_professor?: string;
          nome?: string | null;
          unidade?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'turmas_id_professor_fkey';
            columns: ['id_professor'];
            isOneToOne: false;
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
      role: 'admin' | 'teacher';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
