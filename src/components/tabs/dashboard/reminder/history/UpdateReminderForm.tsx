import { FormGroup } from "@/components/form";
import { FormDialog } from "@/components/popups";
import {
  OffsetRange,
  ProdReminderTypes,
  ReminderCategory,
  ReminderChannels,
  UserTypes,
} from "@/enums";
import { useProfile, useStore } from "@/hooks";
import { IBCP, IReminder } from "@/interfaces";
import { updateReminderSchema } from "@/schemas";
import {
  getPaginatedTemplates,
  getReminderAnalytics,
  resetUpdateReminder,
  updateReminder,
} from "@/store";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  EventBasedReminderFormGroup,
  RecurringReminderFormGroups,
} from "../../payment-tracker";
import { TIME_ZONES } from "@/constants";
import { Spinner } from "@/components/progress";
import { PaymentTrackerApiService } from "@/apis";

const getAllowedChannels = (values: any) => {
  if (
    (Boolean(values.emails?.length) || values.email) &&
    (Boolean(values.phones?.length) || values.phone)
  )
    return Object.values(ReminderChannels);

  if ((values.emails && values.emails?.length) || values.email)
    return [ReminderChannels.EMAIL];
  if ((values.phones && values.phones?.length) || values.phone)
    return [ReminderChannels.SMS];

  return [];
};

const REMINDER_TYPES_OPTIONS = Object.values(ProdReminderTypes).slice(1);

const getNearestWholeRange = (offset?: number) => {
  if (!offset) return OffsetRange.MINUTE;

  if (offset % 10080 === 0) {
    return OffsetRange.WEEK;
  }

  if (offset % 1440 === 0) {
    return OffsetRange.DAY;
  }

  if (offset % 60 === 0) {
    return OffsetRange.HOUR;
  }

  return OffsetRange.MINUTE;
};

interface UpdateReminderFormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  reminderToUpdate: IReminder | null;
}

