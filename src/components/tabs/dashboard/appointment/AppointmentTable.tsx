import { Button, SearchInput } from "@/components/form";
import {
  CustomDropdownMenuCheckboxItem,
  SortingDropDown,
  TableFilterDropdown,
} from "@/components/popups";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/hooks";
import { Appointment } from "@/interfaces";
import { Group, Pagination } from "@mantine/core";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  Table as TableType,
  flexRender,
} from "@tanstack/react-table";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ListFilter,
  Settings,
  X,
} from "lucide-react";
import React, { useState } from "react";
import styled from "styled-components";
import pinLogo from "@/assets/svgs/pin.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "_id",
    header: "Appointment ID",
    cell: ({ row }) => <div>{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "conversationId",
    header: "Conversation ID",
    cell: ({ row }) => <div>{row.getValue("conversationId")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <TableFilterDropdown
          OPTIONS={["pending", "scheduled", "cancelled", "completed"]}
          column={column}
          columnHeader="Status"
        />
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
    filterFn: (row, columnId, filterOptions: string[]) => {
      // If no filters are selected, show all
      if (!filterOptions || filterOptions.length === 0) return true;

      // Check if row's type is in the selected filter options
      return filterOptions.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "appointmentDate",
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      const sortDescending = () =>
        sortDirection === "desc"
          ? column.clearSorting()
          : column.toggleSorting(true);
      const sortAscending = () =>
        sortDirection === "asc"
          ? column.clearSorting()
          : column.toggleSorting(false);

      return (
        <SortingDropDown
          Trigger={
            <Button
              variant={"ghost"}
              onClick={column.getToggleSortingHandler()}
              className="hover:bg-transparent py-4 px-4 w-full h-full justify-start font-semibold text-xs text-[#717680] hover:text-[#535862]"
            >
              Appointment Date
              {sortDirection === "asc" && (
                <ListFilter className="text-blue-600 rotate-180" />
              )}
              {sortDirection === "desc" && (
                <ListFilter className="text-blue-600" />
              )}
              {!sortDirection && <ListFilter className="text-[#A4A7AE]" />}
            </Button>
          }
          sortDescending={sortDescending}
          sortAscending={sortAscending}
          sortDirection={sortDirection}
        />
      );
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      const sortDescending = () =>
        sortDirection === "desc"
          ? column.clearSorting()
          : column.toggleSorting(true);
      const sortAscending = () =>
        sortDirection === "asc"
          ? column.clearSorting()
          : column.toggleSorting(false);

      return (
        <SortingDropDown
          Trigger={
            <Button
              variant={"ghost"}
              onClick={column.getToggleSortingHandler()}
              className="hover:bg-transparent py-4 px-4 w-full h-full justify-start font-semibold text-xs text-[#717680] hover:text-[#535862]"
            >
              Scheduled On
              {sortDirection === "asc" && (
                <ListFilter className="text-blue-600 rotate-180" />
              )}
              {sortDirection === "desc" && (
                <ListFilter className="text-blue-600" />
              )}
              {!sortDirection && <ListFilter className="text-[#A4A7AE]" />}
            </Button>
          }
          sortDescending={sortDescending}
          sortAscending={sortAscending}
          sortDirection={sortDirection}
        />
      );
    },
    sortingFn: "datetime",
  },
];

const badgeVariantMap: Record<string, any> = {
  completed: "success",
  pending: "gray",
  cancelled: "error",
  scheduled: "primary",
};

