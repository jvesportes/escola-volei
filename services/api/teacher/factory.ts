import { supabase } from "@/lib/supabae";
import * as Teacher from './type'


function TeacherFactory() {
  return {
    async create(data: Teacher.Insert) {
      // supabase.from('cla').insert(data)
    },
    async edit(data: Teacher.Update) {
      // supabase.from('alunos').update(data)
    },
    async delete(id: string) {
      // implementar
    },
    async get() {
      // implementar
    },
    async list() {
      // implementar
    }
  }
}


export const teacher = TeacherFactory();
