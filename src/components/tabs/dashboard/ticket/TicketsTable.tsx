import { cn } from "@/lib/utils";
import { TicketTableHeader } from "./TableHeader";
import { useStore } from "@/hooks";
import { getAllTickets, openTicket } from "@/store";
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
import { ticketsColumns } from "@/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ticket } from "@/interfaces";
import { TicketStatus } from "@/enums";

// Function to get responsive classes for each column
const getColumnClasses = (columnId: string) => {
  switch (columnId) {
    case "agentName":
      return "hidden md:table-cell"; // Always visible
    case "agentStatus":
      return "hidden xl:table-cell";
    case "customerEmail":
      return "";
    case "customerName":
      return "hidden md:table-cell";
    case "status":
      return "hidden lg:table-cell";
    case "priority":
      return "hidden lg:table-cell";
    case "updatedAt":
      return "hidden xl:table-cell"; // Hidden on mobile, visible from 692px+
    case "actions":
      return ""; // Always visible
    default:
      return "";
  }
};

type TicketsTableProps = {
  triggerUpdateStatus: (ticket: Ticket, status: TicketStatus) => void;
  triggerDeleteTicket: (ticket: Ticket) => void;
};

export const TicketsTable = ({
  triggerDeleteTicket,
  triggerUpdateStatus,
}: TicketsTableProps) => {
  const { getState, dispatch } = useStore();
  const { tickets } = getState("Ticket");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>();

  const onRefresh = () => {
    dispatch(getAllTickets());
  };

  const triggerOpenTicket = (ticket: Ticket) => {
    dispatch(openTicket(ticket));
  };

  const table = useReactTable({
    data: tickets || [],
    meta: {
      triggerDeleteTicket,
      triggerUpdateStatus,
    },
    columns: ticketsColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div
      className={cn(
        "grid grid-rows-auto sm:grid-rows-[80px_max-content] relative max-w-full overflow-x-hidden"
      )}
    >
      <div className="max-w-full flex items-center sm:border-t">
        <TicketTableHeader
          onChange={(e: any) => {
            table.getColumn("customerEmail")?.setFilterValue(e.target.value);
          }}
          value={
            (table.getColumn("customerEmail")?.getFilterValue() as string) ?? ""
          }
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
                        "py-4 px-2 hover:bg-gray-200 text-base font-dmsans font-medium tracking-tight whitespace-nowrap",
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
                  onClick={() => triggerOpenTicket(row.original)}
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
