import { Button, FormGroup } from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReminderChannels, ReminderTypes } from "@/enums";
import { useFormik } from "formik";
import * as yup from "yup";

interface CreateReminderProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export const CreateReminderForm = ({
  isOpen,
  onOpenChange,
}: CreateReminderProps) => {
  const initialValues = {
    tag: "",
    channel: "email",
    type: "payment",
    isBulk: false,
    remindAt: new Date(),
  };

  const reminderSchema = yup.object({
    tag: yup.string().required("Please provide tag"),
    channel: yup
      .string()
      .required("Please select reminder channel")
      .oneOf(
        Object.values(ReminderChannels),
        "An unsupported channel was selected"
      ),
    type: yup
      .string()
      .required("Please select reminder type")
      .oneOf(
        Object.values(ReminderTypes),
        "An unsupported category was selected"
      ),
    isBulk: yup.boolean().default(false),
    remindAt: yup
      .date()
      .required("Please provider reminder date")
      .test(
        "is-future-date",
        "Reminder can only be in the future",
        function (value) {
          if (!value) return false; // in case value is undefined
          return value > new Date();
        }
      ),
  });

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: reminderSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleChange, handleBlur, values } = validation;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
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
            <FormGroup
              type="text"
              groupLabel="Tag"
              placeholder="Describe this reminder"
              size="md"
              name="tag"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.tag}
              validation={validation}
            />
            <FormGroup
              type="select"
              groupLabel="Channel"
              placeholder="Select reminder channel"
              size="md"
              name="channel"
              label="Channel"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.channel}
              validation={validation}
              options={["email", "sms"]}
            />
            <FormGroup
              type="select"
              groupLabel="Type"
              placeholder="Select reminder type"
              size="md"
              name="type"
              label="Reminder type"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.type}
              validation={validation}
              options={["payment", "appointment"]}
            />

            <Button
              className="w-full cursor-pointer mt-10"
              variant={"default"}
              size={"md"}
            >
              Next
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
