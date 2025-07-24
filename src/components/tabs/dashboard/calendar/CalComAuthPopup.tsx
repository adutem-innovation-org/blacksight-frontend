import { Button, FormGroup } from "@/components/form";
import { Loader } from "@/components/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarProvidersEnum } from "@/enums";
import { useProfile, useStore } from "@/hooks";
import { connectCalComSchema } from "@/schemas";
import {
  connectCalcom,
  getConnectedProviders,
  getProfile,
  resetConnectCalcom,
} from "@/store";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface CalComAuthPopupProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export const CalComAuthPopup = ({
  isOpen,
  onOpenChange,
}: CalComAuthPopupProps) => {
  const { dispatch, getState } = useStore();
  const {
    connectingCalcom,
    calcomConnected,
    connectCalcomErrors,
    connectCalcomErrorMessage,
  } = getState("Calendar");
  const initialValues: {
    eventTypeId: string;
    apiKey: string;
    provider: CalendarProvidersEnum;
  } = {
    eventTypeId: "",
    apiKey: "",
    provider: CalendarProvidersEnum.CALCOM,
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: connectCalComSchema, // Update to properly connect to meeting provider list
    onSubmit: (values) => {
      dispatch(connectCalcom(values));
    },
  });

  const handleOpenChange = (value: boolean) => {
    validation.resetForm();
    validation.setErrors({});
    onOpenChange(value);
  };

  useEffect(() => {
    if (calcomConnected) {
      toast.success("Cal.com connected successfully");
      dispatch(getProfile());
      dispatch(getConnectedProviders());
      dispatch(resetConnectCalcom());
      handleOpenChange(false);
    }
  }, [calcomConnected]);

  useEffect(() => {
    if (connectCalcomErrorMessage) {
      toast.error(connectCalcomErrorMessage);
      validation.setErrors(connectCalcomErrors);
      dispatch(resetConnectCalcom());
    }
  }, [connectCalcomErrorMessage]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-h-[85dvh] overflow-y-auto overflow-x-hidden"
      >
        {connectingCalcom && <Loader />}
        <DialogHeader>
          <DialogTitle>Connect Cal.com</DialogTitle>
          <DialogDescription>
            Connect your Cal.com account to your bot.
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
              groupLabel="Event Type ID"
              placeholder="Enter your Cal.com Event Type ID"
              size="md"
              name="eventTypeId"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />

            <FormGroup
              type="text"
              groupLabel="API Key"
              placeholder="Enter your Cal.com API Key"
              size="md"
              name="apiKey"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />

            <Button
              className="w-full cursor-pointer mt-10"
              type="submit"
              disabled={connectingCalcom}
            >
              Connect
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
