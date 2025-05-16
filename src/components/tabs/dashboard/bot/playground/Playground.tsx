import { Button } from "@/components/form";
import { CustomDropdownItem } from "@/components/popups";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BotTabsEnum } from "@/enums";
import { useStore } from "@/hooks";
import { changeBotTab, setCurrentBot } from "@/store";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { InstructionEditor } from "./InstructionEditor";
import { ChatBot } from "./ChatBot";
import { BotConfigDrawer } from "./BotConfigDrawer";

export const MoreActionsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none outline-none">
        <Button variant={"outline"} size={"sm"} className="font-sfpro">
          More actions <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="px-2 py-2.5 rounded-lg border-none w-52 bg-white z-40 mt-1"
        align="end"
        style={{
          boxShadow: "0px 4px 16px 0px #0000001F",
        }}
      >
        <CustomDropdownItem placeholder="Coming soon" />
        <CustomDropdownItem placeholder="Coming soon" />
        <CustomDropdownItem placeholder="Coming soon" />
        <CustomDropdownItem placeholder="Coming soon" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const PlaygroundHeader = ({ goBack }: { goBack: () => void }) => {
  return (
    <div className="flex justify-between items-center border-b py-4 px-10">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size={"icon"}
          className="rounded-full"
          onClick={goBack}
        >
          <ArrowLeft />
        </Button>
        <p className="font-spfro-medium text-black text-sm">Back</p>
      </div>
      <div className="flex items-center gap-4">
        <MoreActionsDropdown />
      </div>
    </div>
  );
};

export const BotPlaygroundTab = () => {
  const { dispatch, getState } = useStore();
  const [botConfigOpen, setBotConfigOpen] = useState(() => false);
  const { currentBot } = getState("Bot");

  const openBotConfig = () => setBotConfigOpen(true);

  const goBack = () => {
    dispatch(changeBotTab(BotTabsEnum.ANALYTICS)),
      dispatch(setCurrentBot(null));
  };

  useEffect(() => {
    if (!currentBot) {
      goBack();
    }
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-[12px]">
      <PlaygroundHeader goBack={goBack} />
      <div className="flex-1 grid grid-cols-5 px-10 py-8 gap-10">
        <InstructionEditor />
        <ChatBot openBotConfig={openBotConfig} />
        <BotConfigDrawer
          isOpen={botConfigOpen}
          onOpenChange={setBotConfigOpen}
          currentBot={currentBot!}
        />
      </div>
    </div>
  );
};
