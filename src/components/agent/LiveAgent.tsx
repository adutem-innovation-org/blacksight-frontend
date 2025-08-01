import {
  askAgent,
  connectAgent,
  newEnquiry,
  resetTranscribeSpeech,
  setAgentConnectionError,
} from "@/store";
import { Fragment, use, useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@/hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { RoleEnum } from "@/enums";
import { Loader } from "../progress";
import { Mic, Send } from "lucide-react";
import { Button } from "../form";
import throttle from "lodash.throttle";
import { useRecorder } from "@/hooks";
import { getOrCreateSessionId } from "@/helpers";
import { VoiceChatRecorder } from "../media";
import toast from "react-hot-toast";

const AgentHeader = ({ agentName }: { agentName: string }) => {
  return (
    <div className="bg-transparent p-4 pt-4 pb-4">
      <div className="flex items-center justify-between">
        <p className="tracking-tight font-dmsans text-white">{agentName}</p>
      </div>
    </div>
  );
};

const Promper = ({
  recording,
  launchRecorder,
}: {
  recording: boolean;
  launchRecorder: () => void;
}) => {
  const { dispatch, getState } = useStore();
  const {
    askingAgent,

    agentData,
    sessionId,

    // speech to text
    transcribingSpeech,
    speechTranscribed,
    transcribedText,
    transcribeSpeechError,
  } = getState("Agent");
  const [message, setMessage] = useState("");
  const textareaRef = useRef<any>(null);

  const throttledOnInput = useRef(
    throttle(() => {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight + 25;
    }, 100)
  ).current;

  const updateText = (value: string) => setMessage(value);

  const sendMessage = () => {
    if (sessionId && agentData) {
      dispatch(
        newEnquiry({
          role: RoleEnum.USER,
          content: message,
        })
      );
      const askAgentTmo = setTimeout(() => {
        dispatch(
          askAgent({
            userQuery: message,
          })
        );
        setMessage("");
        clearTimeout(askAgentTmo);
      }, 300);
    }
  };

  const handleKeyPress = (e: any) => {
    if (askingAgent || recording || transcribingSpeech) {
      return;
    }
    if (e.key === "Enter") {
      if (message.trim().length > 0) {
        if (sessionId && agentData) {
          dispatch(
            newEnquiry({
              role: RoleEnum.USER,
              content: message,
            })
          );
          let askChatbotTmo = setTimeout(() => {
            dispatch(
              askAgent({
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

  function getCursorPos(input: any) {
    if ("selectionStart" in input && document.activeElement == input) {
      return {
        start: input.selectionStart,
        end: input.selectionEnd,
      };
    } else if (input.createTextRange) {
      const doc = document as any;
      var sel = doc.selection.createRange();
      if (sel.parentElement() === input) {
        var rng = input.createTextRange();
        rng.moveToBookmark(sel.getBookmark());
        for (
          var len = 0;
          rng.compareEndPoints("EndToStart", rng) > 0;
          rng.moveEnd("character", -1)
        ) {
          len++;
        }
        rng.setEndPoint("StartToStart", input.createTextRange());
        for (
          var pos = { start: 0, end: len };
          rng.compareEndPoints("EndToStart", rng) > 0;
          rng.moveEnd("character", -1)
        ) {
          pos.start++;
          pos.end++;
        }
        return pos;
      }
    }
    return {
      start: -1,
      end: -1,
    };
  }

  function setCursorPos(input: any, start: number, end: number) {
    if (arguments.length < 3) end = start;
    if ("selectionStart" in input) {
      setTimeout(function () {
        input.selectionStart = start;
        input.selectionEnd = end;
      }, 1);
    } else if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(start, end);
    } else if (input.createTextRange) {
      var rng = input.createTextRange();
      rng.moveStart("character", start);
      rng.collapse();
      rng.moveEnd("character", end - start);
      rng.select();
    }
  }

  const updateTextareaHeight = (input: any) => {
    const { width } = input.getBoundingClientRect();
    const paraEl = document.createElement("p");
    paraEl.style.width = `${width}px`;
    paraEl.style.maxWidth = `${width}px`;
    paraEl.style.height = "auto";
    paraEl.innerHTML = input.value.replace(/\n/gm, "<br/>");
    document.body.append(paraEl);
    const { height: pHeight } = paraEl.getBoundingClientRect();
    input.style.height = `${Math.min(pHeight + 25, 120)}px`;
    document.body.removeChild(paraEl);
  };

  useEffect(() => {
    updateTextareaHeight(textareaRef.current);
  }, [message]);

  useEffect(() => {
    if (speechTranscribed) {
      if (transcribedText.trim().length > 0) setMessage(transcribedText.trim());
      dispatch(resetTranscribeSpeech());
    }
  }, [speechTranscribed]);

  useEffect(() => {
    if (transcribeSpeechError) {
      toast.error(transcribeSpeechError);
      dispatch(resetTranscribeSpeech());
    }
  }, [transcribeSpeechError]);

  return (
    <div className="rounded-3xl w-full bg-white shadow-2xl min-h-15 flex flex-col p-2">
      <textarea
        className="resize-none flex-1 bg-transparent px-2 no-scrollbar mt-2 bg-none outline-none border-none min-h-12 !text-sm"
        placeholder="Type your message..."
        ref={textareaRef}
        value={message}
        onChange={(e: any) => {
          updateText(e.target.value);
          updateTextareaHeight(e.target);
        }}
        onInput={() => throttledOnInput()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (e.shiftKey) {
              e.preventDefault();
              const value = e.currentTarget.value;
              const { start, end } = getCursorPos(e.target);
              if (end === -1) return true;
              const leftSide = value.substring(0, start);
              const rightSide = value.substring(end);
              updateText(leftSide + "\n" + rightSide);
              setCursorPos(e.target, start + 1, start + 1);
              e.currentTarget.scrollTop = e.currentTarget.scrollHeight + 40;
              return true;
            } else {
              e.preventDefault();
              handleKeyPress(e);
            }
          }
        }}
      />

      <div className="flex justify-end items-center">
        <Button
          className="bg-transparent rounded-full h-10 w-10 aspect-square cursor-pointer hover:bg-gray-100 text-black mr-2"
          size={"icon"}
          onClick={launchRecorder}
          disabled={recording || transcribingSpeech}
        >
          <Mic className="!w-4 !h-4" />
        </Button>
        <Button
          className="bg-indigo-500 rounded-full h-10 w-10 aspect-square cursor-pointer hover:bg-indigo-500/70"
          size={"icon"}
          onClick={sendMessage}
          disabled={askingAgent || recording || transcribingSpeech}
        >
          <Send className="!w-4 !h-4" />
        </Button>
      </div>
    </div>
  );
};

export const Message = ({
  role,
  content,
  isError,
}: {
  role: RoleEnum;
  content: string;
  isError?: boolean;
}) => {
  const isBot = role === RoleEnum.ASSISTANT;

  return (
    <div
      className={cn(
        // "flex items-start max-w-9/10 sm:max-w-2/3 opacity-0",
        "flex items-start max-w-9/10",
        {
          "self-start justify-start": isBot,
          "self-end justify-end": !isBot,
        }
        // isBot ? "fade-in-left" : "fade-in-right"
      )}
    >
      {/* Arrow */}
      <div
        className={cn("w-0 h-0 border-4", {
          "border-b-transparent border-t-primary border-r-primary border-l-transparent":
            isBot,
          "border-b-transparent border-t-brand border-l-brand border-r-transparent order-7":
            !isBot,
        })}
      ></div>

      {/* Text */}
      <div
        className={cn(
          "p-4 bg-brand text-white text-xs sm:text-sm whitespace-pre-line break-words",
          {
            "rounded-3xl rounded-tl-none shadow-[2px_2px_4px_#0000001a] bg-primary text-white":
              isBot,
            "rounded-3xl rounded-tr-none shadow-[-2px_2px_4px_#0000001a]":
              !isBot,
            "text-destructive": isError,
          }
        )}
      >
        <ReactMarkdown
          skipHtml
          components={{
            ul: ({ node, className, ...props }) => (
              <ul
                {...props}
                className={cn(
                  className,
                  "list-disc list-inside flex flex-col gap-1"
                )}
              />
            ),
            p: ({ node, className, ...props }) => (
              <p
                {...props}
                className={cn(className, "whitespace-normal break-words")}
                style={{ wordBreak: "break-word" }}
              />
            ),
          }}
          children={content}
          // remarkPlugins={[remarkBreaks]}
        />
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
          "w-0 h-0 border-4 border-b-transparent border-t-primary border-r-primary border-l-transparent"
        )}
      ></div>

      {/* Typing animation */}
      <div
        className={cn(
          "p-4 py-2 bg-primary text-white text-xs rounded-2xl rounded-tl-none shadow-[2px_2px_4px_#0000001a] italic"
        )}
      >
        Typing...
      </div>
    </div>
  );
};

const Conversations = ({
  chatHistory,
  recording,
  launchRecorder,
}: {
  chatHistory: any[] | null;
  recording: boolean;
  launchRecorder: () => void;
}) => {
  const conversationContainerRef = useRef<any>(null);
  const { getState } = useStore();
  const { askingAgent } = getState("Agent");
  const typing = askingAgent;

  const scrollToBottom = useCallback(() => {
    const containerRef = conversationContainerRef.current;
    if (containerRef) {
      containerRef.scrollTop = containerRef.scrollHeight + 1000;
    }
  }, [conversationContainerRef]);

  useEffect(() => {
    if ((chatHistory || []).length > 1 || typing) {
      scrollToBottom();
    }
  }, [chatHistory, typing]);

  return (
    <div className="bg-gray-100 flex-1 rounded-[28px] flex flex-col justify-end p-4 gap-4 overflow-hidden relative">
      <Fragment>
        <div
          className="flex-1 overflow-auto no-scrollbar py-4" // Removed scroll-smooth
          ref={conversationContainerRef}
        >
          <div className="flex flex-col gap-3 w-full overflow-x-hidden pb-4">
            {(chatHistory || []).map((message) => (
              <Message {...message} />
            ))}
            {typing && <Typing />}
          </div>
        </div>
        <Promper recording={recording} launchRecorder={launchRecorder} />
      </Fragment>
    </div>
  );
};

const AgentInitState = ({
  state,
  shouldDisplayFixed,
}: {
  state: string;
  shouldDisplayFixed: boolean;
}) => {
  return (
    <div
      className={cn(
        "w-full h-[90vh] min-h-[400px] max-h-[600px] rounded-4xl bg-white shadow-2xl drop-shadow-2xl",
        {
          "w-[90%] min-w-[250px] max-w-[450px] h-full fixed bottom-[40px] right-[5%] sm:right-[40px] z-[1000000]":
            shouldDisplayFixed,
        }
      )}
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-6 overflow-hidden">
        {/* Fade + Slide Nova AI */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Nova AI
        </motion.h2>

        {/* Fade + Slide Lottie */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-50 h-50"
        >
          <DotLottieReact src={"./lotties/Chat.lottie"} loop autoplay />
        </motion.div>

        {/* Typing Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg italic bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          <Typewriter
            words={[state]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={1000}
          />
        </motion.p>
      </div>
    </div>
  );
};

const AgentConnectionError = ({
  connectionError,
  shouldDisplayFixed,
}: {
  connectionError: string;
  shouldDisplayFixed: boolean;
}) => {
  return (
    <div
      className={cn(
        "w-full h-[90vh] min-h-[400px] max-h-[600px] rounded-4xl bg-white shadow-2xl drop-shadow-2xl",
        {
          "w-[90%] min-w-[250px] max-w-[450px] h-full fixed bottom-[40px] right-[5%] sm:right-[40px] z-[1000000]":
            shouldDisplayFixed,
        }
      )}
    >
      <div className="w-full h-full flex flex-col  justify-start gap-3 overflow-hidden p-4">
        <div className="flex items-center self-start gap-4">
          {/* Scale + Fade Lottie */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-10 h-10 rounded-full border gap-2"
          >
            <DotLottieReact src={"./lotties/Chat.lottie"} loop autoplay />
          </motion.div>

          {/* Slide from Left + Fade */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Nova AI
          </motion.h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <motion.p
            className="text-destructive font-medium bg-white px-4 py-2 rounded-xl border border-gray-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connection error
          </motion.p>
          <motion.p
            className="text-destructive text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {connectionError}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

type LiveAgentProps = {
  apiKey: string;
  agentId: string;
  shouldDisplayFixed?: boolean;
};

export const LiveAgent = ({
  apiKey,
  agentId,
  shouldDisplayFixed = true,
}: LiveAgentProps) => {
  const { getState, dispatch } = useStore();
  const {
    connected,
    connecting,
    connectionError,
    agentData,
    chatHistory,
    transcribingSpeech,
  } = getState("Agent");
  const {
    recording,
    launchRecorder,
    isRecorderOpen,
    startRecording,
    endRecording,
    cancelRecording,
    canvasRef,
  } = useRecorder();

  useEffect(() => {
    const init = () => {
      if (!apiKey) {
        return dispatch(
          setAgentConnectionError("Connection error. Missing API key.")
        );
      }

      if (!agentId) {
        return dispatch(
          setAgentConnectionError("Connection error. Missing agent ID.")
        );
      }
    };

    init();
  }, [apiKey, agentId]);

  useEffect(() => {
    if (apiKey && agentId && !connected) {
      const sessionId = getOrCreateSessionId();

      const timeout = setTimeout(() => {
        dispatch(connectAgent({ apiKey, agentId, sessionId }));
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [apiKey, agentId]);

  // Speech to text
  useEffect(() => {
    if (isRecorderOpen) {
      startRecording();
    }
  }, [isRecorderOpen]);

  if (!connected && !connectionError)
    return (
      <AgentInitState
        state={connecting ? "Connecting..." : "Initializing..."}
        shouldDisplayFixed={shouldDisplayFixed}
      />
    );

  if (connectionError)
    return (
      <AgentConnectionError
        connectionError={connectionError}
        shouldDisplayFixed={shouldDisplayFixed}
      />
    );

  if (!agentData)
    return (
      <AgentConnectionError
        connectionError={"It looks like this agent is not properly configured."}
        shouldDisplayFixed={shouldDisplayFixed}
      />
    );

  return (
    <div
      className={cn(
        "w-full h-[90dvh] min-h-[400px] max-h-[600px] rounded-4xl bg-white shadow-2xl drop-shadow-2xl flex flex-col overflow-hidden",
        {
          "w-[90%] min-w-[250px] max-w-[450px] h-full fixed bottom-[40px] right-[5%] sm:right-[40px] z-[1000000]":
            shouldDisplayFixed,
        }
      )}
    >
      <div className="bg-white bg-linear-to-br from-indigo-500 to-sky-500 shadow-[0px_4px_16px_0px_#0000001f] rounded-4xl overflow-hidden w-full flex-1 p-1 flex flex-col">
        <AgentHeader agentName={agentData.name} />
        <Conversations
          recording={recording}
          launchRecorder={launchRecorder}
          chatHistory={chatHistory}
        />
        {isRecorderOpen && (
          <VoiceChatRecorder
            canvasRef={canvasRef}
            endRecording={endRecording}
            cancelRecording={cancelRecording}
            transcribing={transcribingSpeech}
          />
        )}
      </div>
    </div>
  );
};