export const UpdateReminderForm = ({
  isOpen,
  onOpenChange,
  reminderToUpdate,
}: UpdateReminderFormProps) => {
  const { dispatch, getState } = useStore();
  const { fetchingTemplates, templates } = getState("Template");
  const { user } = useProfile();
  const [currentFileBCPs, setCurrentFileBCPs] = useState<IBCP[] | null>(null);
  const {
    updatingReminder,
    reminderUpdated,
    updateReminderErrorMessage,
    updateReminderErrors,
  } = getState("Reminder");

  // Auto-populated fields that don't require user input
  const autoPopulatedFields = [
    "business.contactTel",
    "business.contactEmail",
    "customerName",
    "customerEmail",
    "customerPhone",
    "lastPayment",
    "nextPayment",
    "paymentInterval",
  ];

  const initialValues = useMemo(() => {
    return {
      // General
      tag: reminderToUpdate?.tag,
      message: reminderToUpdate?.message,
      subject: reminderToUpdate?.subject,
      channel: reminderToUpdate?.channel,
      category: reminderToUpdate?.category, // Uneditable
      type: reminderToUpdate?.type,

      // Scheduled
      remindAt: reminderToUpdate?.remindAt,

      // Recurrence type
      recurrencePattern: reminderToUpdate?.recurrencePattern ?? "",
      recurrenceInterval: reminderToUpdate?.recurrenceInterval ?? "",
      startDate: reminderToUpdate?.startDate,
      endDate: reminderToUpdate?.endDate,
      maxExecutions: reminderToUpdate?.maxExecutions,
      customCronExpression: reminderToUpdate?.customCronExpression,

      // Event
      eventDate: reminderToUpdate?.eventDate,
      eventTrigger: reminderToUpdate?.eventTrigger,
      offsetRange: getNearestWholeRange(reminderToUpdate?.triggerOffset),
      triggerOffset: reminderToUpdate?.triggerOffset,

      // Others
      timezone: reminderToUpdate?.timezone,
      priority: reminderToUpdate?.priority,
      maxRetries: reminderToUpdate?.maxRetries,

      // Data source
      fileId: reminderToUpdate?.fileId, // Immutable
      isBulk: reminderToUpdate?.isBulk,
      email: reminderToUpdate?.email,
      phone: reminderToUpdate?.phone,
      emails: reminderToUpdate?.emails,
      phones: reminderToUpdate?.phones,

      // Template
      template: reminderToUpdate?.template,
      templateId: reminderToUpdate?.templateId,
      templateData: reminderToUpdate?.templateData,
    };
  }, [reminderToUpdate]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: updateReminderSchema,
    onSubmit: (values) => {
      if (!reminderToUpdate) return onOpenChange(false);

      const changedFields = getChangedFields();

      // Only proceed if there are actual changes
      if (Object.keys(changedFields).length === 0) {
        return onOpenChange(false);
      }

      // Send only the changed fields to the backend
      dispatch(
        updateReminder({
          id: reminderToUpdate._id,
          data: changedFields,
        })
      );
    },
  });

  // Helper function to check if a field has changed
  const hasFieldChanged = (fieldName: string) => {
    const originalValue = reminderToUpdate![
      fieldName as keyof typeof reminderToUpdate
    ] as any;
    const currentValue = validation.values[
      fieldName as keyof typeof validation.values
    ] as any;

    // Helper to normalize falsy values (treat all falsy as equivalent)
    const normalizeFalsy = (value: any) => {
      // For strings, empty string should be treated as falsy
      if (typeof value === "string" && value.trim() === "") return null;
      // For other falsy values, convert to null for consistent comparison
      return value || null;
    };

    // Special handling for dates
    if (
      fieldName === "remindAt" ||
      fieldName === "eventDate" ||
      fieldName === "startDate" ||
      fieldName === "endDate"
    ) {
      const normalizedOriginal = normalizeFalsy(originalValue);
      const normalizedCurrent = normalizeFalsy(currentValue);

      if (!normalizedOriginal && !normalizedCurrent) return false;
      if (!normalizedOriginal || !normalizedCurrent) return true;
      return (
        new Date(normalizedOriginal).toISOString() !==
        new Date(normalizedCurrent).toISOString()
      );
    }

    // Special handling for arrays (emails, phones)
    if (Array.isArray(originalValue) || Array.isArray(currentValue)) {
      // If one is array and other is not, they're different
      if (Array.isArray(originalValue) !== Array.isArray(currentValue))
        return true;

      // Normalize arrays - treat empty arrays as falsy
      const normalizedOriginal =
        originalValue && originalValue.length > 0 ? originalValue : null;
      const normalizedCurrent =
        currentValue && currentValue.length > 0 ? currentValue : null;

      // If both are empty/falsy, no change
      if (!normalizedOriginal && !normalizedCurrent) return false;
      if (!normalizedOriginal || !normalizedCurrent) return true;

      // Compare array lengths first
      if (normalizedOriginal.length !== normalizedCurrent.length) return true;

      // Compare each element
      return normalizedOriginal.some(
        (item: string, index: number) => item !== normalizedCurrent[index]
      );
    }

    // Special handling for objects (templateData)
    if (typeof originalValue === "object" || typeof currentValue === "object") {
      // Helper function to check if value is empty (null, undefined, or empty object)
      const isEmpty = (value: any) => {
        if (!value) return true; // null or undefined
        if (typeof value === "object" && !Array.isArray(value)) {
          return Object.keys(value).length === 0; // empty object
        }
        return false;
      };

      // If both are empty, no change
      if (isEmpty(originalValue) && isEmpty(currentValue)) return false;

      // If one is empty and other is not, there's a change
      if (isEmpty(originalValue) !== isEmpty(currentValue)) return true;

      // Handle array cases (already handled above, but for safety)
      if (Array.isArray(originalValue) || Array.isArray(currentValue)) {
        return (
          Array.isArray(originalValue) !== Array.isArray(currentValue) ||
          JSON.stringify(originalValue) !== JSON.stringify(currentValue)
        );
      }

      return JSON.stringify(originalValue) !== JSON.stringify(currentValue);
    }

    // For primitive values, normalize falsy values before comparison
    const normalizedOriginal = normalizeFalsy(originalValue);
    const normalizedCurrent = normalizeFalsy(currentValue);

    return normalizedOriginal !== normalizedCurrent;
  };

  // Checks if there is any disperity between the current values and the form values
  const canUpdateReminder = useMemo(() => {
    if (!reminderToUpdate) return false;

    // General fields (always checked)
    const generalFields = ["tag", "message", "subject", "channel", "type"];
    const hasGeneralFieldsChanged = generalFields.some(hasFieldChanged);

    // Type-specific fields
    let hasTypeSpecificFieldsChanged = false;

    const currentType = validation.values.type;

    if (currentType === ProdReminderTypes.SCHEDULED) {
      const scheduledFields = ["remindAt"];
      hasTypeSpecificFieldsChanged = scheduledFields.some(hasFieldChanged);
    } else if (currentType === ProdReminderTypes.RECURRING) {
      const recurringFields = [
        "recurrencePattern",
        "recurrenceInterval",
        "startDate",
        "endDate",
        "maxExecutions",
        "customCronExpression",
      ];
      hasTypeSpecificFieldsChanged = recurringFields.some(hasFieldChanged);
    } else if (currentType === ProdReminderTypes.EVENT_BASED) {
      const eventBasedFields = [
        "eventDate",
        "eventTrigger",
        "offsetRange",
        "triggerOffset",
      ];
      hasTypeSpecificFieldsChanged = eventBasedFields.some(hasFieldChanged);
    }

    // Other fields
    const otherFields = ["timezone", "priority", "maxRetries"];
    const hasOtherFieldsChanged = otherFields.some(hasFieldChanged);

    // Data source fields (excluding uneditable fileId)
    const dataSourceFields = ["isBulk", "email", "phone", "emails", "phones"];
    const hasDataSourceFieldsChanged = dataSourceFields.some(hasFieldChanged);

    // Template fields
    const templateFields = ["template", "templateId", "templateData"];
    const hasTemplateFieldsChanged = templateFields.some(hasFieldChanged);

    console.log("Has general fields changed", hasGeneralFieldsChanged);
    console.log(
      "Has type specific fields changed",
      hasTypeSpecificFieldsChanged
    );
    console.log("Has other fields changed", hasOtherFieldsChanged);
    console.log("Has data source fields changed", hasDataSourceFieldsChanged);
    console.log("Has template fields changed", hasTemplateFieldsChanged);

    // Return true if any category has changes
    return (
      hasGeneralFieldsChanged ||
      hasTypeSpecificFieldsChanged ||
      hasOtherFieldsChanged ||
      hasDataSourceFieldsChanged ||
      hasTemplateFieldsChanged
    );
  }, [validation.values, reminderToUpdate]);

  // Add this helper function inside your component (before the validation setup)
  const getChangedFields = () => {
    if (!reminderToUpdate) return {};

    const changedFields: Record<string, any> = {};

    // Check all possible fields
    const allFields = [
      // General fields
      "tag",
      "message",
      "subject",
      "channel",
      "type",

      // Scheduled fields
      "remindAt",

      // Recurring fields
      "recurrencePattern",
      "recurrenceInterval",
      "startDate",
      "endDate",
      "maxExecutions",
      "customCronExpression",

      // Event-based fields
      "eventDate",
      "eventTrigger",
      "offsetRange",
      "triggerOffset",

      // Other fields
      "timezone",
      "priority",
      "maxRetries",

      // Data source fields
      "isBulk",
      "email",
      "phone",
      "emails",
      "phones",

      // Template fields
      "template",
      "templateId",
      "templateData",
    ];

    // Only include fields that have actually changed
    allFields.forEach((field) => {
      if (hasFieldChanged(field)) {
        changedFields[field] =
          validation.values[field as keyof typeof validation.values];
      }
    });

    return changedFields;
  };

  useEffect(() => {
    if (
      !reminderToUpdate?.fileId &&
      reminderToUpdate?.category === ReminderCategory.PAYMENT
    ) {
      onOpenChange(false);
    }
  }, [reminderToUpdate]);

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

  const templateOptions = useMemo(() => {
    return templates && templates.length > 0
      ? templates.reduce((acc, template) => {
          if (
            (template.type as unknown as ReminderChannels) ===
            validation.values.channel
          ) {
            acc.push({
              label: template.name,
              value: template._id,
            });
          }
          return acc;
        }, [] as { label: string; value: string }[])
      : [];
  }, [templates, validation.values.channel]);

  // Filter out auto-populated fields to get user-required fields
  const userRequiredFields = useMemo(() => {
    if (!validation.values.templateId) return [];

    const template = templates?.find(
      (t) => t._id === validation.values.templateId
    );

    if (!template?.dynamicFields) return [];

    return template.dynamicFields.filter(
      (field) => !autoPopulatedFields.includes(field)
    );
  }, [validation.values.templateId]);

  // Generate form fields for user-required dynamic fields
  const renderDynamicFields = () => {
    if (userRequiredFields.length === 0) return null;

    return (
      <div className="mt-4 space-y-4">
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Template Fields
          </h4>
          <p className="text-xs text-muted-foreground mb-4">
            Please provide values for the following template fields:
          </p>
        </div>

        {userRequiredFields.map((field) => {
          const fieldParts = field.split(".");
          const fieldName = `templateData.${field}`;
          const label =
            fieldParts.length > 1
              ? `${fieldParts[0]} - ${fieldParts[1]}`
              : field;

          // Convert field names to more user-friendly labels
          const friendlyLabel = label
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .replace(/\./g, " - ");

          return (
            <FormGroup
              key={field}
              type="text"
              name={fieldName}
              groupLabel={friendlyLabel}
              placeholder={`Enter ${friendlyLabel.toLowerCase()}`}
              size="md"
              validation={validation}
              containerClassName="gap-2"
              info={`This field will be used in your template: {{${field}}}`}
            />
          );
        })}
      </div>
    );
  };

  // Update templateData when template changes
  useEffect(() => {
    if (validation.values.templateId && userRequiredFields.length > 0) {
      const newTemplateData = userRequiredFields.reduce((acc, field) => {
        const fieldParts = field.split(".");
        type TemplateDataKey = keyof typeof validation.values.templateData;
        if (fieldParts.length === 2) {
          const [parent, child] = fieldParts;
          if (!acc[parent]) acc[parent] = {};
          acc[parent][child] =
            validation.values.templateData?.[parent as TemplateDataKey]?.[
              child
            ] || "";
        } else {
          acc[field] =
            validation.values.templateData?.[field as TemplateDataKey] || "";
        }
        return acc;
      }, {} as Record<string, any>);

      validation.setFieldValue("templateData", newTemplateData);
    } else if (!validation.values.templateId) {
      validation.setFieldValue("templateData", {});
    }
  }, [validation.values.templateId]);

  useEffect(() => {
    if (!templates && !fetchingTemplates) {
      dispatch(getPaginatedTemplates(user?.userType ?? UserTypes.USER));
    }
  }, []);

  // Check if form is ready for submission
  const hasRequiredDynamicFields =
    userRequiredFields.length === 0 ||
    userRequiredFields.every((field) => {
      type TemplateDataKey = keyof typeof validation.values.templateData;
      const fieldParts = field.split(".");
      if (fieldParts.length === 2) {
        const [parent, child] = fieldParts;
        return validation.values.templateData?.[parent as TemplateDataKey]?.[
          child
        ];
      }
      return validation.values.templateData?.[field as TemplateDataKey];
    });

  useEffect(() => {
    const fetchBcps = async (fileId: string) => {
      try {
        const paymentTrackerApiService = PaymentTrackerApiService.getInstance();
        const resp = await paymentTrackerApiService.getPaymentFileBCPs(fileId);
        setCurrentFileBCPs(resp.data);
      } catch (error) {
        console.log("Unable to fetch bcps", error);
      }
    };

    if (reminderToUpdate && !currentFileBCPs && reminderToUpdate?.fileId) {
      fetchBcps(reminderToUpdate.fileId);
    }
  }, [reminderToUpdate]);

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Update Reminder"
      description="Update the details of this reminder."
      loading={updatingReminder}
      ctaText="Update"
      loadingCtaText="Updating..."
      validation={validation}
      ctaDisabled={!canUpdateReminder}
    >
      <FormGroup
        type="text"
        groupLabel="Tag"
        placeholder="e.g. Scheduled Reminder for Blacksight Team - 2025"
        size="md"
        name="tag"
        validation={validation}
        containerClassName={"gap-2 mt-4"}
        info="Tags are use to quick identify or search for reminder in the future."
      />

      <FormGroup
        type="text"
        name="subject"
        groupLabel="Subject"
        placeholder="Enter your subject here"
        size="md"
        validation={validation}
        containerClassName={"gap-2 mt-4"}
        info="We use subject as fallbacks when we can't find a template or file."
      />

      <FormGroup
        type="textarea"
        name="message"
        groupLabel="Message"
        placeholder="Enter your message here"
        size="sm"
        validation={validation}
        info="We use message as fallbacks when we can't find a template or file."
      />

      <FormGroup
        type="select"
        name="channel"
        groupLabel="Channel"
        placeholder="Select a channel"
        size="md"
        options={getAllowedChannels(validation.values)}
        validation={validation}
        containerClassName={"gap-2 mt-4"}
        info="Select a channel to send this reminder to."
      />

      <FormGroup
        type="select"
        name="type"
        groupLabel="Type"
        placeholder="Select reminder type"
        size="md"
        options={REMINDER_TYPES_OPTIONS}
        validation={validation}
        containerClassName="gap-2 mt-4"
        info="Reminder could be a one-time or a recurring reminder."
      />

      {validation.values.type === ProdReminderTypes.SCHEDULED && (
        <FormGroup
          type="date-time"
          name="remindAt"
          groupLabel="Remind At"
          placeholder="Pick a date and time"
          size="md"
          validation={validation}
          containerClassName={"gap-2 mt-4"}
          info="Select a date and time to send this reminder."
        />
      )}

      {validation.values.type === ProdReminderTypes.RECURRING && (
        <RecurringReminderFormGroups validation={validation} />
      )}

      {validation.values.type === ProdReminderTypes.EVENT_BASED && (
        <EventBasedReminderFormGroup validation={validation} />
      )}

      <FormGroup
        type="select"
        name="timezone"
        groupLabel="Timezone"
        placeholder="Select timezone"
        size="md"
        validation={validation}
        options={TIME_ZONES}
        defaultValue="UTC+1"
        containerClassName="gap-2 mt-4"
      />

      <FormGroup
        type="switch"
        groupLabel="Bulk recipients?"
        placeholder="Multipe Customers?"
        size="md"
        name="isBulk"
        validation={validation}
        containerClassName="gap-2 mt-4"
      />

      {!validation.values.isBulk && (
        <NonBulkReminderFormGroups
          validation={validation}
          currentFileBCPs={currentFileBCPs}
        />
      )}

      {validation.values.isBulk && (
        <BulkReminderFormGroups
          validation={validation}
          currentFileBCPs={currentFileBCPs}
        />
      )}

      {validation.values.channel !== ReminderChannels.BOTH && (
        <FormGroup
          type="select"
          name="templateId"
          groupLabel="Template"
          placeholder="Select a template"
          size="md"
          options={templateOptions}
          validation={validation}
          containerClassName={"gap-2 mt-4"}
          info="Select a template to use for this reminder."
          noOptionsContent={<NoTemplate loading={fetchingTemplates} />}
        />
      )}

      {renderDynamicFields()}

      {userRequiredFields.length > 0 && !hasRequiredDynamicFields && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            Please fill in all template fields before creating the reminder.
          </p>
        </div>
      )}
    </FormDialog>
  );
};

