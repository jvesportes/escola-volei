'use client';

import { useRouter } from 'next/navigation';

import { GoBackButton } from '@/components/core/navigation/go-back-button';
import { professoresColumns } from '@/components/core/tables/professores/professores-columns';
import { ProfessoresDataTable } from '@/components/core/tables/professores/professores-data-table';
import { Card } from '@/components/shared/ui/card';

import { useProfessor } from '@/hooks/useProfessor';

import { hasRoleAccess, hasUser } from '@/utils';

const ProfessoresPage = () => {
  const { data, isLoading, error } = useProfessor();
  const router = useRouter();
  if (!hasUser()) router.push('/');
  if (!hasRoleAccess()) router.push('/dashboard');
  if (hasRoleAccess())
    return (
      <div className="flex size-full flex-col gap-6 overflow-y-scroll scroll-smooth p-4 pb-32 md:gap-12 md:px-16 md:py-6">
        <div className="flex flex-col">
          <GoBackButton disabled={false} />
          <h2>Escolinha de Vôlei</h2>
          <span className="text-[14px] leading-5 text-slate-500">Páginas/Professores</span>
        </div>
        <Card className="w-full p-4 md:p-6">
          <div className="flex w-full flex-col gap-4 md:gap-6">
            <h1>Professores</h1>
            <div className="flex flex-col gap-2 md:gap-4">
              {isLoading ? (
                <></>
              ) : (
                <ProfessoresDataTable columns={professoresColumns} data={data} />
              )}
            </div>
          </div>
        </Card>
      </div>
    );

  return <></>;
};

export default ProfessoresPage;
