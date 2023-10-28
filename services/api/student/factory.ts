import { supabase } from '@/lib/supabae';
import * as Student from './type';

function StudentFactory() {
  return {
    async create(data: Student.Insert) {
      // if (data.tem_responsavel) {
      //   const responsable = await  supabase.from('responsaveis').insert(data.responsavel)
      //   supabase.from('alunos').insert({
      //     cpf: data.cpf,
      //     nome: data.nome,
      //     email: data.email,
      //     id_plano: data.id_plano,
      //     tem_responsavel: data.tem_responsavel,
      //     id_responsavel: responsable.data[0].id,
      //     telefone: data.telefone,
      //   })
      //   return;
      // }
      // supabase.from('alunos').insert(data)
    },
    async edit(data: Student.Update) {
      // supabase.from('alunos').update(data)
    },
    async delete(id: string) {
      // implementar
    },
    async addPayment(id: string, payment: Student.Payment) {
      // implementar
    },
    async deletePayment(id: string, paymentId: string) {
      // implementar
    },
    async get() {
      // implementar
    },
    async list() {
      // implementar
    },
  };
}

export const student = StudentFactory();
