import { FormGroup } from "@/components/form";
import { FormDialog } from "@/components/popups";
import { AppointmentStatus } from "@/enums";
import { useStore } from "@/hooks";
import { updateAppointmentStatusSchema } from "@/schemas";
import { updateAppointmentStatus } from "@/store";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

type CancelAppointmentFormProps = {
  isOpen: boolean;
  newStatus: AppointmentStatus | null;
  onOpenChange: (val: boolean) => void;
  appointmentId: string | undefined;
};

export const CancelAppointmentForm = ({
  isOpen,
  newStatus,
  onOpenChange,
  appointmentId,
}: CancelAppointmentFormProps) => {
  const { getState, dispatch } = useStore();
  const { updatingAppointmentStatus, appointmentStatusUpdated } =
    getState("Appointment");

  const initialValues = {
    status: newStatus,
    reason: "",
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: updateAppointmentStatusSchema,
    onSubmit: (values) => {
      if (appointmentId && newStatus) {
        dispatch(
          updateAppointmentStatus({
            id: appointmentId,
            data: {
              status: newStatus,
              reason: values.reason,
            },
          })
        );
      }
    },
  });

  useEffect(() => {
    if (appointmentStatusUpdated) {
      onOpenChange(false);
    }
  }, [appointmentStatusUpdated]);

  return (
    <FormDialog
      ctaText="Cancel Appointment"
      description="Are you sure you want to cancel this appointment?"
      title="Cancel Appointment"
      isOpen={isOpen}
      loading={
        updatingAppointmentStatus && newStatus === AppointmentStatus.CANCELLED
      }
      onOpenChange={onOpenChange}
      loadingCtaText="Cancelling..."
      validation={validation}
    >
      <FormGroup
        type="textarea"
        name="reason"
        validation={validation}
        containerClassName="gap-2 mt-4"
        groupLabel="Reason"
        placeholder="Reason for cancellation"
        size="sm"
        inputClassName="resize-none"
      />
    </FormDialog>
  );
};
