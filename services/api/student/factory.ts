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
    async edit(
      id: string,
      data: Student.Update & { responsavel: Student.Responsable }
    ) {
      const { data: student, error } = await supabase
        .from('alunos')
        .update({
          cpf: data.cpf,
          email: data.email,
          nome: data.nome,
          plano: data.plano,
          telefone: data.telefone,
        })
        .eq('id', id)
        .select();
      if (!student) throw new Error('Aluno não encontrado');
      if (student[0].id_responsavel) {
        const { data: responsavel, error: responsavelError } = await supabase
          .from('responsaveis')
          .update({
            cpf: data.responsavel.cpf,
            email: data.responsavel.email,
            nome: data.responsavel.nome,
            telefone: data.responsavel.telefone,
          })
          .eq('id', student[0].id_responsavel)
          .select();
      }
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
    async get(id: string) {
      // formatar os dados e se tiver responsável trazer junto
      const { data, error } = await supabase
        .from('alunos')
        .select('*')
        .eq('id', id);
      if (!data) throw new Error('Aluno não encontrado');
      if (data[0].tem_responsavel && data[0].id_responsavel) {
        const { data: responsavel, error: responsavelError } = await supabase
          .from('responsaveis')
          .select('*')
          .eq('id', data[0].id_responsavel);
        if (responsavelError) throw responsavelError;
        return { data: { ...data[0], responsavel: responsavel![0] }, error };
      }
      return { data: { ...data[0] }, error };
    },
    async list() {
      // implementar
    },
  };
}

export const student = StudentFactory();
