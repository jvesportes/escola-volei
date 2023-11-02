'use client';
import { GoBackButton } from '@/components/navigation/go-back-button';
import { professoresColumns } from '@/components/tables/professores/professores-columns';
import { ProfessoresDataTable } from '@/components/tables/professores/professores-data-table';
import { Card } from '@/components/ui/card';
import { useProfessor } from '@/hooks/useProfessor';
import { hasRoleAccess, hasUser } from '@/utils';
import { useRouter } from 'next/navigation';

const ProfessoresPage = () => {
  const { data, isLoading, error } = useProfessor();
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
            Páginas/Professores
          </span>
        </div>
        <Card className="md:p-6 p-4 w-full">
          <div className="flex flex-col md:gap-6 gap-4 w-full">
            <h1>Professores</h1>
            <div className="flex flex-col md:gap-4 gap-2">
              {isLoading ? (
                <></>
              ) : (
                <ProfessoresDataTable
                  columns={professoresColumns}
                  data={data}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  return <></>;
};

export default ProfessoresPage;
