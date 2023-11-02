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
  StudentClassType,
  Turma,
} from '@/utils/types';
import { ExcluirAlunoTurmaMenuItem } from './delete-turma-aluno-menu-item';
import { Separator } from '@/components/ui/separator';
import { HistoricoAlunoTurmaMenuItem } from './historico-turma-aluno-menu-item';
import { isEqual, lightFormat } from 'date-fns';

export const turmaColumns: ColumnDef<StudentClassType>[] = [
  {
    accessorKey: 'nome',
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
    accessorKey: 'presenca.presencas',
    header: 'Presença',
    cell: ({ row }) => {
      const studentClass: any = row.original;
      const isPresent =
        studentClass.presenca !== undefined &&
        studentClass.presenca.presencas[0].data ===
          lightFormat(new Date(), 'yyyy-MM-dd') &&
        studentClass.presenca.presencas[0].estaPresente;
      return (
        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" checked={isPresent ? true : false} />
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
