import {
  SortingDropDown,
  Button,
  TableFilterDropdown,
  DropdownComp,
} from "@/components";
import { Badge, BadgeProps } from "@/components/badge";
import {
  ProdReminderTypes,
  ReminderCategory,
  ReminderChannels,
  ReminderStatus,
} from "@/enums";
import { IReminder } from "@/interfaces";
import { cn } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import {
  Ban,
  CircleFadingArrowUp,
  ListFilter,
  Pencil,
  Trash,
} from "lucide-react";
import toast from "react-hot-toast";

const Paragraph = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p
      className={cn(
        "!text-sm tracking-tight overflow-hidden text-ellipsis whitespace-nowrap max-w-[170px] min-[400px]:max-w-max",
        className
      )}
      {...props}
    />
  );
};

const filterDropdownFn = (
  row: Row<IReminder>,
  columnId: string,
  filterOptions: string[]
) => {
  // If no filters are selected, show all
  if (!filterOptions || filterOptions.length === 0) return true;

  // Check if row's type is in the selected filter options
  return filterOptions.includes(row.getValue(columnId));
};

const REMINDER_STATUS_OPTIONS = Object.values(ReminderStatus).filter(
  (status) => status !== "-"
);

const getStatusBadgeVariant = (
  status: ReminderStatus
): BadgeProps["variant"] => {
  switch (status) {
    case ReminderStatus.SENT:
      return "success-subtle";
    case ReminderStatus.CANCELLED:
      return "info";
    case ReminderStatus.FAILED:
      return "danger";
    case ReminderStatus.COMPLETED:
      return "success";
    case ReminderStatus.PENDING:
      return "warning-subtle";
    case ReminderStatus.NILL:
      return "gray";
    default:
      return "gray";
  }
};

export const remindersHistoryColumns: ColumnDef<IReminder>[] = [
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
              className="hover:bg-transparent py-4 px-4 w-full h-full justify-start text-xs font-semibold text-[#717680] hover:text-[#535862]"
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
    cell: ({ row }) => <Paragraph>{row.getValue("tag") ?? "-"}</Paragraph>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <TableFilterDropdown
          OPTIONS={REMINDER_STATUS_OPTIONS}
          column={column}
          columnHeader="Status"
        />
      );
    },
    cell: ({ row }) => (
      <Badge variant={getStatusBadgeVariant(row.getValue("status"))}>
        <Paragraph>{row.getValue("status") ?? "-"}</Paragraph>
      </Badge>
    ),
    filterFn: filterDropdownFn,
  },
  {
    accessorKey: "channel",
    header: ({ column }) => {
      return (
        <TableFilterDropdown
          OPTIONS={Object.values(ReminderChannels)}
          column={column}
          columnHeader="Channel"
        />
      );
    },
    cell: ({ row }) => (
      <Paragraph className="capitalize">
        {row.getValue("channel") ?? "-"}
      </Paragraph>
    ),
    filterFn: filterDropdownFn,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <TableFilterDropdown
          OPTIONS={Object.values(ProdReminderTypes)}
          column={column}
          columnHeader="Type"
        />
      );
    },
    cell: ({ row }) => (
      <Paragraph className="capitalize">
        {row.getValue("type") ?? "-"}
      </Paragraph>
    ),
    filterFn: filterDropdownFn,
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <TableFilterDropdown
          OPTIONS={Object.values(ReminderCategory)}
          column={column}
          columnHeader="Category"
        />
      );
    },
    cell: ({ row }) => (
      <Paragraph className="capitalize">
        {row.getValue("category") ?? "-"}
      </Paragraph>
    ),
    filterFn: filterDropdownFn,
  },
  {
    id: "updatedAt",
    accessorFn: (row) =>
      new Date(row.updatedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
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
              className="hover:bg-transparent py-4 px-4 w-full h-full justify-start text-xs font-semibold text-[#717680] hover:text-[#535862]"
            >
              Updated At
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
      <Paragraph>{row.getValue("updatedAt") ?? "-"}</Paragraph>
    ),
    sortingFn: "datetime",
  },
  {
    id: "isActive",
    accessorFn: (row) => row.isActive,
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {};
      return (
        <DropdownComp
          data={[
            {
              placeholder: "Update reminder",
              onClick: () => {
                toast.success("Coming soon.🙌😃");
              },
              Icon: Pencil,
            },
            {
              placeholder: row.getValue("isActive") ? "Deactivate" : "Activate",
              onClick: () => {
                toast.success("Coming soon.🙌😃");
              },
              Icon: row.getValue("isActive") ? Ban : CircleFadingArrowUp,
            },
            {
              placeholder: "Delete record",
              onClick: () => {
                toast.success("Coming soon.🙌😃");
              },
              Icon: Trash,
            },
          ]}
        />
      );
    },
  },
];
