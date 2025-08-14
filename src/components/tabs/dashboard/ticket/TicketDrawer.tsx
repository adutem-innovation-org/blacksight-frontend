import { Button } from "@/components/form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Ticket } from "@/interfaces";
import { X } from "lucide-react";
import styled from "styled-components";
import { InvoiceCard } from "@/components/cards";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { cn } from "@/lib/utils";
import { TicketRoleEnum } from "@/enums";
import { useStore } from "@/hooks";
import { removeOpenedTicket } from "@/store";
import { DialogOverlay } from "@/components/ui/dialog";
import patternBg from "@/assets/images/pattern-01.png";

interface SheetHeaderCompProps {
  onOpenChange: (value: boolean) => void;
}

const SheetHeaderComp = ({ onOpenChange }: SheetHeaderCompProps) => {
  const { currentTicket } = useStore().getState("Ticket");

  return (
    <CustomSheetHeader className="flex p-8 justify-between items-center flex-row border-b border-b-gray-100">
      <div>
        <h4 className="font-medium tracking-tight font-dmsans">
          {currentTicket?.customerName}
        </h4>
        <p className="font-dmsans font-light tracking-tight text-sm text-gray-400">
          {currentTicket?.customerEmail}
        </p>
      </div>

      <div className="custom">
        <Button
          variant={"secondary_gray"}
          size={"icon"}
          className="border-none rounded-full bg-gray-100 cursor-pointer"
          onClick={() => onOpenChange(false)}
        >
          <X />
        </Button>
      </div>
    </CustomSheetHeader>
  );
};

export function TicketDrawer() {
  const { dispatch, getState } = useStore();
  const { currentTicket } = getState("Ticket");
  const messages = currentTicket?.messages ?? [];

  const isOpen = !!currentTicket;

  const onOpenChange = () => {
    dispatch(removeOpenedTicket());
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset bg-black/40 backdrop-blur-[2px]" />
      <CustomSheetContent className="!rounded-none p-0 flex flex-col gap-0 !w-[calc(100dvw-24px)] sm:!w-[calc(100dvw-48px)] !max-w-[700px] !min-w-auto !m-0 !my-0">
        <SheetHeaderComp onOpenChange={onOpenChange} />
        <div className="flex flex-col flex-1 overflow-hidden">
          {messages.length > 0 ? (
            <div className="flex-1 overflow-auto no-scrollbar p-4 scroll-smooth bg-gray-100 bg-[url('@/assets/images/pattern-01.png')]">
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <Message {...message} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center font-urbanist text-sm text-gray-400 mt-4 font-medium h-20">
              No messages
            </div>
          )}

          <div className="pb-6">
            <h2 className="font-urbanist text-lg text-gray-900 font-semibold pt-6 border-t px-4 sm:px-8">
              Source bot
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 px-4 sm:px-8">
              <InvoiceCard
                header={"Chat bot"}
                content={currentTicket?.bot?.name ?? "Deleted bot"}
              />
            </div>
          </div>
        </div>
      </CustomSheetContent>
    </Sheet>
  );
}

const CustomSheetContent = styled(SheetContent)`
  align-self: center;
  margin-right: 1.5rem;
  box-shadow: 0px 4px 16px #0000001f;

  & > button:not(.custom) {
    display: none;
  }
`;

const CustomSheetHeader = styled(SheetHeader)`
  & > div {
    margin: 0px !important;
  }
`;

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
