import { supabase } from '@/lib';

import { Teacher as TeacherType } from '@/utils/types';

import * as Teacher from './type';

function TeacherFactory() {
  return {
    async create(data: Teacher.CreateTeacher) {
      let result = await supabase.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
        user_metadata: {
          cpf: data.cpf,
          nome: data.nome,
          email: data.email,
          tipo: 'teacher',
          telefone: data.telefone,
        },
      });

      return result;
    },
    async edit(id: string, data: Teacher.UpdateTeacher) {
      let dataToSend: {
        email: string | undefined;
        email_confirm: boolean;
        user_metadata: {
          cpf: string | undefined;
          nome: string | undefined;
          email: string | undefined;
          telefone: string | undefined;
        };
        password?: string; // make password optional
      } = {
        email: data.email,
        email_confirm: true,
        user_metadata: {
          cpf: data.cpf,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
        },
      };
      if (data.password) dataToSend = { ...dataToSend, password: data.password };
      let result = await supabase.auth.admin.updateUserById(id, dataToSend);

      return result;
    },
    async delete(id: string) {
      let result = await supabase.auth.admin.deleteUser(id);

      return result;
    },
    async get(id: string) {
      const result = await supabase.from('perfis').select();
      // .eq('id', id)
      // .eq('tipo', 'professor')

      return result.data;
    },
    async list() {
      let { data, error } = await supabase.auth.admin.listUsers();
      const mappedData = data.users
        .map((user) => {
          return {
            cpf: user.user_metadata.cpf,
            email: user.email,
            id: user.id,
            nome: user.user_metadata.nome,
            telefone: user.user_metadata.telefone,
            tipo: user.user_metadata.tipo,
          } as TeacherType;
        })
        .filter((user) => user.tipo === 'teacher');

      return { mappedData, error };
    },
  };
}

export const teacher = TeacherFactory();
