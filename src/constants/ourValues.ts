import { HeartHandshakeIcon, LightbulbIcon, LucideIcon, ShieldCheckIcon } from 'lucide-react';

interface IValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ourValues: IValue[] = [
  {
    icon: ShieldCheckIcon,
    title: 'Integridade',
    description:
      'Nosso compromisso com a integridade é inabalável. Agimos com honestidade, transparência e ética em tudo o que fazemos, buscando sempre a verdade e mantendo altos padrões morais.',
  },
  {
    icon: LightbulbIcon,
    title: 'Inovação',
    description:
      'Abraçamos a inovação como motor de progresso. Constantemente buscamos maneiras criativas de melhorar e encontrar soluções para desafios complexos, impulsionando o crescimento e a evolução.',
  },
  {
    icon: HeartHandshakeIcon,
    title: 'Comunidade',
    description:
      'Valorizamos a importância de uma comunidade unida. Trabalhamos lado a lado, apoiando e cuidando uns dos outros, e também contribuindo para o bem-estar das comunidades em que vivemos e atuamos.',
  },
];
