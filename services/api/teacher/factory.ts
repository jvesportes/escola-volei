import { supabase } from '@/lib';
import * as Teacher from './type';

function TeacherFactory() {
  return {
    async create(data: Teacher.CreateTeacher) {
      let result = await supabase.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: false,
        user_metadata: {
          cpf: data.cpf,
          nome: data.nome,
          email: data.email,
          tipo: 'teacher',
        },
      });
      return result;
    },
    async edit(data: Teacher.Update) {
      // supabase.from('alunos').update(data)
    },
    async delete(id: string) {
      // implementar
    },
    async get(id: string) {
      const result = await supabase.from('perfis').select();
      // .eq('id', id)
      // .eq('tipo', 'professor')
      return result.data;
    },
    async list() {
      // implementar
    },
  };
}

export const teacher = TeacherFactory();
