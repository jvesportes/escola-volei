'use client';

import { ColumnDef } from '@tanstack/react-table';
import { formatToDate } from 'brazilian-values';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

import { Payment } from '@/utils/types';

import { DeletePagmaentoAlunoMenuItem } from './delete-pagamento-aluno-menu-item';

export const pagamentosColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'dataPagamento',
    header: 'Início do Contrato',
    cell: ({ row }) => {
      const pagamentoDate: Date = new Date(row.getValue('dataPagamento'));

      return <>{formatToDate(pagamentoDate)}</>;
    },
  },
  {
    accessorKey: 'vigencia',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Vencimento
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const vencimentoDate = new Date(row.getValue('vigencia'));

      return <>{formatToDate(vencimentoDate)}</>;
    },
  },
  {
    accessorKey: 'plano',
    header: 'Plano',
  },
  {
    accessorKey: 'vigencia',
    header: 'Situação',
    cell: ({ row }) => {
      const vigencia: string = row.getValue('vigencia');
      const pagamentoDate: Date = new Date(row.getValue('dataPagamento'));

      const situacao = new Date(vigencia) < pagamentoDate ? 'Atrasado' : 'Em dia';

      return (
        <Badge
          className="w-20 justify-center"
          variant={situacao === 'Atrasado' ? 'destructive' : 'green'}
        >
          {situacao}
        </Badge>
      );
    },
  },
  {
    id: 'ações',
    accessorKey: 'Ações',
    header: 'Ações',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DeletePagmaentoAlunoMenuItem payment={payment} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
