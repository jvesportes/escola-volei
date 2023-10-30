'use client';
import { GoBackButton } from '@/components/navigation/go-back-button';
import { columns } from '@/components/tables/alunos/columns';
import { DataTable } from '@/components/tables/alunos/data-table';
import { Card } from '@/components/ui/card';
import { useStudents } from '@/hooks/student/useStudents';
import { Insert } from '@/services/api/student/type';
import { Aluno, alunos } from '@/utils/types';

const AlunosPage = () => {
  const { data: students, error, isLoading } = useStudents();
  console.log(students);
  return (
    <div className="flex w-full h-full md:px-16 md:py-6 md:gap-12 gap-6 p-4 flex-col overflow-y-scroll pb-32 scroll-smooth">
      <div className="flex flex-col">
        <GoBackButton disabled={false} />
        <h2>Escolinha de Vôlei</h2>
        <span className="text-slate-500 text-[14px] leading-5">
          Páginas/Alunos
        </span>
      </div>
      <Card className="md:p-6 p-4 w-full">
        <div className="flex flex-col md:gap-6 gap-4 w-full">
          <h1>Alunos</h1>
          <div className="flex flex-col md:gap-4 gap-2">
            {isLoading ? (
              <></>
            ) : (
              <DataTable
                columns={columns}
                data={students as unknown as Insert[]}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AlunosPage;
