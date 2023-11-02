'use client';
import { Card } from '@/components/ui/card';

import { GoBackButton } from '@/components/navigation/go-back-button';
import {
  Apple,
  ArrowRight,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserType, hasRoleAccess, hasUser } from '@/utils';
const DashboardPage = () => {
  const router = useRouter();
  if (!hasUser()) router.push('/');
  if (hasUser())
    return (
      <div className="flex w-full h-full md:px-16 md:py-6 md:gap-12 gap-6 p-4 flex-col overflow-y-scroll pb-32 scroll-smooth">
        <div className="flex flex-col">
          <GoBackButton disabled={true} />
          <h2>Escolinha de Vôlei</h2>
          <span className="text-slate-500 text-[14px] leading-5">
            Páginas/Início
          </span>
        </div>
        <div className="flex flex-col md:gap-8 gap-6">
          <div className="flex flex-col md:gap-6 gap-4">
            <h1>
              {
                (
                  JSON.parse(
                    window.localStorage.getItem('@user') || '{}'
                  ) as UserType
                ).user_metadata.nome
              }
            </h1>
            {hasRoleAccess() && (
              <div className="flex flex-row md:gap-6 gap-4 overflow-y-scroll no-scrollbar ">
                <Card className="md:p-6 p-4">
                  <div className="flex flex-row justify-between md:gap-6 gap-4 items-center">
                    <div className="flex flex-row gap-2">
                      <User
                        className="w-8 h-8 text-slate-900"
                        strokeWidth={2}
                      />
                      <h2>Alunos</h2>
                    </div>
                    <Button
                      onClick={() => {
                        router.push('/dashboard/alunos');
                      }}
                      size={'icon'}
                    >
                      <ArrowRight
                        className="text-white h-4 w-4"
                        strokeWidth={3}
                      />
                    </Button>
                  </div>
                </Card>
                <Card className="md:p-6 p-4">
                  <div className="flex flex-row justify-between md:gap-6 gap-4 items-center">
                    <div className="flex flex-row gap-2">
                      <Users
                        className="w-8 h-8 text-slate-900"
                        strokeWidth={2}
                      />
                      <h2>Turmas</h2>
                    </div>
                    <Button
                      onClick={() => {
                        router.push('/dashboard/turmas');
                      }}
                      size={'icon'}
                    >
                      <ArrowRight
                        className="text-white h-4 w-4"
                        strokeWidth={3}
                      />
                    </Button>
                  </div>
                </Card>
                <Card className="md:p-6 p-4">
                  <div className="flex flex-row justify-between md:gap-6 gap-4 items-center">
                    <div className="flex flex-row gap-2">
                      <Apple
                        className="w-8 h-8 text-slate-900"
                        strokeWidth={2}
                      />
                      <h2>Professores</h2>
                    </div>
                    <Button
                      onClick={() => {
                        router.push('/dashboard/professores');
                      }}
                      size={'icon'}
                    >
                      <ArrowRight
                        className="text-white h-4 w-4"
                        strokeWidth={3}
                      />
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
          <div className="flex flex-col md:gap-6 gap-4">
            <h2>Nossos Valores</h2>
            <div className="flex flex-row md:gap-6 gap-4 overflow-y-scroll no-scrollbar ">
              <Card className="md:p-6 p-4 gap-2 md:min-w-[300px] min-w-[230px]">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-center">Integridade</h3>
                    <p className="subtle text-center">
                      Nosso compromisso com a integridade é inabalável. Agimos
                      com honestidade, transparência e ética em tudo o que
                      fazemos, buscando sempre a verdade e mantendo altos
                      padrões morais.
                    </p>
                  </div>
                  <ShieldCheck className="md:h-16 md:w-16 h-12 w-12 text-slate-900" />
                </div>
              </Card>
              <Card className="md:p-6 p-4 gap-2 md:min-w-[300px] min-w-[230px]">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-center">Inovação</h3>
                    <p className="subtle text-center">
                      Abraçamos a inovação como motor de progresso.
                      Constantemente buscamos maneiras criativas de melhorar e
                      encontrar soluções para desafios complexos, impulsionando
                      o crescimento e a evolução.
                    </p>
                  </div>
                  <Lightbulb className="md:h-16 md:w-16 h-12 w-12 text-slate-900" />
                </div>
              </Card>
              <Card className="md:p-6 p-4 gap-2 md:min-w-[300px] min-w-[230px]">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-center">Comunidade</h3>
                    <p className="subtle text-center">
                      Valorizamos a importância de uma comunidade unida.
                      Trabalhamos lado a lado, apoiando e cuidando uns dos
                      outros, e também contribuindo para o bem-estar das
                      comunidades em que vivemos e atuamos.
                    </p>
                  </div>
                  <HeartHandshake className="md:h-16 md:w-16 h-12 w-12 text-slate-900" />
                </div>
              </Card>
            </div>
          </div>
          <div className="flex flex-col md:gap-6 gap-4 w-full">
            <h2>Obrigado Por Fazer Parte!</h2>
            <Card className="md:p-6 p-4">
              <div className="flex flex-row gap-2 md:gap-6 overflow-x-scroll no-scrollbar">
                <div className="relative w-full rounded-lg aspect-square min-h-[280px]">
                  <Image
                    src={'/professores1.png'}
                    fill
                    className=" rounded-lg"
                    alt="Imagens de torneios."
                  />
                </div>
                <div className="relative w-full rounded-lg aspect-square min-h-[280px] ">
                  <Image
                    src={'/torneio.png'}
                    fill
                    className=" rounded-lg"
                    alt="Imagens de torneios."
                  />
                </div>
                <div className="relative w-full rounded-lg aspect-square min-h-[280px]">
                  <Image
                    src={'/torneio2.png'}
                    fill
                    className=" rounded-lg"
                    alt="Imagens de torneios."
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  return <></>;
};

export default DashboardPage;
