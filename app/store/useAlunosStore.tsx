import { create } from 'zustand';

import { Student } from '@/utils/types';

export interface StudentStore {
  students: Student[];
}
type Actions = {
  addStudent: (student: Student) => void;
  removeStudent: (studentId: string) => void;
  setStudents: (students: Student[]) => void;
};

const store = create<StudentStore & Actions>((set) => ({
  students: [],
  addStudent: (student) =>
    set((state) => ({ students: [...state.students, student] })),
  removeStudent: (studentId) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== studentId),
    })),
  setStudents: (students) => set({ students }),
}));

export const useAlunosStore = store;
