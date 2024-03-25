'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';
import { Checkbox } from '@/components/shared/ui/checkbox';

import { Presence } from '@/utils/types';

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
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('data_aula') as string;

      return <>{`${date.split('-')[2]}/${date.split('-')[1]}/${date.split('-')[0]}`}</>;
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
