'use client';

import * as React from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import csvDownload from 'json-to-csv-export';
import { DownloadIcon, SearchIcon, SettingsIcon, UploadIcon, UserPlus } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import { Input } from '@/components/shared/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';

import { useModal } from '@/hooks/use-modal-store';

import { Student } from '@/utils/types';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Student, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const { onOpen } = useModal();

  function downloadCSV() {
    // console.error(table.getRowModel().rows)
    const formatedData = data.map((item) => {
      return {
        cpf: item.cpf,
        nome: item.nome,
        email: item.email,
        plano: item.plano,
        tem_responsavel: item.responsavel !== null ? 'true' : 'false',
        telefone: item.telefone,
        cpfResponsavel: item.responsavel ? item.responsavel.cpf : '',
        emailResponsavel: item.responsavel ? item.responsavel.email : '',
        nomeResponsavel: item.responsavel ? item.responsavel.nome : '',
        telefoneResponsavel: item.responsavel ? item.responsavel.telefone : '',
      };
    });
    csvDownload({
      data: formatedData,
      // data: table.getRowModel().rows.map((item) => item.getVisibleCells()),
      filename: 'alunos.csv',
    });
  }

  return (
    <div>
      <div className="inline-flex w-full items-center justify-between gap-2 pb-6">
        <div className="relative">
          <SearchIcon className="absolute inset-y-2.5 left-3 size-5 text-zinc-400" />
          <Input
            placeholder="Pesquisar por nome"
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
            className="max-w-sm pl-10"
          />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="inline-flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => {
                onOpen('addAluno');
              }}
            >
              <UserPlus className="size-4 md:mr-1" />
              <span className="hidden md:flex">Adicionar Aluno</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <SettingsIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              onClick={() => {
                onOpen('addAlunos');
              }}
            >
              <UploadIcon className="size-4 md:mr-1" />
              <span className="hidden md:flex">Importar</span>
            </Button>
            <Button variant="outline" onClick={downloadCSV}>
              <DownloadIcon className="size-4 md:mr-1" />
              <span className="hidden md:flex">Exportar</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
