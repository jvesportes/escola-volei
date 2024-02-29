import { AirplayIcon, AppleIcon, LucideIcon, UserIcon, UsersIcon } from 'lucide-react';

interface ISubItem {
  label: string;
  path: string;
}

interface IMenu {
  icon: LucideIcon;
  label: string;
  path: string;
  subItems?: ISubItem[];
}

export const adminMenuPaths: IMenu[] = [
  {
    icon: AirplayIcon,
    label: 'Início',
    path: '/dashboard',
  },
  {
    icon: UserIcon,
    label: 'Alunos',
    path: '/dashboard/alunos',
  },
  {
    icon: UsersIcon,
    label: 'Turmas',
    path: '/dashboard/turmas',
  },
  {
    icon: AppleIcon,
    label: 'Professores',
    path: '/dashboard/professores',
  },
];

export const teacherMenuPaths: IMenu[] = [
  {
    icon: AirplayIcon,
    label: 'Início',
    path: '/dashboard',
  },
  {
    icon: UserIcon,
    label: 'Alunos',
    path: '/dashboard/alunos',
  },
  {
    icon: UsersIcon,
    label: 'Turmas',
    path: '/dashboard/turmas',
  },
  {
    icon: AppleIcon,
    label: 'Professores',
    path: '/dashboard/professores',
  },
];

export const studentMenuPaths: IMenu[] = [
  {
    icon: AirplayIcon,
    label: 'Início',
    path: '/dashboard',
  },
  {
    icon: UserIcon,
    label: 'Alunos',
    path: '/dashboard/alunos',
  },
  {
    icon: UsersIcon,
    label: 'Turmas',
    path: '/dashboard/turmas',
  },
  {
    icon: AppleIcon,
    label: 'Professores',
    path: '/dashboard/professores',
  },
];
