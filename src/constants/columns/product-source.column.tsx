import { KnowledgeBaseSources } from "@/enums";
import { IProductsSource } from "@/interfaces";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownComp, writeTextToClipboard } from "@/components";
import toast from "react-hot-toast";
import { Copy, Trash } from "lucide-react";

const sourceIcon: { [key: string]: string } = {
  [KnowledgeBaseSources.API]: "fi fi-rr-plug-connection",
  [KnowledgeBaseSources.FILE]: "fi fi-rr-file-upload",
  [KnowledgeBaseSources.TEXT_INPUT]: "fi fi-rr-text",
};

const getDescription = (data: IProductsSource) => {
  switch (data.source) {
    case KnowledgeBaseSources.FILE:
      return data.metaData?.size;
    case KnowledgeBaseSources.TEXT_INPUT:
      return data.metaData?.size;
    case KnowledgeBaseSources.API:
      return data.metaData?.url;
  }
};

export const productSourceTableColumns: ColumnDef<IProductsSource>[] = [
  {
    accessorKey: "tag",
    header: "Name",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <div>
          <i
            className={cn(
              sourceIcon[
                (row.original.source ?? KnowledgeBaseSources.FILE) as string
              ],
              "flex text-xl text-gray-00"
            )}
          />
        </div>
        <div className="flex flex-col">
          <h4 className="font-medium text-gray-900 tracking-tight overflow-hidden text-ellipsis whitespace-nowrap max-w-[170px] min-[400px]:max-w-max">
            {row.getValue("tag")}
          </h4>
          <p className="text-sm text-gray-700 tracking-tight overflow-hidden text-ellipsis whitespace-nowrap max-w-[170px] min-[400px]:max-w-max">
            {getDescription(row.original) ?? "-"}
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "createdBy",
    accessorFn: (row) => row.createdBy.email,
    header: "Created By",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <p className="!text-sm tracking-tight">{row.getValue("createdBy")}</p>
    ),
  },
  {
    id: "updatedAt",
    enableHiding: false,
    accessorFn: (row) =>
      new Date(row.updatedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    header: "Last updated",
    enableSorting: false,
    cell: ({ row }) => (
      <p className="!text-sm tracking-tight">{row.getValue("updatedAt")}</p>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        triggerDeleteProductsSource: (data: IProductsSource) => void;
      };

      return (
        <DropdownComp
          data={[
            {
              placeholder: "Copy source ID",
              onClick: () => {
                writeTextToClipboard(row.original._id).then(() => {
                  toast.success("Copied to clipboard");
                });
              },
              Icon: Copy,
            },
            {
              placeholder: "Delete source",
              onClick: () => {
                meta.triggerDeleteProductsSource(row.original);
              },
              Icon: Trash,
            },
          ]}
        />
      );
    },
  },
];