export const AppointmentTable = () => {
  const { getState } = useStore();
  const { appointments } = getState("Appointment");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 100,
  });

  const table = useReactTable({
    data: appointments || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <DashboardGrid className="bg-white rounded-md overflow-hidden flex-1 grid">
      {/* Table header action sections */}
      <div className="flex items-center px-4">
        <div className="flex items-center gap-4 flex-1">
          <SearchInput
            placeholder="Search..."
            value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
            onChange={(event: any) =>
              table.getColumn("_id")?.setFilterValue(event.target.value)
            }
            className="max-w-80"
          />
          <Button variant="outline" className="h-11">
            <Calendar /> This month <ChevronDown />
          </Button>
        </div>
        <div className="ml-auto gap-4 flex items-center">
          <Button
            size={"icon"}
            variant={"secondary_gray"}
            className="rounded-full"
          >
            <ArrowDownToLine />
          </Button>

          {<TableSettings table={table} />}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border  flex-1 bg-white p-4 w-full overflow-auto h-full custom-scrollbar no-scrollbar">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn("py-4", {
                        "p-0": [
                          "tag",
                          "channel",
                          "isActive",
                          "type",
                          "remindAt",
                        ].includes(header.id),
                      })}
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
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => {
                      if (cell.id.includes("status")) {
                        return (
                          <TableCell key={cell.id}>
                            <Badge
                              variant={
                                badgeVariantMap[
                                  cell.getValue() as keyof typeof badgeVariantMap
                                ]
                              }
                              className="font-sfpro-medium"
                              size={"sm"}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Badge>
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell
                          key={cell.id}
                          className="font-sfpro-medium text-gray-900 text-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Subscription footer */}
      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-muted-foreground"></div>
        <div className="flex items-center flex-1">
          <Pagination.Root
            total={table.getPageCount()}
            value={table.getState().pagination.pageIndex + 1}
            onChange={(pageIndex: number) => {
              table.setPageIndex(pageIndex - 1);
            }}
          >
            <Group gap={5} justify="center">
              <Pagination.Items />
            </Group>
          </Pagination.Root>
        </div>
        <div className="space-x-2 flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>
    </DashboardGrid>
  );
};

const DashboardGrid = styled.div`
  grid-template-rows: 110px 1fr 60px;
`;

type TableSettingProps = {
  table: TableType<Appointment>;
};

const headerMap: Record<string, string> = {
  appointmentDate: "Appointment Date",
  appointmentTime: "Appointment Time",
  appointmentId: "Appointment ID",
  conversationId: "Conversation ID",
  status: "Status",
};

function TableSettings({ table }: TableSettingProps) {
  const [tableSettingsOpen, setTableSettingsOpen] = useState(false);

  const changeTableSettingsState = (value: boolean) =>
    setTableSettingsOpen(value);

  const hideTableSettingsDropdown = () => changeTableSettingsState(false);

  return (
    <DropdownMenu
      open={tableSettingsOpen}
      onOpenChange={changeTableSettingsState}
    >
      <DropdownMenuTrigger>
        <Button variant="secondary_gray" size={"icon"} className="rounded-full">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-0 py-2 rounded-lg border-none z-20 w-52 drop-shadow-lg bg-white min-w-[200px] max-w-[400px]"
        align="end"
        style={{ boxShadow: "0px 4px 16px #0000001F" }}
      >
        <DropdownMenuLabel className="flex justify-between items-center p-4 pt-2 bg-white cursor-pointer">
          <p className="font-urbanist font-semibold">Table settings</p>
          <X className="size-4" onClick={hideTableSettingsDropdown} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-1.5 h-[1px] bg-gray-200" />
        <CustomDropdownMenuCheckboxItem
          key={"appointmentId"}
          checked={true}
          disabled
          className="capitalize mx-2 py-2 cursor-pointer font-sfpro"
        >
          <div className="flex justify-between items-center flex-1">
            {"Appointment ID"}
            <img src={pinLogo} />
          </div>
        </CustomDropdownMenuCheckboxItem>
        {table
          .getAllColumns()
          .filter(
            (column) =>
              column.getCanHide() && !["actions", "_id"].includes(column.id)
          )
          .map((column) => {
            return (
              <CustomDropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                className="capitalize mx-2 py-2 cursor-pointer font-sfpro"
              >
                <div className="flex justify-between items-center flex-1">
                  <>{headerMap[column.id] ?? column.id}</>
                  <img src={pinLogo} />
                </div>
              </CustomDropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
