import { paymentFilesTableColumns } from "@/constants";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { SearchSection } from "./SearchSection";
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
import { IPaymentFile } from "@/interfaces";
import { Loader } from "@/components/progress";

type PaymentFilesTableProps = {
  triggerDeletePaymentFile: (data: IPaymentFile) => void;
  openUploadForm: () => void;
  openFileBCPs: (data: IPaymentFile) => void;
};

export const PaymentFilesTable = ({
  triggerDeletePaymentFile,
  openUploadForm,
  openFileBCPs,
}: PaymentFilesTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { getState } = useStore();
  const { paymentFiles, fetchingBCPs } = getState("PaymentTracker");

  const table = useReactTable({
    data: paymentFiles || [],
    meta: { triggerDeletePaymentFile, openFileBCPs },
    columns: paymentFilesTableColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // Function to get responsive classes for each column
  const getColumnClasses = (columnId: string) => {
    switch (columnId) {
      case "tag":
        return ""; // Always visible
      case "uploadedBy":
        return "hidden lg:table-cell"; // Hidden on mobile/tablet, visible on lg+
      case "updatedAt":
        return "hidden md:table-cell"; // Hidden on mobile, visible from 692px+
      case "actions":
        return ""; // Always visible
      case "totalRecords":
        return "hidden sm:table-cell";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "grid grid-rows-auto sm:grid-rows-[80px_max-content] gap-4 relative"
      )}
    >
      {fetchingBCPs && <Loader className="bg-gray-100" />}
      <div>
        <SearchSection
          value={(table.getColumn("tag")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("tag")?.setFilterValue(event.target.value)
          }
          openUploadForm={openUploadForm}
        />
      </div>

      <div>
        <Table>
          {/* Table Header */}
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
                        "p-4 hover:bg-gray-200 text-base font-dmsans font-medium tracking-tight",
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

          {/* Table Body */}
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
