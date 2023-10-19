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
import { Aluno, AlunoPresenca, AlunoTurma, Turma } from "@/utils/types";
import { ExcluirAlunoTurmaMenuItem } from "./delete-turma-aluno-menu-item";

export const turmaColumns: ColumnDef<AlunoTurma>[] = [
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
    accessorKey: "aluno",
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
    cell: ({ row }) => {
      const aluno: Aluno = row.getValue("aluno");
      return <>{aluno.nome}</>;
    },
  },

  {
    accessorKey: "presenca",
    header: "Presença",
    cell: ({ row }) => {
      const presenca: AlunoPresenca[] = row.getValue("presenca");
      return (
        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" checked={presenca[0].presenca} />
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
            <ExcluirAlunoTurmaMenuItem />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
