import { Button } from "@/components/form";
import { VoiceChatRecorder } from "@/components/media";
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
  resetSpeechToText,
  speechToText,
  startConversation,
} from "@/store";
import { Mic, Send, Settings2 } from "lucide-react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import throttle from "lodash.throttle";

const ChatBotHeader = ({
  currentBot,
  openBotConfig,
}: {
  currentBot: Bot;
  openBotConfig: () => void;
}) => {
  return (
    <div className="bg-transparent p-4 pt-4 pb-4">
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

const Promper = ({
  recording,
  launchRecorder,
}: {
  recording: boolean;
  launchRecorder: () => void;
}) => {
  const { dispatch, getState } = useStore();
  const {
    askingChatbot,
    startConversationError,
    startingConversation,
    currentBot,
    currentConversationId,

    // speech to text
    transcribingSpeech,
    speechTranscribed,
    transcribedText,
  } = getState("Bot");
  const [message, setMessage] = useState("");
  const textareaRef = useRef<any>(null);

  const throttledOnInput = useRef(
    throttle(() => {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight + 25;
    }, 100)
  ).current;

  const updateText = (value: string) => setMessage(value);

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
    if (
      askingChatbot ||
      startingConversation ||
      startConversationError ||
      recording ||
      transcribingSpeech
    ) {
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
      dispatch(resetSpeechToText());
    }
  }, [speechTranscribed]);

  return (
    <div className="rounded-3xl w-full bg-white shadow-2xl min-h-15 flex flex-col p-2">
      {/* <input
        type="text"
        className="flex-1 bg-transparent p-2 pl-6 bg-none outline-none border-none"
        placeholder="Type your message..."
        value={message}
        onChange={updateText}
        onKeyPress={handleKeyPress}
        disabled={recording || transcribingSpeech}
      /> */}
      <textarea
        className="resize-none flex-1 bg-transparent px-2 no-scrollbar mt-2 bg-none outline-none border-none min-h-12"
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
          className="bg-transparent rounded-full h-12 w-12 aspect-square cursor-pointer hover:bg-gray-100 text-black mr-2"
          size={"icon"}
          onClick={launchRecorder}
          disabled={recording || transcribingSpeech}
        >
          <Mic className="!w-5 !h-5" />
        </Button>
        <Button
          className="bg-indigo-500 rounded-full h-13 w-13 aspect-square cursor-pointer hover:bg-indigo-500/70"
          size={"icon"}
          onClick={sendMessage}
          disabled={
            !!startConversationError ||
            askingChatbot ||
            startingConversation ||
            recording ||
            transcribingSpeech
          }
        >
          <Send className="!w-6 !h-6" />
        </Button>
      </div>
    </div>
  );
};

export const Message = ({
  role,
  content,
}: {
  role: RoleEnum;
  content: string;
}) => {
  const isBot = role === RoleEnum.ASSISTANT;

  return (
    <div
      className={cn(
        "flex items-start max-w-9/10 sm:max-w-2/3 opacity-0",
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
        className={cn(
          "p-4 bg-white text-xs sm:text-sm whitespace-pre-line break-words",
          {
            "rounded-md rounded-tl-none shadow-[2px_2px_4px_#0000001a]": isBot,
            "rounded-md rounded-tr-none shadow-[-2px_2px_4px_#0000001a]":
              !isBot,
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
  recording,
  launchRecorder,
}: {
  currentConversation: any[] | null;
  recording: boolean;
  launchRecorder: () => void;
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
            <div className="flex flex-col gap-3 w-full overflow-x-hidden">
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
          <Promper recording={recording} launchRecorder={launchRecorder} />
        </Fragment>
      )}
    </div>
  );
};

export const ChatBot = ({ openBotConfig }: { openBotConfig: () => void }) => {
  const { dispatch, getState } = useStore();
  const [recording, setRecording] = useState(false);
  const [isRecorderOpen, setIsRecordOpen] = useState(false);
  const wasCancelledRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const {
    currentBot,
    currentConversation,
    trainingConversationFetched,
    fetchTrainingConversationError,

    // Speech to text
    speechTranscribed,
    transcribeSpeechError,
    transcribingSpeech,
  } = getState("Bot");

  const launchRecorder = () => {
    setIsRecordOpen(true);
  };

  const startRecording = async () => {
    wasCancelledRef.current = false;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.fftSize = 512;

    drawBarWaveform();

    const mimeType = "audio/webm;codecs=opus";
    const isSupported = MediaRecorder.isTypeSupported(mimeType);

    const recorder = isSupported
      ? new MediaRecorder(stream, { mimeType })
      : new MediaRecorder(stream); // fallback to browser default

    audioChunksRef.current = [];

    recorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      if (wasCancelledRef.current) {
        audioChunksRef.current = []; // Just to be sure;
        return;
      }

      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const formData = new FormData();
      formData.append("speech-file", audioBlob, "voice.webm");
      formData.append("botId", currentBot?._id!);

      dispatch(speechToText(formData));
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setRecording(true);
  };

  const endRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    setRecording(false);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    analyserRef.current?.disconnect();
    sourceRef.current?.disconnect();
    audioContextRef.current?.close();

    // setIsRecordOpen(false); // Don't close recorder yet
  };

  const cancelRecording = () => {
    wasCancelledRef.current = true;
    audioChunksRef.current = []; // Clear the chunks

    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop(); // Still need to stop to release stream
    }

    setRecording(false);
    setIsRecordOpen(false);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    analyserRef.current?.disconnect();
    sourceRef.current?.disconnect();
    audioContextRef.current?.close();
  };

  const drawBarWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyserRef.current!.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = 2;
      const gap = 1;
      const barCount = Math.floor(canvas.width / (barWidth + gap));
      const step = Math.floor(bufferLength / barCount);

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i * step];
        const barHeight = (value / 255) * canvas.height;
        const x = i * (barWidth + gap);
        // const y = canvas.height - barHeight;
        const y = canvas.height / 2 - barHeight / 2;

        ctx.fillStyle = "#ffffff"; // or any desired bar color
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animationRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  // Speech to text
  useEffect(() => {
    if (isRecorderOpen) {
      startRecording();
    }
  }, [isRecorderOpen]);

  useEffect(() => {
    setIsRecordOpen(false);
  }, [speechTranscribed]);

  useEffect(() => {
    setIsRecordOpen(false);
    dispatch(resetSpeechToText());
  }, [transcribeSpeechError]);

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
    <div className="flex flex-col col-span-2">
      <div className="h-10">
        <p className="text-2xl font-dmsans tracking-tight">Chatbot Agent</p>
      </div>
      <div className="bg-white bg-linear-to-br from-indigo-500 to-sky-500 shadow-[0px_4px_16px_0px_#0000001f] rounded-4xl overflow-hidden w-full flex-1 p-1 flex flex-col">
        <ChatBotHeader currentBot={currentBot!} openBotConfig={openBotConfig} />
        <Conversations
          currentConversation={currentConversation}
          recording={recording}
          launchRecorder={launchRecorder}
        />
        {isRecorderOpen && (
          <VoiceChatRecorder
            canvasRef={canvasRef}
            endRecording={endRecording}
            cancelRecording={cancelRecording}
          />
        )}
      </div>
    </div>
  );
};
