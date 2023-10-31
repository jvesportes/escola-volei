import { Database } from '../../../lib/database.types';

export type Insert = Database['public']['Tables']['perfis']['Insert'];
export type Update = Database['public']['Tables']['perfis']['Update'];
export type CreateTeacher = {
  email: string;
  password: string;
  cpf: string;
  nome: string;
};
