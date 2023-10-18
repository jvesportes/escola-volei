"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Aluno } from "@/utils/types";
import { EditAlunoMenuItem } from "./edit-aluno-menu-item";
import { ExcluirAlunoMenuItem } from "./delete-aluno-menu-item";

export const columns: ColumnDef<Aluno>[] = [
  {
    id: "select",
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
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "responsavel",
    header: "Responsável",
  },
  {
    accessorKey: "plano",
    header: "Plano",
  },
  {
    accessorKey: "pagamento",
    header: "Pagamento",
  },
  {
    id: "ações",
    accessorKey: "Ações",
    header: "Ações",
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
            <EditAlunoMenuItem />
            <DropdownMenuSeparator />
            <ExcluirAlunoMenuItem />
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
