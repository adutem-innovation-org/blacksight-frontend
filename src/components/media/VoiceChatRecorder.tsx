import { useRef } from "react";
import { Button } from "../form";
import { Check, X } from "lucide-react";
import { useStore } from "@/hooks";
import { Spinner } from "../progress";

type VoiceChatRecordProps = {
  cancelRecording: () => void;
  endRecording: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export const VoiceChatRecorder = ({
  cancelRecording,
  endRecording,
  canvasRef,
}: VoiceChatRecordProps) => {
  const { getState } = useStore();
  const { transcribingSpeech } = getState("Bot");

  return (
    <div className="w-full flex flex-col pb-1">
      <canvas
        ref={canvasRef}
        width={400}
        height={50}
        className="w-full mb-4 bg-transparent rounded"
      />
      <div className="self-end flex items-center gap-1">
        <Button
          className="bg-transparent rounded-full h-10 w-10 aspect-square cursor-pointer hover:bg-gray-100/20 text-white mr-2 outline-none border-none focus:outline-none focus:border-none focus:bg-gray-100/10"
          size={"icon"}
          onClick={cancelRecording}
          disabled={transcribingSpeech}
        >
          <X className="!w-5 !h-5" />
        </Button>
        <Button
          className="bg-transparent rounded-full h-10 w-10 aspect-square cursor-pointer hover:bg-gray-100/20 text-white mr-2 outline-none border-none focus:outline-none focus:border-none focus:bg-gray-100/10"
          size={"icon"}
          onClick={endRecording}
          disabled={transcribingSpeech}
        >
          {transcribingSpeech ? (
            <Spinner classNames="h-[20px]" type={"primary"} />
          ) : (
            <Check className="!w-5 !h-5" />
          )}
        </Button>
      </div>
    </div>
  );
};
