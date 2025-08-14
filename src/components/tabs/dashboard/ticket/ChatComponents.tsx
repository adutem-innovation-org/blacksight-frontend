import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { TicketRoleEnum, TicketStatus } from "@/enums";
import { useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";
import { useStore } from "@/hooks";
import { replyTicket, resetReplyTicket } from "@/store";
import { Send } from "lucide-react";
import { Button } from "@/components/form";
import { Spinner } from "@/components/progress";
import toast from "react-hot-toast";

export const MessageBox = () => {
  const [message, setMessage] = useState("");
  const { dispatch, getState } = useStore();
  const { currentTicket, replyingTicket, ticketReplied } = getState("Ticket");
  const textareaRef = useRef<any>(null);

  const throttledOnInput = useRef(
    throttle(() => {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight + 25;
    }, 100)
  ).current;

  const updateText = (value: string) => setMessage(value);

  const sendMessage = () => {
    if (currentTicket) {
      dispatch(
        replyTicket({
          ticketId: currentTicket._id,
          message,
        })
      );
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      if (message.trim().length > 0) {
        if (currentTicket) {
          dispatch(
            replyTicket({
              ticketId: currentTicket._id,
              message,
            })
          );
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
    if (ticketReplied) {
      toast.success("Message sent!");
      setMessage("");
      dispatch(resetReplyTicket());
    }
  }, [ticketReplied]);

  console.log(ticketReplied);

  return (
    <div className="w-full bg-white shadow-2xl min-h-15 flex flex-col p-2">
      <textarea
        className="resize-none flex-1 bg-transparent px-2 no-scrollbar mt-2 bg-none outline-none border-none min-h-12"
        placeholder="Type your message..."
        ref={textareaRef}
        value={message}
        onChange={(e: any) => {
          updateText(e.target.value);
          updateTextareaHeight(e.target);
        }}
        disabled={replyingTicket}
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
          className="bg-indigo-500 rounded-full h-13 w-13 aspect-square cursor-pointer hover:bg-indigo-500/70"
          size={"icon"}
          onClick={sendMessage}
          disabled={
            message.trim().length === 0 ||
            currentTicket?.status === TicketStatus.CLOSED
          }
        >
          {replyingTicket ? <Spinner /> : <Send className="!w-6 !h-6" />}
        </Button>
      </div>
    </div>
  );
};

export const Message = ({
  role,
  content,
}: {
  role: TicketRoleEnum;
  content: string;
}) => {
  const isUser = role === TicketRoleEnum.USER;

  return (
    <div
      className={cn(
        "flex items-start max-w-9/10 sm:max-w-2/3 opacity-0",
        {
          "self-start justify-start": isUser,
          "self-end justify-end": !isUser,
        },
        isUser ? "fade-in-left" : "fade-in-right"
      )}
    >
      {/* Arrow */}
      <div
        className={cn("w-0 h-0 border-4", {
          "border-b-transparent border-t-white border-r-white border-l-transparent":
            isUser,
          "border-b-transparent border-t-white border-l-white border-r-transparent order-7":
            !isUser,
        })}
      ></div>

      {/* Text */}
      <div
        className={cn(
          "p-4 bg-white text-xs sm:text-sm whitespace-pre-line break-words",
          {
            "rounded-md rounded-tl-none shadow-[2px_2px_4px_#0000001a]": isUser,
            "rounded-md rounded-tr-none shadow-[-2px_2px_4px_#0000001a]":
              !isUser,
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
