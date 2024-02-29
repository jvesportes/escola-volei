'use client';

import { useRouter } from 'next/navigation';

import { GoBackButton } from '@/components/core/navigation/go-back-button';
import { columns } from '@/components/core/tables/alunos/columns';
import { DataTable } from '@/components/core/tables/alunos/data-table';
import { Card } from '@/components/shared/ui/card';

import { useStudents } from '@/hooks/student/useStudents';
import { useAlunosStore } from '@/stores/useAlunosStore';

import { hasRoleAccess, hasUser } from '@/utils';

const AlunosPage = () => {
  const { isLoading } = useStudents();
  const { students } = useAlunosStore();
  const router = useRouter();
  if (!hasUser()) router.push('/');
  if (!hasRoleAccess()) router.push('/dashboard');
  if (hasRoleAccess())
    return (
      <div className="flex size-full flex-col gap-6 overflow-y-scroll scroll-smooth p-4 pb-32 md:gap-12 md:px-16 md:py-6">
        <div className="flex flex-col">
          <GoBackButton disabled={false} />
          <h2>Escolinha de Vôlei</h2>
          <span className="text-[14px] leading-5 text-slate-500">Páginas/Alunos</span>
        </div>
        <Card className="w-full p-4 md:p-6">
          <div className="flex w-full flex-col gap-4 md:gap-6">
            <h1>Alunos</h1>
            <div className="flex flex-col gap-2 md:gap-4">
              {isLoading ? <></> : <DataTable columns={columns} data={students} />}
            </div>
          </div>
        </Card>
      </div>
    );

  return <></>;
};

export default AlunosPage;
