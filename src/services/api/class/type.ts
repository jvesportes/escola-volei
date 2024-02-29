import { Database } from '../../../lib/database.types';

export type Insert = Database['public']['Tables']['turmas']['Insert'];
export type Update = Database['public']['Tables']['turmas']['Update'];
export type WaitListStudent = Database['public']['Tables']['turma_lista_de_espera']['Insert'];
