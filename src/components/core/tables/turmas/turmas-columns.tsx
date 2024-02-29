'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';
import { Checkbox } from '@/components/shared/ui/checkbox';

import { ClassType, Teacher } from '@/utils/types';

export const turmasColumns: ColumnDef<ClassType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'nome',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'professor',
    header: 'Professor',
    cell: ({ row }) => {
      const professor: Teacher = row.getValue('professor');

      return <>{professor.nome}</>;
    },
  },
  {
    accessorKey: 'horario',
    header: 'Horário',
    cell: ({ row }) => {
      const horario: string = row.getValue('horario');
      const today = new Date();
      const [hour, minute, second] = horario.split(':');
      today.setHours(Number(hour), Number(minute), Number(second));

      return <>{format(today, 'p', { locale: ptBR })}</>;
    },
  },
  {
    accessorKey: 'alunosTurma',
    header: 'Alunos',
    cell: ({ row }) => {
      const turma: ClassType = row.original;

      return <>{turma.alunosTurmas ? turma.alunosTurmas.length : 0}</>;
    },
  },
  {
    accessorKey: 'unidade',
    header: 'Unidade',
    cell: ({ row }) => {
      const unidade: string = row.getValue('unidade');

      if (unidade === 'asasul') return <>{'Asa Sul'}</>;
      if (unidade === 'asanorte') return <>{'Asa Norte'}</>;
      if (unidade === 'parkway') return <>{'Park Way'}</>;
    },
  },
];
