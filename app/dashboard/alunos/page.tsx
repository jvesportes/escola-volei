'use client';
import { GoBackButton } from '@/components/navigation/go-back-button';
import { columns } from '@/components/tables/alunos/columns';
import { DataTable } from '@/components/tables/alunos/data-table';
import { Card } from '@/components/ui/card';
import { useStudents } from '@/hooks/student/useStudents';
import { hasRoleAccess, hasUser } from '@/utils';
import { useRouter } from 'next/navigation';

const AlunosPage = () => {
  const { data: students, error, isLoading } = useStudents();
  const router = useRouter();
  if (!hasUser()) router.push('/');
  if (!hasRoleAccess()) router.push('/dashboard');
  if (hasRoleAccess())
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
                <DataTable columns={columns} data={students} />
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  return <></>;
};

export default AlunosPage;
