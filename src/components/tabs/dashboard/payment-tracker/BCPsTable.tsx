import { bcpsTableColumns } from "@/constants";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks";
import { SearchBCPs } from "./SearchBCP";
import { IBCP } from "@/interfaces";

// Custom global filter function for multi-column OR search
const globalFilterFn = (row: Row<IBCP>, columnId: string, value: string) => {
  if (!value) return true;

  const searchValue = value.toLowerCase();
  const columnsToSearch = ["name", "email"]; // Add more columns as needed

  return columnsToSearch.some((colId) => {
    const cellValue = row.getValue(colId);
    return cellValue?.toString().toLowerCase().includes(searchValue);
  });
};

type BCPsTableProps = {};

export const BCPsTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { getState } = useStore();
  const { BCPs } = getState("PaymentTracker");

  const table = useReactTable({
    data: BCPs || [],
    meta: {},
    columns: bcpsTableColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  // Function to get responsive classes for each column
  const getColumnClasses = (columnId: string) => {
    switch (columnId) {
      case "name":
        return "hidden min-[400px]:table-cell sm:table-cell";
      case "email":
        return "";
      case "paymentInterval":
        return "hidden xl:table-cell";
      case "uploadedBy":
        return "hidden xl:table-cell";
      case "updatedAt":
        return "hidden xl:table-cell";
      case "actions":
        return "";
      case "lastPayment":
        return "hidden md:table-cell";
      case "nextPayment":
        return "hidden lg:table-cell";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "grid grid-rows-auto sm:grid-rows-[80px_max-content] relative"
      )}
    >
      <div>
        <SearchBCPs
          value={globalFilter ?? ""}
          onChange={(event: any) => {
            table.setGlobalFilter(String(event.target.value));
          }}
        />
      </div>

      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-b-gray-200/40 !border-b-2"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "py-4 px-2 hover:bg-gray-200 text-base font-dmsans font-medium tracking-tight",
                        getColumnClasses(header.id),
                        {
                          "!py-0":
                            header.column.getCanFilter() ||
                            header.column.getCanSort(),
                          "hover:bg-transparent": header.id === "actions",
                        }
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-gray-200/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "px-2 py-2",
                        getColumnClasses(cell.column.id)
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
