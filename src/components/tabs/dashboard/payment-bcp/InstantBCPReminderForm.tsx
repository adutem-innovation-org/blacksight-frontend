import { FormGroup } from "@/components/form";
import { FormDialog } from "@/components/popups";
import { Spinner } from "@/components/progress";
import { ReminderCategory, ReminderChannels, UserTypes } from "@/enums";
import { useProfile, useStore } from "@/hooks";
import { IBCP } from "@/interfaces";
import { instantFileReminderSchema } from "@/schemas";
import {
  getPaginatedTemplates,
  resetSendInstantReminder,
  sendInstantReminder,
} from "@/store";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

type InstantReminderFormProps = {
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
  fileId: string | null | undefined;
  fromSingleBCP?: boolean;
  bcpToRemind?: IBCP | null;
};

const getDefaultChannel = (bcp: IBCP | null | undefined) => {
  if (!bcp) return ReminderChannels.EMAIL;
  if (bcp?.email) return ReminderChannels.EMAIL;
  if (bcp?.phone) return ReminderChannels.SMS;
  return "";
};

const getAllowedChannels = (bcp: IBCP | null | undefined) => {
  if (!bcp || (!bcp?.email && !bcp?.phone) || (bcp?.email && bcp?.phone))
    return Object.values(ReminderChannels);
  if (bcp?.email) return [ReminderChannels.EMAIL];
  if (bcp?.phone) return [ReminderChannels.SMS];
  return [];
};

export const InstantBCPReminderForm = ({
  isOpen,
  onOpenChange,
  fileId,
  fromSingleBCP,
  bcpToRemind,
}: InstantReminderFormProps) => {
  const { dispatch, getState } = useStore();
  const { fetchingTemplates, templates } = getState("Template");
  const { user } = useProfile();
  const {
    sendingInstantReminder,
    instantReminderSent,
    sendInstantReminderErrors,
    sendInstantReminderErrorMsg,
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

  const initialValues = useMemo(
    () => ({
      tag: "",
      message: "",
      subject: "",
      channel: getDefaultChannel(bcpToRemind),
      category: ReminderCategory.PAYMENT,
      fileId: fileId!,
      isBulk: !fromSingleBCP,
      email: bcpToRemind?.email || undefined,
      phone: bcpToRemind?.phone || undefined,
      template: "",
      templateId: "",
      templateData: {},
    }),
    [fileId, fromSingleBCP, bcpToRemind]
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: instantFileReminderSchema,
    onSubmit: (values) => {
      // consol
      if (!values.fileId) {
        toast.error("Please reload the page and try again.");
        return;
      }

      // Bcp reminder
      if (fromSingleBCP && !bcpToRemind) {
        toast.error("Please reload the page and try again");
        return;
      }

      if (
        !values.channel ||
        !Object.values(ReminderChannels).includes(
          values.channel as ReminderChannels
        )
      ) {
        toast.error("Please select a channel.");
        return;
      }

      dispatch(sendInstantReminder({ data: values as any, notFile: true }));
    },
  });

  console.log(validation.values);

  const templateOptions = useMemo(() => {
    return templates && templates.length > 0
      ? templates
          .filter(
            (template) =>
              (template.type as unknown as ReminderChannels) ===
              validation.values.channel
          )
          .map((template) => ({
            label: template.name,
            value: template._id,
          }))
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
    if (!fileId) {
      onOpenChange(false);
    }
  }, [fileId]);

  useEffect(() => {
    if (!templates && !fetchingTemplates) {
      dispatch(getPaginatedTemplates(user?.userType ?? UserTypes.USER));
    }
  }, []);

  useEffect(() => {
    if (instantReminderSent) {
      toast.success("Instant reminder sent successfully.");
      dispatch(resetSendInstantReminder());
      validation.resetForm();
      onOpenChange(false);
    }
  }, [instantReminderSent]);

  useEffect(() => {
    if (sendInstantReminderErrorMsg) {
      toast.error(sendInstantReminderErrorMsg);
      if (Object.keys(sendInstantReminderErrors).length > 0) {
        validation.setErrors(sendInstantReminderErrors);
      }
      dispatch(resetSendInstantReminder());
    }
  }, [sendInstantReminderErrorMsg]);

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

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      validation.resetForm();
    }
    onOpenChange(val);
  };

  // For single BCP usage
  useEffect(() => {
    if (bcpToRemind) {
      if (!bcpToRemind.email && !bcpToRemind?.phone) {
        handleOpenChange(false);
      }
    }
  }, [bcpToRemind]);

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title="Create Instant Reminder"
      description="Send an instant reminder to customers in your payment file."
      loading={sendingInstantReminder}
      ctaText="Create"
      loadingCtaText="Creating..."
      validation={validation}
      ctaDisabled={!hasRequiredDynamicFields}
    >
      <FormGroup
        type="text"
        groupLabel="Tag"
        placeholder="e.g. Instant Reminder for Blacksight Team - 2025"
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
        options={getAllowedChannels(bcpToRemind)}
        validation={validation}
        containerClassName={"gap-2 mt-4"}
        info="Select a channel to send this reminder to."
      />

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
