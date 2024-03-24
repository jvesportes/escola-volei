'use client';

import { useRouter } from 'next/navigation';

import { GraduationCapIcon } from 'lucide-react';

import { professoresColumns } from '@/components/core/tables/professores/parts/professores-columns';
import { ProfessoresDataTable } from '@/components/core/tables/professores/professores-data-table';

import useAuthentication from '@/hooks/useAuthentication';
import { useProfessor } from '@/hooks/useProfessor';

const ProfessoresPage = () => {
  const { data, isLoading } = useProfessor();
  const { isAdmin, hasUser } = useAuthentication();
  const router = useRouter();
  if (!hasUser) router.push('/');
  if (!isAdmin) router.push('/dashboard');
  if (isAdmin)
    return (
      <div className="flex flex-col gap-12">
        <header className="inline-flex items-center gap-4 bg-zinc-950 px-4 py-16 text-white md:px-12">
          <div className="inline-flex size-11 items-center justify-center rounded-lg bg-emerald-100 md:size-12">
            <GraduationCapIcon className="size-5 min-w-5 text-emerald-400 md:size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold md:text-2xl">Professores</h1>
            <p className="text-sm text-zinc-400">Tenha acesso aos controle de professores.</p>
          </div>
        </header>
        <div className="flex flex-col gap-2 px-4 md:gap-4">
          {isLoading ? (
            <div></div>
          ) : (
            <ProfessoresDataTable columns={professoresColumns} data={data} />
          )}
        </div>
      </div>
    );

  return <></>;
};

export default ProfessoresPage;
