import topUsersData from "@/data/top-users.json";
import { TopUser } from "@/interfaces";
import { SearchInput, Button } from "../form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  Table as TableType,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
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
import { useState } from "react";
import styled from "styled-components";
import { CustomDropdownMenuCheckboxItem, CustomDropdownItem } from "../popups";
import pinLogo from "@/assets/svgs/pin.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../badge";
import { Group, Pagination } from "@mantine/core";
import { Avatar } from "../avatar";
import { extractClientInitials } from "@/helpers";

const topUsers = topUsersData as TopUser[];

const columns: ColumnDef<TopUser>[] = [
  {
    accessorKey: "userId",
    header: "User id",
    cell: ({ row }) => <div>{row.getValue("userId")}</div>,
  },
  {
    accessorKey: "userDetails",
    header: "Info",
    cell: ({ row }) => <div>{row.getValue("userDetails")}</div>,
  },
  {
    accessorKey: "subscription",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Subscription
          <ChevronDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("subscription")}</div>,
  },
  {
    accessorKey: "appointments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Appointments
          <ListFilter />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("appointments")}</div>,
  },
  {
    accessorKey: "nextSubscriptionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Next Subscription
          <ListFilter />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastLoginAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Last Seen
          <ListFilter />
        </Button>
      );
    },
  },
];

const badgeVariantMap: Record<string, any> = {
  Active: "success",
  Soon: "warning",
  Expired: "error",
};

export const TopUsersTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: topUsers,
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
    <DashboardGrid className="bg-white rounded-xl overflow-hidden flex-1 grid w-full h-full grid-cols-1">
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
            className="max-w-80 h-11"
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

          <TableSettings table={table} />
        </div>
      </div>

      <div className="border-y bg-white p-4 overflow-auto h-full no-scrollbar w-full">
        <Table className="min-w-max">
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
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => {
                      if (cell.id.includes("appointments")) {
                        return (
                          <TableCell
                            key={cell.id}
                            className="font-sfpro text-gray-900 text-sm min-w-36"
                          >
                            {Number(cell.getValue()).toLocaleString("en-US")}
                          </TableCell>
                        );
                      }
                      if (cell.id.includes("subscription")) {
                        return (
                          <TableCell key={cell.id} className="min-w-36">
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

                      if (cell.id.includes("userDetails")) {
                        const data = cell.getValue() as TopUser["userDetails"];
                        return (
                          <TableCell
                            key={cell.id}
                            className="font-sfpro-medium text-gray-900 text-sm"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar
                                imageSrc={data.imageUrl}
                                fallbackText={extractClientInitials(data.name)}
                              />
                              <div>
                                <h4 className="font-urbanist font-semibold text-sm text-[#414651]">
                                  {data.name}
                                </h4>
                                <p className="font-sfpro text-sm text-[#535862]">
                                  {data.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell
                          key={cell.id}
                          className="font-sfpro text-gray-900 text-sm min-w-36"
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

      <div className="flex justify-center items-center">
        <div className=""></div>
        <div>
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
        <div></div>
      </div>
    </DashboardGrid>
  );
};

const DashboardGrid = styled.div`
  grid-template-rows: 60px 1fr 60px;
`;

type TableSettingProps = {
  table: TableType<TopUser>;
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
          key={"info"}
          checked={true}
          disabled
          className="capitalize mx-2 py-2 cursor-pointer font-sfpro"
        >
          <div className="flex justify-between items-center flex-1">
            {"User Info"}
            <img src={pinLogo} />
          </div>
        </CustomDropdownMenuCheckboxItem>
        {table
          .getAllColumns()
          .filter(
            (column) =>
              column.getCanHide() &&
              !["userId", "userDetails"].includes(column.id)
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
                      : column.id === "lastLoginAt"
                      ? "Last Seen"
                      : column.id === "nextSubscriptionDate"
                      ? "Subscription Exp"
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