const BulkReminderFormGroups = ({
  validation,
  currentFileBCPs,
}: {
  validation: any;
  currentFileBCPs: IBCP[] | null;
}) => {
  const { allowedEmails, allowedPhones } = (currentFileBCPs ?? []).reduce(
    (acc, cur) => {
      if (cur?.email) {
        acc.allowedEmails.push({ label: cur.email, value: cur.email });
      }
      if (cur?.phone) {
        acc.allowedPhones.push({ label: cur.phone, value: cur.phone });
      }
      return acc;
    },
    { allowedEmails: [], allowedPhones: [] } as {
      allowedEmails: { label: string; value: string }[];
      allowedPhones: { label: string; value: string }[];
    }
  );

  return (
    <>
      {(validation.values.channel === ReminderChannels.EMAIL ||
        validation.values.channel === ReminderChannels.BOTH) && (
        <FormGroup
          type="multi-select"
          name="emails"
          groupLabel="Customer Emails"
          placeholder="Select one or more customer emails"
          size="md"
          multiSelectInputData={allowedEmails}
          validation={validation}
          containerClassName={"gap-2 mt-4"}
          info="Select customers to send this reminder to."
        />
      )}

      {(validation.values.channel === ReminderChannels.SMS ||
        validation.values.channel === ReminderChannels.BOTH) && (
        <FormGroup
          type="multi-select"
          name="phones"
          groupLabel="Customer Phones"
          placeholder="Select one or more customer phones"
          size="md"
          multiSelectInputData={allowedPhones}
          validation={validation}
          containerClassName={"gap-2 mt-4"}
          info="Select customers to send this reminder to."
        />
      )}
    </>
  );
};

