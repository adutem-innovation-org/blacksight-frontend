import {
  ClipBoardClock,
  DropdownComp,
  renderSorter,
  renderTableFilter,
} from "@/components";
import { AppointmentStatus } from "@/enums";
import { Appointment } from "@/interfaces";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Ban, BellRing, Trash2 } from "lucide-react";

const APPOINTMENT_STATUS_OPTIONS = [
  "pending",
  "scheduled",
  "cancelled",
  "completed",
];

type ColumnMetaData = {
  triggerUpdateStatus: (data: Appointment, status: AppointmentStatus) => void;
  triggerDeleteAppointment: (data: Appointment) => void;
  openInstantReminderForm: (data: Appointment) => void;
  openScheduleReminderForm: (data: Appointment) => void;
};

const getRowActions = (meta: ColumnMetaData, row: Row<Appointment>) => {
  let actions: { placeholder: string; onClick: () => void; Icon: any }[] = [];
  if (
    [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED].includes(
      row.original.status
    )
  ) {
    actions = actions.concat([
      {
        placeholder: "Cancel",
        onClick: () => {
          meta.triggerUpdateStatus(row.original, AppointmentStatus.CANCELLED);
        },
        Icon: Ban,
      },
      {
        placeholder: "Instant reminder",
        onClick: () => {
          meta.openInstantReminderForm(row.original);
        },
        Icon: BellRing,
      },
      {
        placeholder: "Schedule reminder",
        onClick: () => {
          meta.openScheduleReminderForm(row.original);
        },
        Icon: ClipBoardClock as any,
      },
    ]);
  }
  if (row.original.status === AppointmentStatus.CANCELLED) {
    actions.push({
      placeholder: "Delete",
      onClick: () => {
        meta.triggerDeleteAppointment(row.original);
      },
      Icon: Trash2,
    });
  }

  return actions;
};

export const appointmentsColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "_id",
    header: "Appointment ID",
    cell: ({ row }) => <div>{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "conversationId",
    header: "Conversation ID",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("conversationId")}</div>
    ),
  },
  {
    accessorKey: "customerName",
    header: renderSorter("Customer Name"),
    cell: ({ row }) => <div>{row.getValue("customerName")}</div>,
  },
  {
    accessorKey: "customerEmail",
    header: renderSorter("Customer Email"),
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("customerEmail")}</div>
    ),
  },
  {
    accessorKey: "customerPhone",
    header: renderSorter("Customer Phone"),
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("customerPhone")}</div>
    ),
  },
  {
    accessorKey: "status",
    enableHiding: true,
    header: renderTableFilter("Status", APPOINTMENT_STATUS_OPTIONS),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
    filterFn: (row, columnId, filterOptions: string[]) => {
      // If no filters are selected, show all
      if (!filterOptions || filterOptions.length === 0) return true;

      // Check if row's type is in the selected filter options
      return filterOptions.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "dateTimeInUTC",
    header: renderSorter("Appointment Date (UTC)"),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("dateTimeInUTC")).toLocaleString()}</div>
    ),
    sortingFn: "datetime",
  },
  {
    id: "dateTimeInCustomerTimezone",
    accessorKey: "dateTimeInCustomerTimezone",
    header: renderSorter("Appointment Date (Customer Timezone)"),
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue("dateTimeInUTC")).toLocaleString(undefined, {
          timeZone: row.getValue("timezone"),
        })}
      </div>
    ),
    sortingFn: "datetime",
  },
  {
    accessorKey: "timezone",
    header: renderSorter("Customer timezone"),
    cell: ({ row }) => <div>{row.getValue("timezone")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: renderSorter("Booked On"),
    enableHiding: true,
    sortingFn: "datetime",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ColumnMetaData;

      return <DropdownComp data={getRowActions(meta, row)} />;
    },
  },
];
