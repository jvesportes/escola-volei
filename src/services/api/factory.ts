import { classService } from './class';
import { student } from './student';
import { teacher } from './teacher';

function ApiFactory() {
  return {
    student,
    class: classService,
    teacher,
  };
}

export const api = ApiFactory();
