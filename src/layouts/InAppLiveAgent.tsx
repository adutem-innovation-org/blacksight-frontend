import { LiveAgent } from "@/components";
import { Button } from "@/components/form";
import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowDown } from "lucide-react";
import { useState } from "react";

export const InAppLiveAgent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openLiveAgent = () => {
    setIsOpen(true);
  };

  const closeLiveAgent = () => {
    setIsOpen(false);
  };

  const handleToggleClick = () => {
    isOpen ? closeLiveAgent() : openLiveAgent();
  };
  return (
    <div className="fixed z-[100000] bottom-[20px] right-[5%] sm:right-[20px] h-max w-[90%] min-w-[250px] max-w-[450px] flex flex-col gap-2 items-end">
      {isOpen && (
        <LiveAgent
          apiKey="065a802cdcb8f993f9e3cf34cd04fa25636b61189b54f13c53ea91c177a0eeb8"
          agentId="684702278a6bccca8c1c9606"
          // Prod
          // apiKey="f5cfa4777f1a6f229fca1d720bdd98101ae7c9c67b40bc3f2f92fbe60d16b1a0"
          // agentId="agent_123"
          // agentId="688c0f5c405c0145f9506062"
          shouldDisplayFixed={false}
        />
      )}

      <div
        className={cn(
          "rounded-4xl bg-white shadow-2xl drop-shadow-2xl flex flex-col gap-2 p-4 transition-discrete duration-300 ease-in-out",
          {
            "p-0": isOpen,
          }
        )}
      >
        {!isOpen && (
          <div className="flex items-center self-start gap-3">
            {/* Scale + Fade Lottie */}
            <div className="w-10 h-10 rounded-full border gap-2">
              <DotLottieReact src={"./lotties/Chat.lottie"} loop autoplay />
            </div>

            {/* Slide from Left + Fade */}
            <p className="text-center font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              👋 Got questions?
            </p>
          </div>
        )}

        <Button
          className={cn("rounded-full cursor-pointer", {
            "!px-8 !text-sm": !isOpen,
            "!p-0 w-16 h-16 !bg-white border-none": isOpen,
          })}
          size={"sm"}
          onClick={handleToggleClick}
        >
          {isOpen ? (
            <>
              <span className="w-11 h-11 rounded-full bg-primary flex justify-center items-center">
                <ArrowDown />
              </span>
            </>
          ) : (
            <>
              <i className="fi fi-sr-messages flex" />
              Speak to Blacksight AI
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
