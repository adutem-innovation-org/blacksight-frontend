import { Button } from "@/components/form";
import { CustomDropdownItem } from "@/components/popups";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BotTabsEnum } from "@/enums";
import { useStore } from "@/hooks";
import {
  changeBotTab,
  clearCurrentConversation,
  clearTrainingConversation,
  resetClearTrainingConversation,
  setCurrentBot,
} from "@/store";
import { ArrowLeft, ChevronDown, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { InstructionEditor } from "./InstructionEditor";
import { ChatBot } from "./ChatBot";
import { BotConfigDrawer } from "./BotConfigDrawer";
import { Loader } from "@/components/progress";
import toast from "react-hot-toast";

export const MoreActionsDropdown = ({
  onClearConversation,
}: {
  onClearConversation: () => void;
}) => {
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
        <CustomDropdownItem
          placeholder="Clear conversation"
          childrenPosition="behind"
          className={"py-2"}
          onClick={onClearConversation}
        >
          <Trash2 />
        </CustomDropdownItem>
        <CustomDropdownItem placeholder="Coming soon" />
        <CustomDropdownItem placeholder="Coming soon" />
        <CustomDropdownItem placeholder="Coming soon" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const PlaygroundHeader = ({
  goBack,
  onClearConversation,
}: {
  goBack: () => void;
  onClearConversation: () => void;
}) => {
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
        <MoreActionsDropdown onClearConversation={onClearConversation} />
      </div>
    </div>
  );
};

export const BotPlaygroundTab = () => {
  const { dispatch, getState } = useStore();
  const [botConfigOpen, setBotConfigOpen] = useState(() => false);
  const {
    currentBot,
    currentConversationId,
    clearingTrainingConversation,
    trainingConversationCleared,
    clearTrainingConversationError,
  } = getState("Bot");

  const openBotConfig = () => setBotConfigOpen(true);

  const goBack = () => {
    dispatch(changeBotTab(BotTabsEnum.ANALYTICS));
    dispatch(setCurrentBot(null));
    dispatch(clearCurrentConversation());
  };

  const clearConversation = () => {
    if (currentBot && currentConversationId) {
      dispatch(
        clearTrainingConversation({
          botId: currentBot?._id,
          conversationId: currentConversationId,
        })
      );
    }
  };

  useEffect(() => {
    if (!currentBot) {
      goBack();
    }
  }, []);

  useEffect(() => {
    if (trainingConversationCleared) {
      toast.success("Training conversation cleared");
      dispatch(resetClearTrainingConversation());
    }
  }, [trainingConversationCleared]);

  useEffect(() => {
    if (clearTrainingConversationError) {
      toast.error(
        clearTrainingConversationError ?? "An unknown error occured."
      );
      dispatch(resetClearTrainingConversation());
    }
  }, [clearTrainingConversationError]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-[12px]">
      <PlaygroundHeader
        goBack={goBack}
        onClearConversation={clearConversation}
      />
      <div className="flex-1 flex px-10 py-8 gap-10 overflow-hidden">
        {clearingTrainingConversation && (
          <Loader text1="Clearing conversation" />
        )}
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
