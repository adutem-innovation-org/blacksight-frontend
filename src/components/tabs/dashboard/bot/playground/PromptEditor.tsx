import { Button } from "@/components/form";
import { Loader } from "@/components/progress";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { resetUpdateBotInstructions, updateBotInstructions } from "@/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PromptEditorHeader = () => {
  return (
    <div className="h-10">
      <p className="text-2xl font-dmsans tracking-tight">Prompt Editor</p>
    </div>
  );
};

export const PromptEditor = ({ disabled = false }: { disabled?: boolean }) => {
  const { dispatch, getState } = useStore();
  const {
    updatingBotInstructions,
    botInstructionsUpdated,
    updateBotInstructionsErrorMessage,
  } = getState("Bot");
  const [isFocused, setIsFocused] = useState(false);
  const { currentBot } = getState("Bot");
  const [instructions, setInstructions] = useState(
    () => currentBot?.instructions || ""
  );

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (instructions.trim().length === 0) {
      setInstructions(currentBot?.instructions || "");
    }
    dispatch(
      updateBotInstructions({ id: currentBot?._id!, data: { instructions } })
    );
  };

  useEffect(() => {
    if (botInstructionsUpdated) {
      toast.success("Bot instruction updated");
      dispatch(resetUpdateBotInstructions());
    }
  }, [botInstructionsUpdated]);

  useEffect(() => {
    if (updateBotInstructionsErrorMessage) {
      toast.error(updateBotInstructionsErrorMessage);
      dispatch(resetUpdateBotInstructions());
    }
  }, [updateBotInstructionsErrorMessage]);

  return (
    <div className="flex flex-col col-span-3">
      <PromptEditorHeader />
      <form
        className="flex flex-col flex-1 gap-3 relative overflow-hidden"
        onSubmit={handleSubmit}
      >
        {updatingBotInstructions && <Loader />}
        <div
          className={cn(
            "w-full flex p-4 items-center gap-3 border border-[#F3F4F6] bg-[#042f5b0d] hover:bg-[#042f5b0d] rounded-[12px] relative cursor-pointer flex-1 overflow-hidden",
            {
              "border-[#2563EB]": isFocused,
              "bg-[#F9FAFB]": disabled,
              "border-[#F3F4F6]": disabled,
              "pointer-events-none": disabled,
            }
          )}
        >
          <textarea
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            className={cn(
              "w-full p-0 outline-none outline-[0px] border-none border-[0px] bg-transparent h-full shadow-none font-normal text-sm text-[#1F2937] placeholder:text-[#6B7280] font-sfpro not-focus:text-[#1f293771] resize-none",
              {
                "text-[#D1D5DB]": disabled,
                "placeholder:text-[#D1D5DB]": disabled,
              }
            )}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <Button>Save</Button>
      </form>
    </div>
  );
};
