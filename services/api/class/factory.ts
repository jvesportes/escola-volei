import { supabase } from '@/lib';
import * as Class from './type';

function ClassFactory() {
  return {
    async create(data: Class.Insert) {
      console.log('DATA TURMA CRIAR ------> ', data);
      const result = await supabase
        .from('turmas')
        .insert({
          horario: data.horario,
          id_professor: data.id_professor,
          unidade: data.unidade,
          nome: data.nome,
        })
        .select();

      return result;
    },
    async edit(data: Class.Update) {
      // supabase.from('alunos').update(data)
    },
    async delete(id: string) {
      // implementar
    },
    async get(id: string) {
      const { data, error } = await supabase
        .from('turmas')
        .select(
          `id, unidade, horario, nome, presenca:presenca_alunos(aluno:alunos(nome, id), data:data_aula, estaPresente:esta_presente)`
        )
        .eq('id', id)
        .order('data_aula', {
          ascending: false,
          foreignTable: 'presenca_alunos',
        });
      const presencas = data![0].presenca.reduce(
        (presences, item) => {
          const alunoId = item.aluno?.id;
          const existingPresence = presences.find(
            (p) => p.aluno.id === alunoId
          );
          if (existingPresence) {
            existingPresence.presencas.push({
              data: item.data,
              estaPresente: item.estaPresente,
            });
          } else {
            const presenca = {
              aluno: item.aluno,
              presencas: [{ data: item.data, estaPresente: item.estaPresente }],
            };
            presences.push(presenca);
          }
          return presences;
        },
        [] as { aluno: any; presencas: { data: any; estaPresente: any }[] }[]
      );
      const turma = {
        id: data![0].id,
        unidade: data![0].unidade,
        horario: data![0].horario,
        nome: data![0].nome,
        presenca: presencas,
      };
      return { turma, error };
    },
    async addStudent(id: string, studentId: string) {
      // impleme,ntar
    },
    async addStudentWaitList(id: string, studentId: string) {
      // impleme,ntar
    },
    async deleteStudent(id: string, studentId: string) {
      // impleme,ntar
    },
    async list() {
      const result = await supabase
        .from('turmas')
        .select(
          `id, unidade, horario, nome, alunosTurmas:alunos_turmas(alunos(*)), professor:perfis(*)`
        );
      console.log('LISTAGEM DE TURMAS CLASS ------> ', result.data);
      return result;
    },
  };
}

export const classService = ClassFactory();
