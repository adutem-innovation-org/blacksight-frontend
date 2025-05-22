import { Button } from "@/components/form";
import { useStore } from "@/hooks";
import { Bot } from "@/interfaces";
import { cn } from "@/lib/utils";
import { newMessage } from "@/store";
import { Send, Settings2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const ChatBotHeader = ({
  currentBot,
  openBotConfig,
}: {
  currentBot: Bot;
  openBotConfig: () => void;
}) => {
  return (
    <div className="bg-transparent p-4 pt-4 pb-0">
      <div className="flex items-center justify-between">
        <p className="tracking-tight font-dmsans text-white">
          {currentBot.name}
        </p>
        <Button
          variant="outline"
          size={"icon"}
          className="rounded-full"
          onClick={openBotConfig}
        >
          <Settings2 />
        </Button>
      </div>
    </div>
  );
};

const TextInput = () => {
  const { dispatch } = useStore();
  const [message, setMessage] = useState("");

  const updateText = (e: any) => setMessage(e.target.value);

  const sendMessage = () => {
    dispatch(newMessage({ entity: "user", text: message }));
    setMessage("");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      if (message.trim().length > 0) {
        dispatch(newMessage({ entity: "user", text: message }));
        setMessage("");
      }
    }
  };

  return (
    <div className="rounded-full w-full bg-white shadow-2xl h-15 flex items-center p-1">
      <input
        type="text"
        className="flex-1 bg-transparent p-2 pl-6 bg-none outline-none border-none"
        placeholder="Type and press [enter]"
        value={message}
        onChange={updateText}
        onKeyPress={handleKeyPress}
      />
      <Button
        className="bg-indigo-500 rounded-full h-13 w-13 aspect-square cursor-pointer hover:bg-indigo-500/70"
        size={"icon"}
        onClick={sendMessage}
      >
        <Send className="!w-6 !h-6" />
      </Button>
    </div>
  );
};

const Message = ({
  entity,
  text,
}: {
  entity: "user" | "bot";
  text: string;
}) => {
  const isBot = entity === "bot";

  return (
    <div
      className={cn(
        "flex items-start w-2/3 opacity-0",
        {
          "self-start justify-start": isBot,
          "self-end justify-end": !isBot,
        },
        isBot ? "fade-in-left" : "fade-in-right"
      )}
    >
      {/* Arrow */}
      <div
        className={cn("w-0 h-0 border-4", {
          "border-b-transparent border-t-white border-r-white border-l-transparent":
            isBot,
          "border-b-transparent border-t-white border-l-white border-r-transparent order-7":
            !isBot,
        })}
      ></div>

      {/* Text */}
      <div
        className={cn("p-4 bg-white text-sm", {
          "rounded-md rounded-tl-none shadow-[2px_2px_4px_#0000001a]": isBot,
          "rounded-md rounded-tr-none shadow-[-2px_2px_4px_#0000001a]": !isBot,
        })}
      >
        {text}
      </div>
    </div>
  );
};

const Conversations = ({
  currentConversation,
}: {
  currentConversation: any[] | null;
}) => {
  const conversationContainerRef = useRef<any>(null);

  const scrollToBottom = useCallback(() => {
    const containerRef = conversationContainerRef.current;
    if (containerRef) {
      containerRef.scrollTop = containerRef.scrollHeight + 1000;
    }
  }, [conversationContainerRef]);

  useEffect(() => {
    if ((currentConversation || []).length > 1) {
      scrollToBottom();
    }
  }, [currentConversation]);

  return (
    <div className="bg-gray-100 flex-1 rounded-[28px] flex flex-col justify-end p-6 gap-4 overflow-hidden">
      <div
        className="flex-1 overflow-auto no-scrollbar py-4 scroll-smooth"
        ref={conversationContainerRef}
      >
        <div className="flex flex-col gap-3">
          {(currentConversation || []).map((message) => (
            <Message {...message} />
          ))}
        </div>
      </div>
      <TextInput />
    </div>
  );
};

export const ChatBot = ({ openBotConfig }: { openBotConfig: () => void }) => {
  const { dispatch, getState } = useStore();
  const { currentBot, currentConversation } = getState("Bot");

  const startConversation = () => {
    dispatch(
      newMessage({
        entity: "bot",
        text:
          currentBot?.welcomeMessage ??
          "Hello there!👋\nHow can I help you today?",
      })
    );
  };

  useEffect(() => {
    if (!currentConversation || currentConversation.length === 0) {
      startConversation();
    }
  }, []);

  return (
    <div className="basis-2/5 flex-1 flex flex-col">
      <div className="h-10">
        <p className="text-2xl font-dmsans tracking-tight">Chatbot</p>
      </div>
      <div className="bg-white bg-linear-to-br from-indigo-500 to-sky-500 shadow-[0px_4px_16px_0px_#0000001f] rounded-4xl overflow-hidden w-full flex-1 p-1 flex flex-col gap-4">
        <ChatBotHeader currentBot={currentBot!} openBotConfig={openBotConfig} />
        <Conversations currentConversation={currentConversation} />
      </div>
    </div>
  );
};
