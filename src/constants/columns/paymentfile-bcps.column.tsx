import { IBCP } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import {
  ClipBoardClock,
  DropdownComp,
  writeTextToClipboard,
} from "@/components";
import toast from "react-hot-toast";
import { BellRing, Copy, Pencil, Trash } from "lucide-react";

export const bcpsTableColumns: ColumnDef<IBCP>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <p className="!text-sm tracking-tight">{row.getValue("name")}</p>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <p className="!text-sm tracking-tight">{row.getValue("email")}</p>
    ),
  },
  {
    accessorKey: "paymentInterval",
    header: "Interval",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <p className="!text-sm tracking-tight">
        {row.getValue("paymentInterval")}
      </p>
    ),
  },
  {
    id: "lastPayment",
    accessorFn: (row) => row.lastPayment,
    header: "Last Payment",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <p className="!text-sm tracking-tight">
        {new Date(row.getValue("lastPayment")).toDateString()}
      </p>
    ),
  },
  {
    accessorKey: "nextPayment",
    header: "Next Payment",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <p className="!text-sm tracking-tight">
        {new Date(row.getValue("nextPayment")).toDateString()}
      </p>
    ),
  },
  {
    id: "uploadedBy",
    accessorFn: (row) => row.uploadedBy?.email,
    header: "Uploaded By",
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => (
      <p className="!text-sm tracking-tight">{row.getValue("uploadedBy")}</p>
    ),
  },
  {
    id: "updatedAt",
    enableHiding: true,
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
        triggerDeleteBCP: (data: IBCP) => void;
        openFileBCPs: (data: IBCP) => void;
      };
      return (
        <DropdownComp
          data={[
            {
              placeholder: "Copy file ID",
              onClick: () => {
                writeTextToClipboard(row.original._id).then(() => {
                  toast.success("Copied to clipboard");
                });
              },
              Icon: Copy,
            },
            {
              placeholder: "Instant reminder",
              onClick: () => {
                toast.success("Coming soon.🙌😃");
              },
              Icon: BellRing,
            },
            {
              placeholder: "Schedule reminder",
              onClick: () => {
                toast.success("Coming soon.🙌😃");
              },
              Icon: ClipBoardClock as any,
            },
            {
              placeholder: "Update record",
              onClick: () => {
                toast.success("Coming soon.🙌😃");
              },
              Icon: Pencil,
            },
            {
              placeholder: "Delete record",
              onClick: () => {
                meta.triggerDeleteBCP(row.original);
              },
              Icon: Trash,
            },
          ]}
        />
      );
    },
  },
];
