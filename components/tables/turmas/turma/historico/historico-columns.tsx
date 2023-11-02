'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { Presence } from '@/utils/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const historicoColumns: ColumnDef<Presence>[] = [
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
    accessorKey: 'data_aula',
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
      const date = row.getValue('data_aula') as string;
      console.log(date);
      return <>{format(new Date(date), 'P', { locale: ptBR })}</>;
    },
  },
  {
    accessorKey: 'esta_presente',
    header: 'Status',
    cell: ({ row }) => {
      const presenca = row.getValue('esta_presente') as boolean;
      return <>{presenca ? 'Presente' : 'Ausente'}</>;
    },
  },
];
