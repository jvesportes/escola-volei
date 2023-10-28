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
  AlunoEspera,
  AlunoPresenca,
  AlunoTurma,
  Turma,
} from '@/utils/types';

export const historicoColumns: ColumnDef<AlunoPresenca>[] = [
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
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('date') as Date;
      console.log(date);
      return (
        <>
          {date.getDay()}/{date.getMonth()}/{date.getFullYear()}
        </>
      );
    },
  },
  {
    accessorKey: 'presenca',
    header: 'Status',
    cell: ({ row }) => {
      const presenca = row.getValue('presenca') as boolean;
      return <>{presenca ? 'Presente' : 'Ausente'}</>;
    },
  },
  {
    id: 'ações',
    accessorKey: 'Ações',
    header: 'Ações',
    cell: ({ row }) => {
      return (
        <div className="items-top flex space-x-2">
          {/* <Checkbox id="terms1" checked={presenca[0].presenca} /> */}
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none pr-2">
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
