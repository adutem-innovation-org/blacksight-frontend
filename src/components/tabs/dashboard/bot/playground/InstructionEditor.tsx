import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";

const InstructionEditorHeader = () => {
  return (
    <div className="h-10">
      <p className="text-2xl font-dmsans tracking-tight">Instruction Editor</p>
    </div>
  );
};

export const InstructionEditor = ({
  disabled = false,
}: {
  disabled?: boolean;
}) => {
  const { getState } = useStore();
  const [isFocused, setIsFocused] = useState(false);
  const { currentBot } = getState("Bot");
  const [instructions, setInstructions] = useState(
    () => currentBot?.instructions.join("\n\n") || ""
  );

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="h-full col-span-3 flex flex-col">
      <InstructionEditorHeader />
      <div
        className={cn(
          "h-full w-full flex p-4 items-center gap-3 border border-[#F3F4F6] bg-[#042f5b0d] hover:bg-[#042f5b0d] rounded-[12px] relative cursor-pointer flex-1",
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
            "w-full p-0 outline-none outline-[0px] border-none border-[0px] bg-transparent h-full shadow-none font-normal text-sm text-[#1F2937] placeholder:text-[#6B7280] font-sfpro not-focus:text-[#1f293771]",
            {
              "text-[#D1D5DB]": disabled,
              "placeholder:text-[#D1D5DB]": disabled,
            }
          )}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>
    </div>
  );
};
