import { connectAgent, setAgentConnectionError } from "@/store";
import { use, useEffect } from "react";
import { useStore } from "@/hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export const AgentInitState = ({ state }: { state: string }) => {
  return (
    <div className="w-full h-full min-w-[280px] min-h-[400px] max-w-[400px] max-h-[500px] rounded-2xl fixed bottom-[20px] right-[20px] bg-white shadow-2xl drop-shadow-2xl z-[1000000]">
      <div className="w-full h-full flex flex-col items-center justify-center gap-6 overflow-hidden">
        {/* Fade + Slide Nova AI */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Nova AI
        </motion.h2>

        {/* Fade + Slide Lottie */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-50 h-50"
        >
          <DotLottieReact src={"./lotties/Chat.lottie"} loop autoplay />
        </motion.div>

        {/* Typing Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg italic bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          <Typewriter
            words={[state]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={1000}
          />
        </motion.p>
      </div>
    </div>
  );
};

const AgentConnectionError = ({
  connectionError,
}: {
  connectionError: string;
}) => {
  return (
    <div className="w-full h-full min-w-[280px] min-h-[400px] max-w-[400px] max-h-[500px] rounded-2xl fixed bottom-[20px] right-[20px] bg-white shadow-2xl drop-shadow-2xl z-[1000000]">
      <div className="w-full h-full flex flex-col  justify-start gap-3 overflow-hidden p-4">
        <div className="flex items-center self-start gap-4">
          {/* Scale + Fade Lottie */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-10 h-10 rounded-full border gap-2"
          >
            <DotLottieReact src={"./lotties/Chat.lottie"} loop autoplay />
          </motion.div>

          {/* Slide from Left + Fade */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Nova AI
          </motion.h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <motion.p
            className="text-destructive font-medium bg-white px-4 py-2 rounded-xl border border-gray-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connection error
          </motion.p>
          <motion.p
            className="text-destructive text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {connectionError}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

type LiveAgentProps = {
  apiKey: string;
  agentId: string;
};

export const LiveAgent = ({ apiKey, agentId }: LiveAgentProps) => {
  const { getState, dispatch } = useStore();
  const { connected, connecting, connectionError } = getState("Agent");

  useEffect(() => {
    const init = () => {
      if (!apiKey) {
        return dispatch(
          setAgentConnectionError("Connection error. Missing API key.")
        );
      }

      if (!agentId) {
        return dispatch(
          setAgentConnectionError("Connection error. Missing agent ID.")
        );
      }
    };

    init();
  }, [apiKey, agentId]);

  useEffect(() => {
    if (apiKey && agentId && !connected) {
      const timeout = setTimeout(() => {
        dispatch(connectAgent({ apiKey, agentId }));
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [apiKey, agentId]);

  if (!connected && !connectionError)
    return (
      <AgentInitState
        state={connecting ? "Connecting..." : "Initializing..."}
      />
    );

  if (connectionError)
    return <AgentConnectionError connectionError={connectionError} />;

  return (
    <div className="w-full h-full min-w-[280px] min-h-[400px] max-w-[400px] max-h-[500px] rounded-2xl fixed bottom-[20px] right-[20px] bg-white shadow-2xl drop-shadow-2xl z-[1000000]">
      <div className="w-full h-full flex justify-center items-center">
        Connected
      </div>
    </div>
  );
};
