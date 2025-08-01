import { setAgentConnectionError } from "@/store";
import { useEffect } from "react";
import { useStore } from "@/hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import chatLottie from "@/assets/lotties/Chat.json";

const AgentInitState = () => {
  return (
    <div className="w-full h-full min-w-[280px] min-h-[400px] max-w-[400px] max-h-[500px] rounded-2xl fixed bottom-[20px] right-[20px] bg-white shadow-2xl z-[1000000]">
      <div className="w-full h-full flex flex-col items-center justify-center gap-6">
        <div className="w-50 h-50 bg-red-500">
          <DotLottieReact
            src={"../../assets/lotties/Chat.json"}
            loop
            autoplay
          />
        </div>
        <p className="italics">Initializing</p>
      </div>
    </div>
  );
};

const AgentConnecting = () => {
  return (
    <div className="w-full h-full min-w-[280px] min-h-[400px] max-w-[400px] max-h-[500px] rounded-2xl fixed bottom-[20px] right-[20px] bg-white shadow-2xl z-[1000000]">
      Connecting
    </div>
  );
};

const AgentConnectionError = ({
  connectionError,
}: {
  connectionError: string;
}) => {
  return (
    <div className="w-full h-full min-w-[280px] min-h-[400px] max-w-[400px] max-h-[500px] rounded-2xl fixed bottom-[20px] right-[20px] bg-white shadow-2xl z-[1000000]">
      Connection error
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

  if (!connected && !connecting && !connectionError) return <AgentInitState />;

  if (connecting) return <AgentConnecting />;

  if (connectionError)
    return <AgentConnectionError connectionError={connectionError} />;

  return (
    <div className="w-full h-full min-w-[280px] min-h-[400px]">Connected</div>
  );
};
