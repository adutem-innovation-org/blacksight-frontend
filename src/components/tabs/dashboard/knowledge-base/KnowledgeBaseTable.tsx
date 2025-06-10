import {
  CustomDropdownItem,
  CustomDropdownMenuCheckboxItem,
  SortingDropDown,
  TableFilterDropdown,
} from "@/components/popups";
import { Button, SearchInput } from "@/components/form";
import { Badge } from "@/components/badge";
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
  Ban,
  Calendar,
  ChevronDown,
  CircleFadingArrowUp,
  Ellipsis,
  ListFilter,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import React, { useState } from "react";
import styled from "styled-components";
import { Pagination, Group } from "@mantine/core";
import pinLogo from "@/assets/svgs/pin.svg";
import { KnowledgeBase } from "@/interfaces";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks";

type ColumnMeta = {
  onDeleteKnowledgeBase: (data: KnowledgeBase) => void;
  setActiveStatus: (kb: KnowledgeBase, status: boolean) => void;
};

export const columns: ColumnDef<KnowledgeBase>[] = [
  {
    accessorKey: "_id",
    header: "Knowledge base id",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "tag",
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
              className="hover:bg-transparent py-4 px-4 w-full h-full justify-start text-xs font-semibold text-[#717680] hover:text-[#2f3236]"
            >
              Tag
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
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("tag")}</div>
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <TableFilterDropdown
          OPTIONS={["Active", "Inactive"]}
          column={column}
          columnHeader="Status"
        />
      );
    },
    cell: ({ row }) => (
      <div>{row.getValue("isActive") ? "Active" : "Inactive"}</div>
    ),
    filterFn: (row, columnId, filterOptions: string[]) => {
      // If no filters are selected, show all
      if (!filterOptions || filterOptions.length === 0) return true;

      const columnValue = row.getValue(columnId) ? "Active" : "Inactive";

      // Check if row's type is in the selected filter options
      return filterOptions.includes(columnValue);
    },
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
              Created At
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
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ColumnMeta;
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
              placeholder="Delete"
              onClick={(e: any) => {
                e.stopPropagation();
                meta?.onDeleteKnowledgeBase(row.original);
              }}
              childrenPosition="behind"
              className={"py-2"}
            >
              <Trash2 />
            </CustomDropdownItem>
            <CustomDropdownItem
              placeholder={row.getValue("isActive") ? "Deactivate" : "Activate"}
              onClick={(e: any) => {
                e.stopPropagation();
                meta?.setActiveStatus(row.original, !row.getValue("isActive"));
              }}
              childrenPosition="behind"
              className={"py-2"}
            >
              {row.getValue("isActive") ? <Ban /> : <CircleFadingArrowUp />}
            </CustomDropdownItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const badgeVariantMap: Record<string, any> = {
  Active: "success",
  Inactive: "gray",
  Failed: "error",
};

interface DashboardTableProps {
  viewKnowledgeBaseDetails: (data: KnowledgeBase) => void;
  onDeleteKnowledgeBase: (data: KnowledgeBase) => void;
  setActiveStatus: (kb: KnowledgeBase, status: boolean) => void;
}

export function KnowledgeBaseTable({
  viewKnowledgeBaseDetails,
  onDeleteKnowledgeBase,
  setActiveStatus,
}: DashboardTableProps) {
  const { getState } = useStore();
  const { knowledgeBases } = getState("KnowledgeBase");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ _id: false });
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 100,
  });

  const table = useReactTable({
    data: knowledgeBases || [],
    columns,
    meta: {
      onDeleteKnowledgeBase,
      setActiveStatus,
    },
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
      <div className="flex items-center px-4 gap-4">
        <div className="flex items-center gap-4 flex-1">
          <SearchInput
            placeholder="Search..."
            value={(table.getColumn("tag")?.getFilterValue() as string) ?? ""}
            onChange={(event: any) =>
              table.getColumn("tag")?.setFilterValue(event.target.value)
            }
            className="max-w-80"
          />
          <Button variant="outline" className="h-11">
            <Calendar />{" "}
            <div className="hidden sm:flex items-center">
              {" "}
              This month <ChevronDown />
            </div>
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
                          "createdAt",
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
                    onClick={() => viewKnowledgeBaseDetails(row.original)}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => {
                      if (cell.id.includes("isActive")) {
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

                      if (cell.id.includes("createdAt")) {
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
  table: TableType<KnowledgeBase>;
};

const headerMap: Record<string, string> = {
  tag: "Tag",
  isActive: "Status",
  createdAt: "Created At",
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
            {"Knowledge Base ID"}

            <img src={pinLogo} />
          </div>
        </CustomDropdownMenuCheckboxItem>
        {table
          .getAllColumns()
          .filter(
            (column) =>
              column.getCanHide() &&
              // !["clientName", "invoiceId"].includes(column.id)
              !["actions", "_id"].includes(column.id)
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
