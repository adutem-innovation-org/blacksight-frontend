import { Button, FormGroup } from "@/components/form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Reminder } from "@/interfaces";
import { reminderSchema } from "@/schemas";
import { useFormik } from "formik";
import { X } from "lucide-react";
import styled from "styled-components";
import { useStore } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  getReminderAnalytics,
  resetUpdateReminder,
  updateReminder,
} from "@/store";
import { Loader } from "@/components/progress";
import toast from "react-hot-toast";
import { ReminderChannels, ReminderTypes } from "@/enums";
import { BulkUploadFields } from "./CreateReminderForm";
import dayjs from "dayjs";

interface SheetHeaderCompProps {
  reminder: Reminder;
  onOpenChange: (value: boolean) => void;
}

const SheetHeaderComp = ({ reminder, onOpenChange }: SheetHeaderCompProps) => {
  return (
    <CustomSheetHeader className="flex p-8 justify-between items-center flex-row border-b border-b-gray-100">
      <div>
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          {reminder.tag}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Reminder tag</p>
      </div>
      <div className="custom">
        <p className="font-urbanist font-semibold text-gray-900 text-2xl capitalize">
          {reminder.isActive ? "Active" : "Inactive"}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Status</p>
      </div>
      <div className="custom">
        <Button
          variant={"secondary_gray"}
          size={"icon"}
          className="border-none rounded-full bg-gray-100 cursor-pointer"
          onClick={() => onOpenChange(false)}
        >
          <X />
        </Button>
      </div>
    </CustomSheetHeader>
  );
};

interface BotConfigDrawerProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  reminder: Reminder;
}

