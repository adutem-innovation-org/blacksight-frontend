import { cn } from "@/lib/utils";
import { ReminderTableHeader } from "./table-components";
import { useStore } from "@/hooks";
import { getAllReminders } from "@/store";
import { useState } from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { remindersHistoryColumns } from "@/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Function to get responsive classes for each column
const getColumnClasses = (columnId: string) => {
  switch (columnId) {
    case "tag":
      return ""; // Always visible
    case "status":
      return "";
    case "channel":
      return "hidden sm:table-cell";
    case "type":
      return "hidden lg:table-cell";
    case "category":
      return "hidden xl:table-cell";
    case "updatedAt":
      return "hidden xl:table-cell"; // Hidden on mobile, visible from 692px+
    case "actions":
      return ""; // Always visible
    default:
      return "";
  }
};

export const ReminderHistoryTable = () => {
  const { getState, dispatch } = useStore();
  const { reminders } = getState("Reminder");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    isActive: false,
  });

  const onRefresh = () => {
    dispatch(getAllReminders());
  };

  const table = useReactTable({
    data: reminders || [],
    meta: {},
    columns: remindersHistoryColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div
      className={cn(
        "grid grid-rows-auto sm:grid-rows-[80px_max-content] relative max-w-full overflow-x-hidden"
      )}
    >
      <div className="max-w-full">
        <ReminderTableHeader
          onChange={(e: any) => {
            table.getColumn("tag")?.setFilterValue(e.target.value);
          }}
          value={(table.getColumn("tag")?.getFilterValue() as string) ?? ""}
          onRefresh={onRefresh}
        />
      </div>
      <div className="md:border-t w-full overflow-x-auto">
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
                          "!p-0":
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
                        "px-2 pl-4 py-3",
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
