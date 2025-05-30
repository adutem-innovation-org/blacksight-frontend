import { Button } from "@/components/form";
import { Loader } from "@/components/progress";
import { RoleEnum } from "@/enums";
import { useStore } from "@/hooks";
import { Bot } from "@/interfaces";
import { cn } from "@/lib/utils";
import {
  askChatbot,
  getTrainingConversation,
  newMessage,
  resetGetTrainingConversation,
  startConversation,
} from "@/store";
import { Send, Settings2 } from "lucide-react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

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
  const { dispatch, getState } = useStore();
  const {
    askingChatbot,
    startConversationError,
    startingConversation,
    currentBot,
    currentConversationId,
  } = getState("Bot");
  const [message, setMessage] = useState("");

  const updateText = (e: any) => setMessage(e.target.value);

  const sendMessage = () => {
    if (currentConversationId && currentBot) {
      dispatch(
        newMessage({
          role: RoleEnum.USER,
          content: message,
        })
      );
      let askChatbotTmo = setTimeout(() => {
        dispatch(
          askChatbot({
            botId: currentBot._id,
            conversationId: currentConversationId,
            userQuery: message,
          })
        );
        setMessage("");
        clearTimeout(askChatbotTmo);
      }, 300);
    }
  };

  const handleKeyPress = (e: any) => {
    if (askingChatbot || startingConversation || startConversationError) {
      return;
    }
    if (e.key === "Enter") {
      if (message.trim().length > 0) {
        if (currentConversationId && currentBot) {
          dispatch(
            newMessage({
              role: RoleEnum.USER,
              content: message,
            })
          );
          let askChatbotTmo = setTimeout(() => {
            dispatch(
              askChatbot({
                botId: currentBot._id,
                conversationId: currentConversationId,
                userQuery: message,
              })
            );
            setMessage("");
            clearTimeout(askChatbotTmo);
          }, 300);
        }
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
        disabled={
          !!startConversationError || askingChatbot || startingConversation
        }
      >
        <Send className="!w-6 !h-6" />
      </Button>
    </div>
  );
};

const Message = ({ role, content }: { role: RoleEnum; content: string }) => {
  const isBot = role === RoleEnum.ASSISTANT;

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
        {content}
      </div>
    </div>
  );
};

const Typing = () => {
  return (
    <div
      className={cn(
        "flex items-start w-2/3 opacity-0 fade-in-left self-start justify-start"
      )}
    >
      {/* Arrow */}
      <div
        className={cn(
          "w-0 h-0 border-4 border-b-transparent border-t-white border-r-white border-l-transparent"
        )}
      ></div>

      {/* Typing animation */}
      <div
        className={cn(
          "p-4 py-2 bg-white text-xs rounded-md rounded-tl-none shadow-[2px_2px_4px_#0000001a] italic"
        )}
      >
        Typing...
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
  const { getState } = useStore();
  const {
    startingConversation,
    startConversationError,
    askingChatbot,
    fetchingTrainingConversation,
  } = getState("Bot");
  const typing = startingConversation || askingChatbot;

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
    <div className="bg-gray-100 flex-1 rounded-[28px] flex flex-col justify-end p-6 gap-4 overflow-hidden relative">
      {fetchingTrainingConversation ? (
        <Loader text1="Loading training conversations..." />
      ) : (
        <Fragment>
          <div
            className="flex-1 overflow-auto no-scrollbar py-4 scroll-smooth"
            ref={conversationContainerRef}
          >
            <div className="flex flex-col gap-3">
              {(currentConversation || []).map((message) => (
                <Message {...message} />
              ))}
              {typing && <Typing />}
              {startConversationError && !typing && (
                <Message
                  role={RoleEnum.ASSISTANT}
                  content={startConversationError}
                />
              )}
            </div>
          </div>
          <TextInput />
        </Fragment>
      )}
    </div>
  );
};

export const ChatBot = ({ openBotConfig }: { openBotConfig: () => void }) => {
  const { dispatch, getState } = useStore();
  const {
    currentBot,
    currentConversation,
    trainingConversationFetched,
    fetchTrainingConversationError,
  } = getState("Bot");

  useEffect(() => {
    if (
      (!currentConversation || currentConversation.length === 0) &&
      currentBot
    ) {
      // dispatch(startConversation({ botId: currentBot._id }));
      dispatch(getTrainingConversation(currentBot._id));
    }
  }, []);

  useEffect(() => {
    if (trainingConversationFetched) {
      dispatch(resetGetTrainingConversation());
    }
  }, [trainingConversationFetched]);

  useEffect(() => {
    if (fetchTrainingConversationError) {
      // toast.error(fetchTrainingConversationError);
      dispatch(resetGetTrainingConversation());
      if (
        (!currentConversation || currentConversation.length === 0) &&
        currentBot
      ) {
        dispatch(startConversation({ botId: currentBot._id }));
      }
    }
  }, [fetchTrainingConversationError]);

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
