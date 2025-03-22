import { CustomDropdownItem, CustomDropdownMenuCheckboxItem } from "../popups";
import { Button, SearchInput } from "../form";
import { Badge } from "../badge";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
  Table as TableType,
} from "@tanstack/react-table";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  Ellipsis,
  ListFilter,
  Settings,
  X,
} from "lucide-react";
import React, { useState } from "react";
import styled from "styled-components";
import { Pagination, Group } from "@mantine/core";
import subscriptionData from "@/data/subscriptions.json";
import pinLogo from "@/assets/svgs/pin.svg";
import { Subscription } from "@/interfaces";

const subscriptions = subscriptionData as Subscription[];

export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "subscriptionId",
    header: "Subscription id",
    cell: ({ row }) => <div>{row.getValue("subscriptionId")}</div>,
  },
  {
    accessorKey: "subscriptionType",
    header: "Subscription Type",
    cell: ({ row }) => <div>{row.getValue("subscriptionType")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Amount
          <ListFilter />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Status
          <ChevronDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "clientName",
    header: "Client name",
    cell: ({ row }) => <div>{row.getValue("clientName")}</div>,
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice id",
    cell: ({ row }) => <div>{row.getValue("invoiceId")}</div>,
  },
  {
    accessorKey: "subscriptionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Subscription date
          <ListFilter />
        </Button>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none outline-none">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="px-2 py-2.5 rounded-lg border-none w-52 drop-shadow-lg"
            align="end"
          >
            <CustomDropdownItem
              // onClick={() => navigator.clipboard.writeText(payment.id)}
              placeholder="Print"
            />
            <CustomDropdownItem placeholder="Download as PDF" />
            <CustomDropdownItem placeholder="Share link" />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const badgeVariantMap: Record<string, any> = {
  Paid: "success",
  "In progress": "gray",
  Refunds: "warning",
  Failed: "error",
};

interface DashboardTableProps {
  viewSubscriptionDetails: (data: Subscription) => void;
}

export function SubscriptionTable({
  viewSubscriptionDetails,
}: DashboardTableProps) {
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
    data: subscriptions,
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
    <DashboardGrid className="bg-white rounded-xl overflow-hidden flex-1 grid">
      {/* Table header action sections */}
      <div className="flex items-center px-4">
        <div className="flex items-center gap-4 flex-1">
          <SearchInput
            placeholder="Search..."
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
            onChange={(event: any) =>
              table.getColumn("status")?.setFilterValue(event.target.value)
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
                    <TableHead key={header.id}>
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
                    onClick={() => viewSubscriptionDetails(row.original)}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => {
                      if (cell.id.includes("amount")) {
                        return (
                          <TableCell
                            key={cell.id}
                            className="font-sfpro text-gray-900 text-sm"
                          >
                            ₦
                            {Number(cell.getValue()).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                        );
                      }
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
        <div className="flex-1 text-sm text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected. */}
        </div>
        <div className="flex items-center flex-1">
          {/* <Pagination
            value={table.getState().pagination.pageIndex + 1}
            total={table.getPageCount()}
            onChange={(pageIndex: number) => {
              table.setPageIndex(pageIndex - 1);
            }}
          /> */}
          <Pagination.Root
            total={table.getPageCount()}
            value={table.getState().pagination.pageIndex + 1}
            onChange={(pageIndex: number) => {
              table.setPageIndex(pageIndex - 1);
            }}
          >
            <Group gap={5} justify="center">
              {/* <Pagination.First />
              <Pagination.Previous /> */}
              <Pagination.Items />
              {/* <Pagination.Next />
              <Pagination.Last /> */}
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
}
const DashboardGrid = styled.div`
  grid-template-rows: 110px 1fr 60px;
`;

type TableSettingProps = {
  table: TableType<Subscription>;
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
          key={"subscriptionType"}
          checked={true}
          disabled
          className="capitalize mx-2 py-2 cursor-pointer font-sfpro"
        >
          <div className="flex justify-between items-center flex-1">
            {"Subscription type"}

            <img src={pinLogo} />
          </div>
        </CustomDropdownMenuCheckboxItem>
        {table
          .getAllColumns()
          .filter(
            (column) =>
              column.getCanHide() &&
              // !["clientName", "invoiceId"].includes(column.id)
              !["actions"].includes(column.id)
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
                  <>
                    {column.columnDef?.header &&
                    typeof column.columnDef?.header === "string"
                      ? column.columnDef.header
                      : column.id === "subscriptionDate"
                      ? "subscription date"
                      : column.id}
                  </>

                  <img src={pinLogo} />
                </div>
              </CustomDropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
