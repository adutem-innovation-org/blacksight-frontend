import { Button } from "@/components/form";
import { useStore } from "@/hooks";
import { Bot } from "@/interfaces";
import { Settings2 } from "lucide-react";

const ChatBotHeader = ({ currentBot }: { currentBot: Bot }) => {
  return (
    <div className="bg-gray-100 py-5 px-10">
      <div className="flex items-center justify-between">
        <p>{currentBot.name}</p>
        <Button variant="outline" size={"icon"} className="rounded-full">
          <Settings2 />
        </Button>
      </div>
    </div>
  );
};

export const ChatBot = () => {
  const { getState } = useStore();
  const { currentBot } = getState("Bot");
  return (
    <div className="h-full flex flex-col col-span-2">
      <div className="h-10">
        <p className="text-2xl font-dmsans tracking-tight">Chatbot</p>
      </div>
      <div className=" bg-white shadow-[0px_4px_16px_0px_#0000001f] rounded-[12px] overflow-hidden w-full flex-1">
        <ChatBotHeader currentBot={currentBot!} />
      </div>
    </div>
  );
};
