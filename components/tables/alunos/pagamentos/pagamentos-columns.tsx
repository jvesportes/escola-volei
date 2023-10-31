'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, MoreHorizontal, Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Aluno, Pagamento, Payment } from '@/utils/types';
import { DeletePagmaentoAlunoMenuItem } from './delete-pagamento-aluno-menu-item';
import { Badge } from '@/components/ui/badge';
import { formatToDate } from 'brazilian-values';

export const pagamentosColumns: ColumnDef<Payment>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'dataPagamento',
    header: 'Data de Pagamento',
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
          Data de Vencimento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const vencimentoDate = new Date(row.getValue('vigencia'));

      return <>{formatToDate(vencimentoDate)}</>;
    },
  },
  {
    accessorKey: 'valor',
    header: 'Valor',
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

      const situacao = new Date(vigencia) < new Date() ? 'Atrasado' : 'Em dia';
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
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
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

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "amount",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"));
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount);

//       return <div className="text-right font-medium">{formatted}</div>;
//     },
//   },
// ];
