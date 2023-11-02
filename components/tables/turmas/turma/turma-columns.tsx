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
import { api } from '@/services';
import { useToast } from '@/components/ui/use-toast';

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
];
