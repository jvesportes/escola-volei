import { supabase } from "@/lib";
import * as Teacher from './type'


function TeacherFactory() {
  return {
    async create(data: Teacher.Insert) {
      const result = await supabase.from('perfis').insert([data]).select()
      return result.data;
    },
    async edit(data: Teacher.Update) {
      // supabase.from('alunos').update(data)
    },
    async delete(id: string) {
      // implementar
    },
    async get(id: string) {
      const result = await supabase
      .from('perfis')
      .select()
      // .eq('id', id)
      // .eq('tipo', 'professor')
      return result.data;

    },
    async list() {
      // implementar
    }
  }
}


export const teacher = TeacherFactory();