export function UpdateReminderDrawer({
  isOpen,
  onOpenChange,
  reminder,
}: BotConfigDrawerProps) {
  const { dispatch, getState } = useStore();
  const {
    updatingReminder,
    reminderUpdated,
    updateReminderErrorMessage,
    updateReminderErrors,
  } = getState("Reminder");
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const initialValues: {
    tag: string;
    channel: ReminderChannels;
    type: ReminderTypes;
    isBulk?: boolean;
    source: "multiple-input" | "file";
    remindAt: any;
    email: string;
    phone: string;
    emails: string[];
    phones: string[];
    file: string;
  } = {
    tag: reminder.tag,
    channel: reminder.channel,
    type: reminder.type,
    isBulk: reminder.isBulk,
    source: "multiple-input",
    remindAt: dayjs(reminder.remindAt),
    email: reminder.email ?? "",
    phone: reminder.phone ?? "",
    emails: reminder.emails ?? [],
    phones: reminder.phones ?? [],
    file: "",
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: reminderSchema,
    onSubmit: (values) => {
      const {
        tag,
        channel,
        email,
        emails,
        isBulk,
        phone,
        phones,
        remindAt,
        source,
        type,
      } = values;
      const formData = new FormData();
      formData.append("tag", tag);
      formData.append("channel", channel);
      formData.append("type", type);
      formData.append("remindAt", remindAt);
      formData.append("isBulk", isBulk as any);
      if (isBulk) {
        if (source === "multiple-input") {
          if (channel === ReminderChannels.EMAIL && emails) {
            emails.forEach((email, index) =>
              formData.append(`emails[${index}]`, email)
            );
          } else {
            phones.forEach((phone, index) =>
              formData.append(`phones[${index}]`, phone)
            );
          }
        } else {
          formData.append("file", currentFile as Blob);
        }
      } else {
        if (channel === ReminderChannels.EMAIL && email) {
          formData.append(`email`, email);
        } else {
          formData.append(`phone`, phone);
        }
      }
      dispatch(updateReminder({ id: reminder._id, data: formData }));
    },
  });

  // Checks if there is any disperity between the current values and the form values
  const canUpdateReminder = useMemo(() => {
    const currentKeys = Object.keys(validation.values);

    for (const key of currentKeys) {
      const reminderValue = reminder[key as keyof typeof reminder];
      const validationValue =
        validation.values[key as keyof typeof validation.values];
      if (reminderValue !== validationValue && key !== "source") {
        if (
          key === "remindAt" &&
          new Date(reminder.remindAt).toUTCString() ===
            new Date(validation.values.remindAt).toUTCString()
        )
          return false;
        return true; // Exit early on the first mismatch
      }
    }

    return false; // No mismatches found
  }, [validation.values]);

  const onSelectFile = (e: any) => {
    let file = e.target.files[0];
    if (file) {
      setCurrentFile(file);
      validation.setFieldValue(e.target.name, file.name);
    }
  };

  const removeSelectedFile = (name: string) => {
    setCurrentFile(null);
    validation.setFieldValue(name, "");
  };

  useEffect(() => {
    if (reminderUpdated) {
      toast.success("Reminder updated");
      // Reset update config state
      dispatch(getReminderAnalytics());
      dispatch(resetUpdateReminder());
      // Close drawer
      onOpenChange(false);
    }
  }, [reminderUpdated]);

  useEffect(() => {
    if (updateReminderErrorMessage) {
      toast.error(updateReminderErrorMessage);
      if (Object.keys(updateReminderErrors ?? {}).length) {
        validation.setErrors(updateReminderErrors);
      }
      dispatch(resetUpdateReminder());
    }
  }, [updateReminderErrorMessage]);

  const { values } = validation;
  const isEmailType = values.channel === ReminderChannels.EMAIL;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={true}>
      <CustomSheetContent className="rounded-2xl p-0">
        {updatingReminder && <Loader />}
        <SheetHeaderComp reminder={reminder} onOpenChange={onOpenChange} />
        <div className="px-8 flex-1 overflow-auto pb-8 no-scrollbar mb-8">
          <h2 className="font-urbanist font-semibold text-gray-900 text-3xl">
            Update reminder
          </h2>
          {/* config form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <FormGroup
              type="text"
              groupLabel="Tag"
              placeholder="Describe this reminder"
              size="md"
              name="tag"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />

            <FormGroup
              type="select"
              groupLabel="Channel"
              placeholder="Select reminder channel"
              size="md"
              name="channel"
              label="Channel"
              validation={validation}
              options={["email", "sms"]}
              defaultValue="email"
              containerClassName="gap-2 mt-4"
            />

            <FormGroup
              type="select"
              groupLabel="Type"
              placeholder="Select reminder type"
              size="md"
              name="type"
              label="Reminder type"
              validation={validation}
              options={["payment", "appointment"]}
              defaultValue="payment"
              containerClassName="gap-2 mt-4"
            />

            <FormGroup
              type="switch"
              groupLabel="Bulk recipients?"
              placeholder="Multipe users"
              size="md"
              name="isBulk"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />

            {!values.isBulk && (
              <FormGroup
                name={isEmailType ? "email" : "phone"}
                type="text"
                validation={validation}
                groupLabel={isEmailType ? "Email" : "Phone number"}
                placeholder={`Enter recipient ${
                  isEmailType ? "email" : "phone number"
                }`}
                size="md"
                containerClassName="gap-2 mt-4"
              />
            )}

            {values.isBulk && (
              <BulkUploadFields
                validation={validation}
                onSelectFile={onSelectFile}
                removeSelectedFile={removeSelectedFile}
              />
            )}

            <FormGroup
              name="remindAt"
              type="date-time"
              validation={validation}
              groupLabel="Reminder time"
              placeholder="What time should reminder be sent?"
              size="md"
              containerClassName="gap-2 mt-4"
              minDate={dayjs(new Date()) as any}
            />

            <Button
              className="w-full cursor-pointer mt-10"
              type="submit"
              disabled={updatingReminder || !canUpdateReminder}
            >
              Update reminder
            </Button>
          </form>
        </div>
      </CustomSheetContent>
    </Sheet>
  );
}

const CustomSheetContent = styled(SheetContent)`
  height: 95%;
  align-self: center;
  margin-right: 1.5rem;
  min-width: 660px;
  box-shadow: 0px 4px 16px #0000001f;

  & > button:not(.custom) {
    display: none;
  }
`;

const CustomSheetHeader = styled(SheetHeader)`
  & > div {
    margin: 0px !important;
  }
`;

const CustomRow = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;
