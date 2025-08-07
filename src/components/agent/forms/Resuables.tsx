import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Drawer } from "vaul";
import { motion } from "framer-motion";
import { useStore } from "@/hooks";
import { resetBookAppointment, resetScheduleAppointment } from "@/store";
import errorLottie from "@/assets/lotties/Error.json";
import successLottie from "@/assets/lotties/success.json";

export const SuccessComponent = ({ text }: { text: string }) => {
  return (
    <div
      className="w-full h-full flex-1 relative z-[101] bg-white
    flex flex-col justify-center items-center
  "
    >
      {/* Fade + Slide Lottie */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-50 h-50"
      >
        <DotLottieReact data={successLottie} autoplay />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        {text}
      </motion.p>
    </div>
  );
};

const ErrorComponent = ({ error }: { error: string }) => {
  return (
    <div
      className="w-full h-full flex-1 relative z-[101] bg-white
    flex flex-col justify-center items-center
  "
    >
      {/* Fade + Slide Lottie */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-40 h-40"
      >
        <DotLottieReact data={errorLottie} autoplay />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        {error}
      </motion.p>
    </div>
  );
};

export const ErrorDrawer = ({
  error,
  onOpenChange,
  open,
  portal,
}: {
  error: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  portal: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <Drawer.NestedRoot
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={true}
      container={portal.current}
      modal={false}
      dismissible={false}
    >
      <Drawer.Portal>
        {/* Custom overlay */}
        <div className="fixed inset-0 bg-black/40 z-[100001]"></div>

        <Drawer.Content className="bg-gray-100 flex flex-col !rounded-t-4xl h-[300px] mt-24 max-h-[94%] fixed bottom-0 left-0 right-0 z-[100002] overflow-hidden">
          <div className="p-4 bg-white rounded-t-4xl flex-1">
            <ErrorComponent error={error} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.NestedRoot>
  );
};

export const usePairState = (source: "bot" | "live-agent") => {
  const { getState } = useStore();
  const {
    bookingAppointment,
    appointmentBooked,
    bookAppointmentErrorMessage,
    bookAppointmentErrors,
  } = getState("Agent");
  const {
    schedulingAppointment,
    appointmentScheduled,
    scheduleAppointmentErrorMessage,
    scheduleAppointmentErrors,
  } = getState("Bot");

  return source === "bot"
    ? {
        loading: schedulingAppointment,
        success: appointmentScheduled,
        error: scheduleAppointmentErrorMessage,
        errors: scheduleAppointmentErrors,
        resetState: resetScheduleAppointment,
      }
    : {
        loading: bookingAppointment,
        success: appointmentBooked,
        error: bookAppointmentErrorMessage,
        errors: bookAppointmentErrors,
        resetState: resetBookAppointment,
      };
};

// For escalation

export const usePairEscalationState = (source: "bot" | "live-agent") => {
  const { getState } = useStore();
  const {
    submittingTicket,
    ticketSubmitted,
    submitTicketErrorMessage,
    submitTicketErrors,
  } = getState("Agent");
  const {
    escalatingChat,
    chatEscalated,
    escalateChatErrors,
    escalateChatErrorMessage,
  } = getState("Bot");

  return source === "bot"
    ? {
        loading: escalatingChat,
        success: chatEscalated,
        error: escalateChatErrorMessage,
        errors: escalateChatErrors,
        resetState: resetScheduleAppointment,
      }
    : {
        loading: submittingTicket,
        success: ticketSubmitted,
        error: submitTicketErrorMessage,
        errors: submitTicketErrors,
        resetState: resetBookAppointment,
      };
};
