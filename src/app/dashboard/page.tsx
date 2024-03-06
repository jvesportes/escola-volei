'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ourValues } from '@/constants/ourValues';
import HiAsset from '@assets/images/hi.gif';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  GraduationCapIcon,
  HeartHandshakeIcon,
  LucideIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react';

import useAuthentication from '@/hooks/useAuthentication';

import { cn } from '@/lib/utils';
import { slideUp } from '@/utils/animations';

const DashboardPage = () => {
  const router = useRouter();
  const { hasUser } = useAuthentication();

  if (!hasUser) router.push('/');

  if (hasUser)
    return (
      <motion.div className="flex size-full flex-col">
        <MenuOptions />
        <div className="relative -top-32 flex flex-col gap-12 px-4 md:px-12">
          <OurValues />
          <motion.section
            id="thank-you"
            className="flex w-full flex-col gap-4 md:gap-6"
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div className="inline-flex items-center gap-2" variants={slideUp}>
              <HeartHandshakeIcon className="size-5" />
              <h2 className="text-2xl font-bold">Obrigado Por Fazer Parte!</h2>
            </motion.div>
            <div className="no-scrollbar flex flex-row gap-8 overflow-x-scroll md:gap-6">
              <motion.div
                className="relative aspect-square min-h-[280px] w-full rounded-lg"
                variants={slideUp}
              >
                <Image
                  src={'/professores1.png'}
                  fill
                  className=" rounded-lg"
                  alt="Imagens de torneios."
                />
              </motion.div>
              <motion.div
                className="relative aspect-square min-h-[280px] w-full rounded-lg"
                variants={slideUp}
              >
                <Image
                  src={'/torneio.png'}
                  fill
                  className="rounded-lg"
                  alt="Imagens de torneios."
                />
              </motion.div>
              <motion.div
                className="relative aspect-square min-h-[280px] w-full rounded-lg"
                variants={slideUp}
              >
                <Image
                  src={'/torneio2.png'}
                  fill
                  className="rounded-lg"
                  alt="Imagens de torneios."
                />
              </motion.div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    );

  return <></>;
};

export default DashboardPage;

function MenuOptions() {
  const { isAdmin, user } = useAuthentication();

  return (
    <section
      id="menu"
      className="flex flex-col gap-8 bg-zinc-950 px-4 pb-48 pt-16 text-white md:px-12"
    >
      <motion.div
        className="inline-flex gap-2"
        variants={slideUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Image src={HiAsset} alt="Hi" className="size-6" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">
            Bem-vindo, <strong>{user?.user_metadata.nome}</strong>
          </h1>
          <p className="text-sm text-zinc-400">Aqui está seu menu de acesso rápido.</p>
        </div>
      </motion.div>
      <motion.div
        className="grid grid-cols-12 gap-4 md:gap-8"
        variants={slideUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {isAdmin && (
          <Fragment>
            <MenuOption icon={UserIcon} href="/dashboard/alunos" color="orange">
              Alunos
            </MenuOption>
            <MenuOption icon={UsersIcon} href="/dashboard/turmas" color="indigo">
              Turmas
            </MenuOption>
            <MenuOption icon={GraduationCapIcon} href="/dashboard/professores" color="emerald">
              Professores
            </MenuOption>
          </Fragment>
        )}
      </motion.div>
    </section>
  );
}

function MenuOption({
  children,
  href,
  color,
  ...props
}: Readonly<{
  children: React.ReactNode;
  href: string;
  icon: LucideIcon;
  color: 'indigo' | 'emerald' | 'orange';
}>) {
  return (
    <Link href={href} className="col-span-12 md:col-span-4">
      <motion.div
        className={cn(
          'flex w-full items-center gap-4 border border-zinc-900 p-4 md:p-6 rounded-xl',
          'group hover:border-zinc-800 hover:bg-zinc-900/50',
        )}
        variants={slideUp}
      >
        <div
          className={cn('inline-flex size-11 items-center justify-center rounded-lg md:size-12', {
            'bg-indigo-100': color === 'indigo',
            'bg-emerald-100': color === 'emerald',
            'bg-orange-100': color === 'orange',
          })}
        >
          <props.icon
            className={cn('size-5 min-w-5 md:size-6', 'transition-all duration-500 ease', {
              'text-indigo-400': color === 'indigo',
              'text-emerald-400': color === 'emerald',
              'text-orange-400': color === 'orange',
            })}
          />
        </div>
        <div>
          <h2 className="font-bold">{children}</h2>
          <div className="inline-flex items-center gap-1 text-sm text-zinc-400">
            <p>Acesse agora</p>
            <ChevronRight
              className={cn(
                'size-5',
                'transition-all group-hover:text-white group-hover:translate-x-1 duration-500',
              )}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function OurValues() {
  return (
    <motion.section
      id="our-values"
      className="flex flex-col gap-8"
      variants={slideUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div className="inline-flex items-center gap-2 text-white" variants={slideUp}>
        <HeartHandshakeIcon className="size-5" />
        <h2 className="text-2xl font-bold">Nossos Valores</h2>
      </motion.div>
      <div className="grid w-full grid-cols-12 gap-8">
        {ourValues.map((value) => (
          <motion.div
            key={value.title}
            className={cn(
              'col-span-12 flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-8 md:col-span-6 lg:col-span-4',
              'group hover:bg-zinc-100',
            )}
            variants={slideUp}
          >
            <div className="inline-flex size-12 items-center justify-center rounded-lg border bg-zinc-50">
              <value.icon
                className={cn(
                  'size-6 text-zinc-600 group-hover:rotate-12',
                  'transition-all duration-500 ease',
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold md:text-lg">{value.title}</h3>
              <p className="text-sm leading-[175%] text-zinc-600 md:text-base">
                {value.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
