"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Aluno, Turma } from "@/utils/types";
import { EditTurmaMenuItem } from "./edit-turma-menu-item";
import { ExcluirTurmaMenuItem } from "./delete-turma-menu-item";

export const turmasColumns: ColumnDef<Turma>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "professor",
    header: "Professor",
  },
  {
    accessorKey: "horario",
    header: "Horário",
  },
  {
    accessorKey: "alunos",
    header: "Alunos",
    cell: ({ row }) => {
      const alunos: Aluno[] = row.getValue("alunos");

      return <>{alunos.length}</>;
    },
  },
  {
    accessorKey: "local",
    header: "Local",
  },

  {
    id: "ações",
    accessorKey: "Ações",
    header: "Ações",
    cell: ({ row }) => {
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
            <EditTurmaMenuItem />
            <DropdownMenuSeparator />
            <ExcluirTurmaMenuItem />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
