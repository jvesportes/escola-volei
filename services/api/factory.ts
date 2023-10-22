import { student } from './student';
import { classService } from './class'
import { teacher } from './teacher'


function ApiFactory() {
  return {
    student,
    class: classService,
    teacher,
  }
}

export const api = ApiFactory()