const NonBulkReminderFormGroups = ({
  validation,
  currentFileBCPs,
}: {
  validation: any;
  currentFileBCPs: IBCP[] | null;
}) => {
  const { allowedEmails, allowedPhones } = (currentFileBCPs ?? []).reduce(
    (acc, cur) => {
      if (cur?.email) {
        acc.allowedEmails.push(cur.email);
      }
      if (cur?.phone) {
        acc.allowedPhones.push(cur.phone);
      }
      return acc;
    },
    { allowedEmails: [], allowedPhones: [] } as {
      allowedEmails: string[];
      allowedPhones: string[];
    }
  );

  return (
    <>
      {(validation.values.channel === ReminderChannels.EMAIL ||
        validation.values.channel === ReminderChannels.BOTH) && (
        <FormGroup
          type="select"
          name="email"
          groupLabel="Customer Email"
          placeholder="Select an email"
          size="md"
          options={allowedEmails}
          validation={validation}
          containerClassName={"gap-2 mt-4"}
          info="Select a customer to send this reminder to."
        />
      )}

      {(validation.values.channel === ReminderChannels.SMS ||
        validation.values.channel === ReminderChannels.BOTH) && (
        <FormGroup
          type="select"
          name="phone"
          groupLabel="Customer Phone"
          placeholder="Select a phone number"
          size="md"
          options={allowedPhones}
          validation={validation}
          containerClassName={"gap-2 mt-4"}
          info="Select a customer to send this reminder to."
        />
      )}
    </>
  );
};

const NoTemplate = ({ loading }: { loading: boolean }) => {
  return (
    <p className="text-sm text-muted-foreground p-4 flex items-center">
      {loading && <Spinner />}
      {loading && "Loading..."}
      {!loading &&
        "You do not have any template created. Please create a template first."}
    </p>
  );
};
