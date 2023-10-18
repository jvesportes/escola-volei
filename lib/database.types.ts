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
          id_plano: string;
          id_responsavel: string | null;
          nome: string;
          telefone: string | null;
          tem_responsavel: boolean;
        };
        Insert: {
          cpf: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          id_plano: string;
          id_responsavel?: string | null;
          nome: string;
          telefone?: string | null;
          tem_responsavel: boolean;
        };
        Update: {
          cpf?: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          id_plano?: string;
          id_responsavel?: string | null;
          nome?: string;
          telefone?: string | null;
          tem_responsavel?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "alunos_id_plano_fkey";
            columns: ["id_plano"];
            referencedRelation: "planos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alunos_id_responsavel_fkey";
            columns: ["id_responsavel"];
            referencedRelation: "planos";
            referencedColumns: ["id"];
          }
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
            foreignKeyName: "alunos_turmas_id_aluno_fkey";
            columns: ["id_aluno"];
            referencedRelation: "alunos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alunos_turmas_id_turma_fkey";
            columns: ["id_turma"];
            referencedRelation: "turmas";
            referencedColumns: ["id"];
          }
        ];
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
      planos: {
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
            foreignKeyName: "presenca_alunos_id_aluno_fkey";
            columns: ["id_aluno"];
            referencedRelation: "alunos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "presenca_alunos_id_turma_fkey";
            columns: ["id_turma"];
            referencedRelation: "turmas";
            referencedColumns: ["id"];
          }
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
            foreignKeyName: "turmas_id_professor_fkey";
            columns: ["id_professor"];
            referencedRelation: "perfis";
            referencedColumns: ["id"];
          }
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
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
