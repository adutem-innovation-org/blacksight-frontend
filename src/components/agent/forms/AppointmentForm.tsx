import { Drawer } from "vaul";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button, FormGroup } from "@/components/form";
import { useFormik } from "formik";
import { TIME_ZONES } from "@/constants";
import { X } from "lucide-react";
import { agentScheduleAppointmentSchema } from "@/schemas";
import { useStore } from "@/hooks";
import { bookAppointment, scheduleAppointment } from "@/store";
import { Loader } from "@/components/progress";
import { SuccessComponent, ErrorDrawer, usePairState } from "./Resuables";

type AppointmentFormProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  portal: React.RefObject<HTMLDivElement>;
  cancelBooking: () => void;
  source?: "bot" | "live-agent";
};

const snapPoints = ["280px", 1];

export const AppointmentForm = ({
  open,
  onOpenChange,
  portal,
  cancelBooking,
  source = "live-agent",
}: AppointmentFormProps) => {
  const { dispatch, getState } = useStore();
  const { loading, success, error, errors, resetState } = usePairState(source);
  const { currentBot, currentConversationId } = getState("Bot");

  const [confirmCancelBooking, setConfirmCancelBooking] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[1]);

  const onErrorDrawerOpenChange = (val: boolean) => {
    dispatch(resetState());
  };

  const initialValues = {
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    dateTime: "",
    timezone: "",
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: agentScheduleAppointmentSchema,
    onSubmit(values) {
      if (source === "bot")
        return dispatch(
          scheduleAppointment({
            ...values,
            botId: currentBot?._id!,
            conversationId: currentConversationId!,
          })
        );
      return dispatch(bookAppointment(values));
    },
  });

  const triggerCancelBooking = () => {
    setConfirmCancelBooking(true);
    setSnap(snapPoints[0]);
  };

  const onCancelConfirmation = () => {
    setConfirmCancelBooking(false);
    setSnap(snapPoints[1]);
  };

  const onConfirmCancelBooking = () => {
    cancelBooking();
    setConfirmCancelBooking(false);
    validation.resetForm();
  };

  useEffect(() => {
    if (success) {
      validation.resetForm();
      const tmo = setTimeout(() => {
        dispatch(resetState());
        onOpenChange(false);
        clearTimeout(tmo);
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      if (Object.keys(errors).length > 0) {
        validation.setErrors(errors);
      }
      const tmo = setTimeout(() => {
        dispatch(resetState());
        clearTimeout(tmo);
      }, 2000);
    }
  }, [error]);

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      container={portal.current}
      dismissible={false}
      handleOnly
      modal={false}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      // setActiveSnapPoint={setSnap}
    >
      <Drawer.Portal>
        {/* <Drawer.Overlay className="fixed inset-0 bg-black/40" /> */}

        {/* Custom overlay */}
        <div className="fixed inset-0 bg-black/40"></div>

        <Drawer.Content className="bg-gray-100 flex flex-col mt-24 h-[80%] fixed bottom-0 left-0 right-0 outline-none !rounded-t-4xl z-[100000] overflow-hidden">
          {loading && <Loader />}

          {success && <SuccessComponent text="Appointment Booked! 🎉🎉" />}

          <ErrorDrawer
            error={error}
            open={!!error}
            onOpenChange={onErrorDrawerOpenChange}
            portal={portal}
          />

          {/* Close button */}
          {!confirmCancelBooking && (
            <div className="flex justify-end p-4 absolute z-100 top-0 right-0">
              <Button
                className="rounded-full"
                size={"icon"}
                onClick={triggerCancelBooking}
                disabled={loading}
              >
                <X />
              </Button>
            </div>
          )}

          <div
            className={cn(
              "p-4 pb-20 bg-white rounded-t-4xl flex-1 overflow-y-auto no-scrollbar",
              { hidden: success }
            )}
          >
            <div className="max-w-sm mx-auto space-y-4 px-1 sm:px-0">
              <div
                aria-hidden
                className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
              />

              {confirmCancelBooking && (
                <div className="flex flex-col gap-2">
                  <Drawer.Title className="font-medium text-gray-900 text-xl">
                    Cancel booking
                  </Drawer.Title>
                  <Drawer.Description className="text-gray-600 text-sm">
                    Are you sure you want to cancel this booking?
                  </Drawer.Description>
                </div>
              )}
              {!confirmCancelBooking && !success && (
                <div className="flex flex-col gap-2">
                  <Drawer.Title className="font-medium text-gray-900 text-xl">
                    Book an appointment
                  </Drawer.Title>
                  <Drawer.Description className="text-gray-600 text-sm">
                    Book an appointment with us and we will get back to you as
                    soon as possible.
                  </Drawer.Description>
                </div>
              )}

              {/* Form */}
              {!confirmCancelBooking && !success && (
                <form
                  className="mt-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <FormGroup
                    type="text"
                    groupLabel="Full name"
                    placeholder="Enter your full name"
                    size="md"
                    name="customerName"
                    validation={validation}
                    containerClassName="gap-2 mt-4"
                  />
                  <FormGroup
                    type="text"
                    groupLabel="Email address"
                    placeholder="Enter your email address"
                    size="md"
                    name="customerEmail"
                    validation={validation}
                    containerClassName="gap-2 mt-4"
                  />
                  <FormGroup
                    type="phone"
                    groupLabel="Phone number"
                    placeholder="Enter your phone number"
                    size="md"
                    name="customerPhone"
                    validation={validation}
                    containerClassName="gap-2 mt-4"
                  />
                  <FormGroup
                    type="date-time"
                    groupLabel="Date"
                    placeholder="Select date and time"
                    size="md"
                    name="dateTime"
                    validation={validation}
                    containerClassName="gap-2 mt-4"
                  />
                  <FormGroup
                    type="select"
                    groupLabel="Timezone"
                    placeholder="Select timezone"
                    size="md"
                    name="timezone"
                    validation={validation}
                    options={TIME_ZONES}
                    defaultValue="UTC+1"
                    containerClassName="gap-2 mt-4"
                  />
                  <Button
                    className="w-full cursor-pointer mt-6"
                    type="submit"
                    disabled={loading}
                  >
                    Book appointment
                  </Button>
                  <Button
                    className="w-full cursor-pointer mt-2 bg-accent border-none hover:bg-gray-200 duration-500"
                    type="button"
                    variant={"secondary_gray"}
                    onClick={triggerCancelBooking}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </form>
              )}

              {/* Cancel confirmation actions */}
              {confirmCancelBooking && (
                <div className="flex items-center gap-2">
                  <Button
                    className="w-full cursor-pointer bg-accent border-none hover:bg-gray-200 duration-500 rounded-2xl"
                    onClick={onCancelConfirmation}
                    variant={"secondary_gray"}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-full cursor-pointer m-0 text-white rounded-2xl"
                    variant={"destructive"}
                    onClick={onConfirmCancelBooking}
                  >
                    Confirm
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
