import {
  SortingDropDown,
  Button,
  TableFilterDropdown,
  DropdownComp,
  renderSorter,
  renderTableFilter,
} from "@/components";
import { Badge, BadgeProps } from "@/components/badge";
import {
  ProdReminderTypes,
  ReminderCategory,
  ReminderChannels,
  TicketPriority,
  TicketStatus,
} from "@/enums";
import { Ticket } from "@/interfaces";
import { cn } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import { on } from "events";
import {
  Ban,
  BellOff,
  BellRing,
  CircleFadingArrowUp,
  Icon,
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
  row: Row<Ticket>,
  columnId: string,
  filterOptions: string[]
) => {
  // If no filters are selected, show all
  if (!filterOptions || filterOptions.length === 0) return true;
  // Check if row's type is in the selected filter options
  return filterOptions.includes(row.getValue(columnId));
};

const getStatusBadgeVariant = (status: TicketStatus): BadgeProps["variant"] => {
  switch (status) {
    case TicketStatus.CLOSED:
      return "info";
    case TicketStatus.RESOLVED:
      return "success";
    case TicketStatus.IN_PROGRESS:
      return "warning-subtle";
    case TicketStatus.OPEN:
      return "success-subtle";
    default:
      return "gray";
  }
};

const getPriorityBadgeVariant = (
  priority: TicketPriority
): BadgeProps["variant"] => {
  switch (priority) {
    case TicketPriority.LOW:
      return "success-subtle";
    case TicketPriority.MEDIUM:
      return "warning-subtle";
    case TicketPriority.HIGH:
      return "danger";
    default:
      return "gray";
  }
};

const getAgentStatusBadgeVariant = (status: string): BadgeProps["variant"] => {
  switch (status.toLowerCase()) {
    case "active":
      return "success";
    case "inactive":
      return "warning-subtle";
    case "deleted":
      return "danger";
    default:
      return "gray";
  }
};

const AGENT_STATUS_OPTIONS = ["active", "inactive", "deleted"];
const TICKET_STATUS_OPTIONS = Object.values(TicketStatus);

export const ticketsColumns: ColumnDef<Ticket>[] = [
  {
    id: "agentName",
    accessorFn: (row) => row.bot?.name ?? "Deleted agent",
    header: renderSorter("Agent"),
    cell: ({ row }) => (
      <Paragraph>{row.getValue("agentName") ?? "-"}</Paragraph>
    ),
  },
  {
    accessorKey: "agentStatus",
    accessorFn: (row) => row.bot?.status ?? "deleted",
    header: renderTableFilter("Agent Status", AGENT_STATUS_OPTIONS),
    cell: ({ row }) => (
      <Badge variant={getAgentStatusBadgeVariant(row.getValue("agentStatus"))}>
        <Paragraph>{row.getValue("agentStatus") ?? "-"}</Paragraph>
      </Badge>
    ),
    filterFn: filterDropdownFn,
  },
  {
    id: "customerEmail",
    accessorKey: "customerEmail",
    header: renderSorter("Email"),
    cell: ({ row }) => (
      <Paragraph>{row.getValue("customerEmail") ?? "-"}</Paragraph>
    ),
  },
  {
    id: "customerName",
    accessorKey: "customerName",
    header: renderSorter("Name"),
    cell: ({ row }) => (
      <Paragraph className="capitalize">
        {row.getValue("customerName") ?? "-"}
      </Paragraph>
    ),
  },
  {
    accessorKey: "status",
    header: renderTableFilter("Status", TICKET_STATUS_OPTIONS),
    cell: ({ row }) => (
      <Badge variant={getStatusBadgeVariant(row.getValue("status"))}>
        <Paragraph>{row.getValue("status") ?? "-"}</Paragraph>
      </Badge>
    ),
    filterFn: filterDropdownFn,
  },
  {
    accessorKey: "priority",
    header: renderTableFilter("Priority", Object.values(TicketPriority)),
    cell: ({ row }) => (
      <Badge variant={getPriorityBadgeVariant(row.getValue("priority"))}>
        <Paragraph className="capitalize">
          {row.getValue("priority") ?? "-"}
        </Paragraph>
      </Badge>
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
    header: renderSorter("Last updated"),
    cell: ({ row }) => (
      <Paragraph>{row.getValue("updatedAt") ?? "-"}</Paragraph>
    ),
    sortingFn: "datetime",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        triggerUpdateStatus: (ticket: Ticket, status: TicketStatus) => void;
        triggerDeleteTicket: (ticket: Ticket) => void;
      };
      return (
        <DropdownComp
          data={[
            ...(![TicketStatus.CLOSED, TicketStatus.RESOLVED].includes(
              row.original.status
            )
              ? [
                  {
                    placeholder: "Mark as resolved",
                    onClick: () => {
                      meta.triggerUpdateStatus(
                        row.original,
                        TicketStatus.RESOLVED
                      );
                    },
                    Icon: Pencil,
                  },
                ]
              : []),
            ...(![TicketStatus.CLOSED].includes(row.original.status)
              ? [
                  {
                    placeholder: "Close ticket",
                    onClick: () => {
                      meta.triggerUpdateStatus(
                        row.original,
                        TicketStatus.CLOSED
                      );
                    },
                    Icon: Ban,
                  },
                ]
              : []),
            {
              placeholder: "Delete ticket",
              onClick: () => {
                meta.triggerDeleteTicket(row.original);
              },
              Icon: Trash,
            },
          ]}
        />
      );
    },
  },
];
