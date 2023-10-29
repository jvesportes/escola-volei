import { supabase } from '@/lib';
import * as Class from './type';

function ClassFactory() {
  return {
    async create(data: Class.Insert) {
      const result = await supabase
        .from('turmas')
        .insert([
          {
            horario: data.horario,
            id_professor: data.id_professor,
            unidade: data.unidade,
          },
        ])
        .select();

      return result;
    },
    async edit(data: Class.Update) {
      // supabase.from('alunos').update(data)
    },
    async delete(id: string) {
      // implementar
    },
    async get() {
      // impleme,ntar
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
      const result = await supabase.from('turmas').select();
      return result.data;
    },
  };
}

export const classService = ClassFactory();
