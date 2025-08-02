import { Drawer } from "vaul";
import { useEffect, useState } from "react";
import { Button, FormGroup } from "@/components/form";
import { useFormik } from "formik";
import { X } from "lucide-react";
import { agentEscalateIssueSchema } from "@/schemas";
import { resetSubmitTicket, submitTicket } from "@/store";
import { useStore } from "@/hooks";
import { Loader } from "@/components/progress";
import { SuccessComponent, ErrorDrawer } from "./Resuables";
import { cn } from "@/lib/utils";

type EscalationFormProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  portal: React.RefObject<HTMLDivElement>;
  cancelTicket: () => void;
};

const snapPoints = ["280px", 1];

export const EscalationForm = ({
  open,
  onOpenChange,
  portal,
  cancelTicket,
}: EscalationFormProps) => {
  const { dispatch, getState } = useStore();
  const {
    submittingTicket,
    ticketSubmitted,
    submitTicketErrorMessage,
    submitTicketErrors,
  } = getState("Agent");
  const [confirmCancelTicket, setConfirmCancelTicket] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[1]);

  const onErrorDrawerOpenChange = (val: boolean) => {
    dispatch(resetSubmitTicket());
  };

  const initialValues = {
    customerName: "",
    customerEmail: "",
    message: "",
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: agentEscalateIssueSchema,
    onSubmit(values) {
      dispatch(submitTicket(values));
    },
  });

  const triggerCancelTicket = () => {
    setConfirmCancelTicket(true);
    setSnap(snapPoints[0]);
  };

  const onCancelConfirmation = () => {
    setConfirmCancelTicket(false);
    setSnap(snapPoints[1]);
  };

  const onConfirmCancelTicket = () => {
    cancelTicket();
    setConfirmCancelTicket(false);
    validation.resetForm();
  };

  useEffect(() => {
    if (ticketSubmitted) {
      validation.resetForm();
      const tmo = setTimeout(() => {
        dispatch(resetSubmitTicket());
        onOpenChange(false);
        clearTimeout(tmo);
      }, 3000);
    }
  }, [ticketSubmitted]);

  useEffect(() => {
    if (submitTicketErrorMessage) {
      if (Object.keys(submitTicketErrors).length > 0) {
        validation.setErrors(submitTicketErrors);
      }
      const tmo = setTimeout(() => {
        dispatch(resetSubmitTicket());
        clearTimeout(tmo);
      }, 2000);
    }
  }, [submitTicketErrorMessage]);

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
          {submittingTicket && <Loader />}

          {ticketSubmitted && (
            <SuccessComponent text="Ticket submitted! 🎉🎉" />
          )}

          <ErrorDrawer
            error={submitTicketErrorMessage}
            open={!!submitTicketErrorMessage}
            onOpenChange={onErrorDrawerOpenChange}
            portal={portal}
          />

          {/* Close button */}
          {!confirmCancelTicket && (
            <div className="flex justify-end p-4 absolute z-100 top-0 right-0">
              <Button
                className="rounded-full"
                size={"icon"}
                onClick={triggerCancelTicket}
              >
                <X />
              </Button>
            </div>
          )}

          <div
            className={cn(
              "p-4 pb-20 bg-white rounded-t-4xl flex-1 overflow-y-auto no-scrollbar",
              { hidden: ticketSubmitted }
            )}
          >
            <div className="max-w-sm mx-auto space-y-4 px-1 sm:px-0">
              <div
                aria-hidden
                className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
              />

              {confirmCancelTicket && (
                <div className="flex flex-col gap-2">
                  <Drawer.Title className="font-medium text-gray-900 text-xl">
                    Cancel this ticket
                  </Drawer.Title>
                  <Drawer.Description className="text-gray-600 text-sm">
                    Are you sure you want to cancel this ticket?
                  </Drawer.Description>
                </div>
              )}

              {!confirmCancelTicket && !ticketSubmitted && (
                <div className="flex flex-col gap-2">
                  <Drawer.Title className="font-medium text-gray-900 text-xl">
                    Escalate a ticket
                  </Drawer.Title>
                  <Drawer.Description className="text-gray-600 text-sm">
                    We will get back to you as soon as possible.
                  </Drawer.Description>
                </div>
              )}

              {/* Form */}
              {!confirmCancelTicket && !ticketSubmitted && (
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
                    type="textarea"
                    groupLabel="Message"
                    placeholder="Enter your message"
                    size="sm"
                    name="message"
                    validation={validation}
                    containerClassName="gap-2 mt-4 resize-none"
                  />

                  <Button className="w-full cursor-pointer mt-6" type="submit">
                    Submit ticket
                  </Button>
                  <Button
                    className="w-full cursor-pointer mt-2 bg-accent border-none hover:bg-gray-200 duration-500"
                    type="button"
                    variant={"secondary_gray"}
                    onClick={triggerCancelTicket}
                  >
                    Cancel
                  </Button>
                </form>
              )}

              {/* Cancel confirmation actions */}
              {confirmCancelTicket && (
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
                    onClick={onConfirmCancelTicket}
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
