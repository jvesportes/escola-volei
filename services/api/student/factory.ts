import { supabase } from '@/lib';
import * as Student from './type';

function StudentFactory() {
  return {
    async create(data: Student.Insert): Promise<{}> {
      try {
        if (data.tem_responsavel) {
          const responsable = await supabase
            .from('responsaveis')
            .insert({
              cpf: data.responsavel.cpf,
              nome: data.responsavel.nome,
              email: data.responsavel.email,
              telefone: data.responsavel.telefone,
            })
            .select();
          if (responsable.error)
            return new Error('Erro ao cadastrar responsável');
          const aluno = await supabase.from('alunos').insert({
            cpf: data.cpf,
            nome: data.nome,
            email: data.email,
            plano: data.plano,
            tem_responsavel: data.tem_responsavel,
            id_responsavel: responsable.data[0].id,
            telefone: data.telefone,
          });
          return aluno;
        }
        return await supabase.from('alunos').insert(data).select();
      } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar aluno');
      }
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
      // const result = supabase.from('alunos').select('*')
      // return result
    },
    async list() {
      // implementar
    },
  };
}

export const student = StudentFactory();
