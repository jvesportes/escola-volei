import { supabase } from '@/lib';

import { Database } from '@/lib/database.types';
import { CSVtoJson, Payment, Student as StudentType } from '@/utils/types';

import * as Student from './type';

function StudentFactory() {
  return {
    async create(data: Student.Insert): Promise<StudentType | Error> {
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
          if (responsable.error) return new Error('Erro ao cadastrar responsável');
          const { data: student } = await supabase
            .from('alunos')
            .insert({
              cpf: data.cpf,
              nome: data.nome,
              email: data.email,
              plano: data.plano,
              tem_responsavel: data.tem_responsavel,
              id_responsavel: responsable.data[0].id,
              telefone: data.telefone,
            })
            .select(
              `nome, cpf, id, email, plano, telefone, responsavel:responsaveis(id, nome, cpf, email, telefone), pagamentos(dataPagamento:data_pagamento, vigencia, valor:preco, id, plano:tipo)`,
            )
            .order('data_pagamento', {
              ascending: false,
              foreignTable: 'pagamentos',
            })
            .limit(1);

          return student![0] as unknown as StudentType;
        }
        const { data: student } = await supabase
          .from('alunos')
          .insert({
            cpf: data.cpf,
            nome: data.nome,
            email: data.email,
            plano: data.plano,
            tem_responsavel: data.tem_responsavel,
            telefone: data.telefone,
          })
          .select(
            `nome, cpf, id, email, plano, telefone, responsavel:responsaveis(id, nome, cpf, email, telefone), pagamentos(dataPagamento:data_pagamento, vigencia, valor:preco, id, plano:tipo)`,
          )
          .order('data_pagamento', {
            ascending: false,
            foreignTable: 'pagamentos',
          })
          .limit(1);

        return student![0] as unknown as StudentType;
      } catch (error) {
        console.error(error);

        return new Error('Erro ao cadastrar aluno');
      }
    },
    async edit(id: string, data: Student.Update & { responsavel?: Student.Responsable }) {
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
      if (student[0].id_responsavel && data.responsavel) {
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
      let { data, error } = await supabase.from('alunos').delete().eq('id', id).select();
    },
    async addPayment(id: string, payment: Payment) {
      let { data, error } = await supabase
        .from('pagamentos')
        .insert({
          aluno_id: id,
          tipo: payment.plano,
          data_pagamento: payment.dataPagamento.toDateString(),
          vigencia: payment.vigencia.toDateString(),
        })
        .select();
      // implementar
    },
    async deletePayment(paymentId: string) {
      let { data, error } = await supabase.from('pagamentos').delete().eq('id', paymentId).select();
    },
    async get(id: string) {
      // Arrumar isso aqui seguindo a lógica do list.

      const { data, error } = await supabase.from('alunos').select('*').eq('id', id);
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
    async addStudentsCSV(data: CSVtoJson[]) {
      const filteredData = data.filter(
        (aluno) =>
          aluno.cpf !== '' &&
          aluno.nome !== '' &&
          aluno.email !== '' &&
          aluno.plano !== '' &&
          aluno.telefone !== '',
      );
      const alunosPromise = filteredData.map(async (aluno) => {
        const stringToBoolean = aluno.tem_responsavel === 'true';
        console.error(stringToBoolean, aluno.tem_responsavel);
        const newStudent: Student.Insert = stringToBoolean
          ? {
              cpf: aluno.cpf,
              email: aluno.email,
              nome: aluno.nome,
              plano: aluno.plano as Database['public']['Enums']['planos'] | null,
              telefone: aluno.telefone,
              tem_responsavel: true,
              id_responsavel: '',
              responsavel: {
                cpf: aluno.cpfResponsavel as string,
                email: aluno.emailResponsavel,
                nome: (aluno.nomeResponsavel as string) || aluno?.nomResponsavel,
                telefone: aluno.telefoneResponsavel,
              },
            }
          : {
              cpf: aluno.cpf,
              email: aluno.email,
              nome: aluno.nome,
              plano: aluno.plano as Database['public']['Enums']['planos'] | null,
              telefone: aluno.telefone as string,
              tem_responsavel: false,
            };

        const student = await this.create(newStudent);

        return student;
      });
      const alunos = await Promise.all(alunosPromise);
      console.error(alunos);

      return { data: alunos, error: null };
    },
    async list(): Promise<{ data: StudentType[]; error: Error }> {
      // Expected pattern:
      // Retornará os dados do usuário, e pagamentos.
      //   {
      // "nome": "Manuel silva",
      // "cpf": "403.847.880-76",
      // "id": "8ee20b3c-52cf-414b-85e7-0f73441db38a",
      // "email": "manuelsilva@gmail.com",
      // "plano": "mensal",
      // "telefone": "(11) 1111-1111",
      // "pagamento": [
      //     {
      //         "dataPagamento": "2023-10-30",
      //         "vigencia": "2023-11-01",
      //         "preco": 60,
      //         "id": "a3d05399-108f-4c67-a0a3-f70f410ea121",
      //         "plano": "mensal"
      //     }
      // ],
      // "responsavel": {
      //     "id": "aad87316-ad5b-4614-95cc-63026687e733",
      //     "nome": "Pai do Manuel",
      //     "cpf": "403.847.880-76",
      //     "email": "paimanuel@gmai.com",
      //     "telefone": "(11) 1111-1111"
      // }
      let { data: alunos, error } = await supabase
        .from('alunos')
        .select(
          `nome, cpf, id, email, plano, telefone, responsavel:responsaveis(id, nome, cpf, email, telefone), pagamentos(dataPagamento:data_pagamento, vigencia, valor:preco, id, plano:tipo)`,
        )
        .order('data_pagamento', {
          ascending: false,
          foreignTable: 'pagamentos',
        });

      if (!alunos) throw new Error('Erro ao buscar alunos');

      return {
        data: alunos as unknown as StudentType[],
        error: error as unknown as Error,
      };
    },
  };
}

export const student = StudentFactory();
