'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';

import { StudentClassType } from '@/utils/types';

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
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
];
