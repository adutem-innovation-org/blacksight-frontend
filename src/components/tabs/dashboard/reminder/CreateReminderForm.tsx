import { Button, FormGroup } from "@/components/form";
import { Loader } from "@/components/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCreateReminderSectionFields } from "@/helpers";
import { ReminderChannels, ReminderTypes } from "@/enums";
import { useStore } from "@/hooks";
import { reminderSchema } from "@/schemas";
import {
  createReminder,
  getAllReminders,
  getReminderAnalytics,
  resetCreateReminder,
} from "@/store";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

type FormSectionProps = {
  validation: Pick<
    ReturnType<typeof useFormik>,
    | "handleChange"
    | "handleBlur"
    | "errors"
    | "touched"
    | "errors"
    | "values"
    | "setFieldValue"
    | "setFieldTouched"
  >;
};

const CreateReminderFormSectionOne = ({ validation }: FormSectionProps) => {
  return (
    <>
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
    </>
  );
};

export const BulkUploadFields = ({
  validation,
  onSelectFile,
  removeSelectedFile,
}: FormSectionProps & {
  onSelectFile: (e: any) => void;
  removeSelectedFile: (name: string) => void;
}) => {
  const { values } = validation;
  const isEmailType = values.channel === ReminderChannels.EMAIL;

  return (
    <>
      <FormGroup
        type="select"
        groupLabel="Source"
        placeholder="Select recipeints source"
        size="md"
        name="source"
        validation={validation}
        options={["multiple-input", "file"]}
        containerClassName="gap-2 mt-4"
      />
      {values.source === "multiple-input" && (
        <FormGroup
          type="multivalue-input"
          groupLabel={isEmailType ? "Emails" : "Phone numbers"}
          placeholder={`Enter recipients ${
            isEmailType ? "emails" : "phone numbers"
          }`}
          size="md"
          name={isEmailType ? "emails" : "phones"}
          validation={validation}
          containerClassName="gap-2 mt-4"
        />
      )}
      {values.source === "file" && (
        <FormGroup
          type="file-input"
          groupLabel={"Upload"}
          size="md"
          name={"file"}
          validation={validation}
          containerClassName="gap-2 mt-4"
          handleFileChange={onSelectFile}
          accept=".csv, .xlsx, .json, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/json"
          removeSelectedFile={removeSelectedFile}
        />
      )}
    </>
  );
};

const CreateReminderFormSectionTwo = ({
  validation,
  onSelectFile,
  removeSelectedFile,
}: FormSectionProps & {
  onSelectFile: (e: any) => void;
  removeSelectedFile: (name: string) => void;
}) => {
  const { values } = validation;
  const isEmailType = values.channel === ReminderChannels.EMAIL;

  return (
    <>
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
      />
    </>
  );
};

interface CreateReminderProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export const CreateReminderForm = ({
  isOpen,
  onOpenChange,
}: CreateReminderProps) => {
  const { dispatch, getState } = useStore();
  const {
    creatingReminder,
    reminderCreated,
    createReminderErrorMessage,
    createReminderErrors,
  } = getState("Reminder");
  const [step, setStep] = useState(1);
  const totalSteps = useRef(2).current;
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));

  const initialValues = {
    tag: "",
    channel: "email",
    type: "payment",
    isBulk: false,
    source: "multiple-input",
    remindAt: "",
    email: "",
    phone: "",
    emails: [],
    phones: [],
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
      dispatch(createReminder(formData));
    },
  });

  const runSectionValidator = async (currentSectionIndex: number) => {
    const sectionFields = getCreateReminderSectionFields(currentSectionIndex);
    if (!sectionFields) return true;

    let hasInvalidField = false;

    for (let field of sectionFields) {
      // Trigger it as touched
      const validationResult = await validation.setFieldTouched(field, true);
      if (validationResult && field in validationResult) {
        hasInvalidField = true;
      }
    }
    return hasInvalidField;
  };

  const goToPrevSection = () => prevStep();

  const goToNextSection = () => {
    runSectionValidator(step - 1).then((hasInvalidField: boolean) => {
      if (!hasInvalidField) {
        nextStep();
      }
    });
  };

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
    if (reminderCreated) {
      toast.success("Reminder created successfully");
      // Reset create reminder state
      dispatch(resetCreateReminder());
      // Reset form
      validation.resetForm();
      // Close the modal
      onOpenChange(false);
      // Dispatch fetch reminders
      dispatch(getAllReminders());
      // Dispatch fetch reminder analytics
      dispatch(getReminderAnalytics());
    }
  }, [reminderCreated]);

  useEffect(() => {
    if (createReminderErrorMessage) {
      toast.error(createReminderErrorMessage);
      if (createReminderErrors) {
        validation.setErrors(createReminderErrors);
      }
      const tmo = setTimeout(() => {
        dispatch(resetCreateReminder());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [createReminderErrorMessage]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {creatingReminder && <Loader />}
        <DialogHeader>
          <DialogTitle>Create Reminder</DialogTitle>
          <DialogDescription>
            Schedule a new email or sms based reminder for the future.
          </DialogDescription>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            {step === 1 && (
              <CreateReminderFormSectionOne validation={validation} />
            )}

            {step === 2 && (
              <CreateReminderFormSectionTwo
                validation={validation}
                onSelectFile={onSelectFile}
                removeSelectedFile={removeSelectedFile}
              />
            )}

            {step < totalSteps && (
              <Button
                className="w-full cursor-pointer mt-10"
                onClick={goToNextSection}
                variant={"default"}
                size={"md"}
                type="button"
              >
                Next
              </Button>
            )}
            {step === totalSteps && (
              <Button
                className="w-full cursor-pointer mt-10"
                type="submit"
                disabled={creatingReminder}
              >
                Schedule reminder
              </Button>
            )}
            {step > 1 && (
              <Button
                className="w-full cursor-pointer mt-2 bg-accent border-none hover:bg-gray-200 duration-500"
                type="button"
                onClick={goToPrevSection}
                variant={"secondary_gray"}
                disabled={creatingReminder}
              >
                Back
              </Button>
            )}
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
