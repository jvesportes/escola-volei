'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Apple,
  ArrowRight,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react';

import { GoBackButton } from '@/components/core/navigation/go-back-button';
import { Button } from '@/components/shared/ui/button';
import { Card } from '@/components/shared/ui/card';

import { hasRoleAccess, hasUser, UserType } from '@/utils';

const DashboardPage = () => {
  const router = useRouter();
  if (!hasUser()) router.push('/');
  if (hasUser())
    return (
      <div className="flex size-full flex-col gap-6 overflow-y-scroll scroll-smooth p-4 pb-32 md:gap-12 md:px-16 md:py-6">
        <div className="flex flex-col">
          <GoBackButton disabled={true} />
          <h2>Escolinha de Vôlei</h2>
          <span className="text-[14px] leading-5 text-slate-500">Páginas/Início</span>
        </div>
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <h1>
              {(JSON.parse(localStorage.getItem('@user') || '{}') as UserType).user_metadata.nome}
            </h1>
            {hasRoleAccess() && (
              <div className="no-scrollbar flex flex-row gap-4 overflow-y-scroll md:gap-6 ">
                <Card className="p-4 md:p-6">
                  <div className="flex flex-row items-center justify-between gap-4 md:gap-6">
                    <div className="flex flex-row gap-2">
                      <User className="size-8 text-slate-900" strokeWidth={2} />
                      <h2>Alunos</h2>
                    </div>
                    <Button
                      onClick={() => {
                        router.push('/dashboard/alunos');
                      }}
                      size={'icon'}
                    >
                      <ArrowRight className="size-4 text-white" strokeWidth={3} />
                    </Button>
                  </div>
                </Card>
                <Card className="p-4 md:p-6">
                  <div className="flex flex-row items-center justify-between gap-4 md:gap-6">
                    <div className="flex flex-row gap-2">
                      <Users className="size-8 text-slate-900" strokeWidth={2} />
                      <h2>Turmas</h2>
                    </div>
                    <Button
                      onClick={() => {
                        router.push('/dashboard/turmas');
                      }}
                      size={'icon'}
                    >
                      <ArrowRight className="size-4 text-white" strokeWidth={3} />
                    </Button>
                  </div>
                </Card>
                <Card className="p-4 md:p-6">
                  <div className="flex flex-row items-center justify-between gap-4 md:gap-6">
                    <div className="flex flex-row gap-2">
                      <Apple className="size-8 text-slate-900" strokeWidth={2} />
                      <h2>Professores</h2>
                    </div>
                    <Button
                      onClick={() => {
                        router.push('/dashboard/professores');
                      }}
                      size={'icon'}
                    >
                      <ArrowRight className="size-4 text-white" strokeWidth={3} />
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <h2>Nossos Valores</h2>
            <div className="no-scrollbar flex flex-row gap-4 overflow-y-scroll md:gap-6 ">
              <Card className="min-w-[230px] gap-2 p-4 md:min-w-[300px] md:p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-center">Integridade</h3>
                    <p className="subtle text-center">
                      Nosso compromisso com a integridade é inabalável. Agimos com honestidade,
                      transparência e ética em tudo o que fazemos, buscando sempre a verdade e
                      mantendo altos padrões morais.
                    </p>
                  </div>
                  <ShieldCheck className="size-12 text-slate-900 md:size-16" />
                </div>
              </Card>
              <Card className="min-w-[230px] gap-2 p-4 md:min-w-[300px] md:p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-center">Inovação</h3>
                    <p className="subtle text-center">
                      Abraçamos a inovação como motor de progresso. Constantemente buscamos maneiras
                      criativas de melhorar e encontrar soluções para desafios complexos,
                      impulsionando o crescimento e a evolução.
                    </p>
                  </div>
                  <Lightbulb className="size-12 text-slate-900 md:size-16" />
                </div>
              </Card>
              <Card className="min-w-[230px] gap-2 p-4 md:min-w-[300px] md:p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-center">Comunidade</h3>
                    <p className="subtle text-center">
                      Valorizamos a importância de uma comunidade unida. Trabalhamos lado a lado,
                      apoiando e cuidando uns dos outros, e também contribuindo para o bem-estar das
                      comunidades em que vivemos e atuamos.
                    </p>
                  </div>
                  <HeartHandshake className="size-12 text-slate-900 md:size-16" />
                </div>
              </Card>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 md:gap-6">
            <h2>Obrigado Por Fazer Parte!</h2>
            <Card className="p-4 md:p-6">
              <div className="no-scrollbar flex flex-row gap-2 overflow-x-scroll md:gap-6">
                <div className="relative aspect-square min-h-[280px] w-full rounded-lg">
                  <Image
                    src={'/professores1.png'}
                    fill
                    className=" rounded-lg"
                    alt="Imagens de torneios."
                  />
                </div>
                <div className="relative aspect-square min-h-[280px] w-full rounded-lg ">
                  <Image
                    src={'/torneio.png'}
                    fill
                    className=" rounded-lg"
                    alt="Imagens de torneios."
                  />
                </div>
                <div className="relative aspect-square min-h-[280px] w-full rounded-lg">
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
