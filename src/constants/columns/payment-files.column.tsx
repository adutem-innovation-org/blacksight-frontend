import { IPaymentFile } from "@/interfaces";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownComp, writeTextToClipboard } from "@/components";
import toast from "react-hot-toast";
import { Copy, Download, FolderOpen, Trash } from "lucide-react";

const handleDownload = async (fileUrl: string, originalName: string) => {
  if (!fileUrl) return;

  // Toast promise
  try {
    const response = await fetch(fileUrl, {
      method: "GET",
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Wait for the complete file to download
    const blob = await response.blob();

    // Check if we actually got data
    if (blob.size === 0) {
      throw new Error("Downloaded file is empty");
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", originalName || "payment_data.xlsx");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Simpler cleanup
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    throw new Error(
      `Download failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    // toast.error(
    //   `Download failed: ${
    //     error instanceof Error ? error.message : "Unknown error"
    //   }`
    // );
  }
};

export const paymentFilesTableColumns: ColumnDef<IPaymentFile>[] = [
  {
    accessorKey: "tag",
    header: "Name",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <div>
          <i className={cn("flex text-xl text-gray-00 fi fi-rr-file-upload")} />
        </div>
        <div className="flex flex-col">
          <h4 className="font-medium text-gray-900 tracking-tight overflow-hidden text-ellipsis whitespace-nowrap max-w-[170px] min-[400px]:max-w-max">
            {row.getValue("tag")}
          </h4>
          <p className="text-sm text-gray-700 tracking-tight overflow-hidden text-ellipsis whitespace-nowrap max-w-[170px] min-[400px]:max-w-max">
            {row.original.metaData?.size ?? "-"}
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "totalRecords",
    accessorFn: (row) => row.metaData?.recordCount,
    header: "Total Records",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <p className="!text-sm tracking-tight">{row.getValue("totalRecords")}</p>
    ),
  },
  {
    id: "uploadedBy",
    accessorFn: (row) => row.uploadedBy?.email,
    header: "Uploaded By",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <p className="!text-sm tracking-tight">{row.getValue("uploadedBy")}</p>
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
        triggerDeletePaymentFile: (data: IPaymentFile) => void;
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
              placeholder: "Open file",
              onClick: () => {
                toast.success("Coming soon.🙌😃");
              },
              Icon: FolderOpen,
            },
            {
              placeholder: "Download file",
              onClick: () => {
                toast.promise(
                  handleDownload(
                    row.original.fileUrl,
                    row.original.metaData?.originalName
                  ),
                  {
                    loading: "Downloading...",
                    success: "Download successful.🎉",
                    error: "Download failed.🥹",
                  },
                  {
                    duration: 5000,
                  }
                );
              },
              Icon: Download,
            },
            {
              placeholder: "Delete source",
              onClick: () => {
                meta.triggerDeletePaymentFile(row.original);
              },
              Icon: Trash,
            },
          ]}
        />
      );
    },
  },
];
