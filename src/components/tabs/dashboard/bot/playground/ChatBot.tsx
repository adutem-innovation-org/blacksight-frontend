import { Button } from "@/components/form";
import { useStore } from "@/hooks";
import { Bot } from "@/interfaces";
import { Send, Settings2 } from "lucide-react";

const ChatBotHeader = ({ currentBot }: { currentBot: Bot }) => {
  return (
    <div className="bg-transparent p-4 pt-4 pb-0">
      <div className="flex items-center justify-between">
        <p className="tracking-tight font-dmsans text-white">
          {currentBot.name}
        </p>
        <Button variant="outline" size={"icon"} className="rounded-full">
          <Settings2 />
        </Button>
      </div>
    </div>
  );
};

const TextInput = () => {
  return (
    <div className="rounded-full w-full bg-white shadow-2xl min-h-15 flex items-center p-1">
      <input
        type="text"
        className="flex-1 bg-transparent p-2 pl-6 bg-none outline-none border-none"
        placeholder="Type and press [enter]"
      />
      <Button
        className="bg-indigo-500 rounded-full h-13 w-13 aspect-square cursor-pointer hover:bg-indigo-500/70"
        size={"icon"}
      >
        <Send className="!w-6 !h-6" />
      </Button>
    </div>
  );
};

const Conversations = () => {
  return (
    <div className="bg-gray-100 flex-1 rounded-[28px] flex flex-col justify-end p-6">
      <TextInput />
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
      <div className="bg-white bg-linear-to-br from-indigo-500 to-sky-500 shadow-[0px_4px_16px_0px_#0000001f] rounded-4xl overflow-hidden w-full flex-1 p-1 flex flex-col gap-4">
        <ChatBotHeader currentBot={currentBot!} />
        <Conversations />
      </div>
    </div>
  );
};
