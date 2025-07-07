import { Button, SearchInput } from "@/components/form";
import {
  CustomDropdownMenuCheckboxItem,
  SortingDropDown,
} from "@/components/popups";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/hooks";
import { PaginatedUserData } from "@/interfaces";
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
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ListFilter,
  RefreshCcw,
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
import { cn } from "@/lib/utils";
import { Badge } from "@/components/badge";
import { getAdminUserAnalytics, getUsers } from "@/store";

export const columns: ColumnDef<PaginatedUserData>[] = [
  {
    accessorKey: "_id",
    header: "User ID",
    cell: ({ row }) => <div>{row.getValue("_id")}</div>,
  },
  {
    id: "fullName",
    // accessorKey: "botId",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: "Full name",
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
  },
  {
    id: "email",
    accessorFn: (row) => row.email,
    header: "Email",
  },
  {
    id: "status",
    accessorFn: (row) => (row.isSuspended ? "Inactive" : "Active"),
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "lastLogin",
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
              Last Seen
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
              Join Date
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
  active: "success",
  inactive: "gray",
  failed: "error",
};

interface UsersTableProps {
  viewUser: (data: PaginatedUserData) => void;
}

export const UsersTable = ({ viewUser }: UsersTableProps) => {
  const { dispatch, getState } = useStore();
  const { users } = getState("Auth");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ _id: false, userId: false });
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 100,
  });

  const table = useReactTable({
    data: users || [],
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

  const refreshTable = () => {
    dispatch(getAdminUserAnalytics());
    dispatch(getUsers());
  };

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
          <Button variant={"brand"} className="h-10" onClick={refreshTable}>
            <RefreshCcw />
            Refresh
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
                        "p-0": ["createdAt", "lastLogin"].includes(header.id),
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
                    onClick={() => viewUser(row.original)}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => {
                      if (
                        cell.id.includes("createdAt") ||
                        cell.id.includes("lastLogin")
                      ) {
                        return (
                          <TableCell
                            key={cell.id}
                            className="font-sfpro-medium text-gray-900 text-sm whitespace-nowrap"
                          >
                            {new Date(
                              cell.getValue() as string
                            ).toLocaleString()}
                          </TableCell>
                        );
                      }

                      if (cell.id.includes("botStatus")) {
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
  table: TableType<PaginatedUserData>;
};

const headerMap: Record<string, string> = {
  botId: "Bot ID",
  createdAt: "Held Date",
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
          key={"_id"}
          checked={true}
          disabled
          className="capitalize mx-2 py-2 cursor-pointer font-sfpro"
        >
          <div className="flex justify-between items-center flex-1">
            {"User ID"}
            <img src={pinLogo} />
          </div>
        </CustomDropdownMenuCheckboxItem>
        {table
          .getAllColumns()
          .filter(
            (column) =>
              column.getCanHide() &&
              !["actions", "_id", "userId"].includes(column.id)
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
