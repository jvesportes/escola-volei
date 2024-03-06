'use client';

import { useRouter } from 'next/navigation';

import { UserIcon } from 'lucide-react';

import { columns } from '@/components/core/tables/alunos/columns';
import { DataTable } from '@/components/core/tables/alunos/data-table';

import { useStudents } from '@/hooks/student/useStudents';
import useAuthentication from '@/hooks/useAuthentication';
import { useAlunosStore } from '@/stores/useAlunosStore';

const AlunosPage = () => {
  const { isLoading } = useStudents();
  const { isAdmin, hasUser } = useAuthentication();
  const { students } = useAlunosStore();
  const router = useRouter();

  if (!hasUser) router.push('/');
  if (!isAdmin) router.push('/dashboard');

  if (isAdmin)
    return (
      <div className="flex flex-col gap-12">
        <header className="inline-flex items-center gap-4 bg-zinc-950 px-4 py-16 text-white md:px-12">
          <div className="inline-flex size-11 items-center justify-center rounded-lg bg-orange-100 md:size-12">
            <UserIcon className="size-5 min-w-5 text-orange-400 md:size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold md:text-2xl">Alunos</h1>
            <p className="text-sm text-zinc-400">Tenha acesso aos controle de alunos.</p>
          </div>
        </header>
        <div className="flex flex-col gap-2 px-12 md:gap-4">
          {isLoading ? <div></div> : <DataTable columns={columns} data={students} />}
        </div>
      </div>
    );

  return <></>;
};

export default AlunosPage;
