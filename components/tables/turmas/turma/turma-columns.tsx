'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Aluno,
  AlunoPresenca,
  AlunoTurma,
  PresenceType,
  Turma,
} from '@/utils/types';
import { ExcluirAlunoTurmaMenuItem } from './delete-turma-aluno-menu-item';
import { Separator } from '@/components/ui/separator';
import { HistoricoAlunoTurmaMenuItem } from './historico-turma-aluno-menu-item';

export const turmaColumns: ColumnDef<PresenceType>[] = [
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
    accessorKey: 'aluno.nome',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'presencas',
    header: 'Presença',
    cell: ({ row }) => {
      const presenca: { data: Date; estaPresente: boolean }[] =
        row.getValue('presencas');
      console.log(presenca);
      return (
        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" checked={presenca[0].estaPresente} />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Presença
            </label>
          </div>
        </div>
      );
    },
  },
];
