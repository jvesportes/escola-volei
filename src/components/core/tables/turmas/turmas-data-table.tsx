'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

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
import { Download, SearchIcon, Settings, Users } from 'lucide-react';

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
import useAuthentication from '@/hooks/useAuthentication';

import { ClassType, Teacher } from '@/utils/types';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TurmaDataTable<TData extends ClassType, TValue>({
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
  const { isAdmin } = useAuthentication();
  const router = useRouter();

  function downloadCSV() {
    const getLocal = (local: string) => {
      console.error('LOCALLLL ---> ', local);
      switch (local) {
        case 'asanorte':
          return 'Asa Norte';
        case 'asasul':
          return 'Asa Sul';
        case 'parkway':
          return 'Park Way';
        default:
          return '';
      }
    };
    const formattedData = data.map((item) => {
      return {
        nome: item.nome,
        professor: (item.professor as unknown as Teacher).nome,
        horario: item.horario,
        alunos: item.alunosTurmas?.length ?? 0,
        unidade: getLocal(item.unidade as string),
      };
    });
    csvDownload({
      data: formattedData,
      filename: 'turmas.csv',
    });
  }

  return (
    <div>
      <div className="flex w-full flex-row items-center justify-between gap-2 pb-4">
        <div className="relative">
          <SearchIcon className="absolute inset-y-2.5 left-3 size-5 text-zinc-400" />
          <Input
            placeholder="Pesquisar por nome"
            value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('nome')?.setFilterValue(event.target.value)}
            className="max-w-sm pl-10"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          {isAdmin && (
            <Button
              size={'sm'}
              onClick={() => {
                onOpen('addTurma');
              }}
            >
              <span className="hidden md:flex">Adicionar Turma</span>
              <Users className="size-5 text-white md:hidden" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Settings className="size-4" />
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
          <Button variant="secondary" onClick={downloadCSV}>
            <span className="hidden md:flex">Exportar</span>
            <Download className="size-5 text-black md:hidden" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
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
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {/* {cell.column.columnDef.id === 'actions' ? null : ()} */}
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <>
                        {cell.column.columnDef.id === 'actions' ? (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ) : (
                          <TableCell
                            key={cell.id}
                            onClick={() => {
                              router.push(
                                `/dashboard/turmas/${
                                  (
                                    data[row.id as unknown as number] as {
                                      id: string;
                                    }
                                  ).id
                                }`,
                              );
                            }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        )}
                      </>
                    );
                  })}
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
