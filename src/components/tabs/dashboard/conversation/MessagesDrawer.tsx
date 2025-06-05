import { Button } from "@/components/form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Conversation } from "@/interfaces";
import { X } from "lucide-react";
import styled from "styled-components";
import { InvoiceCard } from "@/components/cards";
import { Message } from "../bot";

interface SheetHeaderCompProps {
  conversationId: string;
  onOpenChange: (value: boolean) => void;
}

const SheetHeaderComp = ({
  conversationId,
  onOpenChange,
}: SheetHeaderCompProps) => {
  return (
    <CustomSheetHeader className="flex p-8 justify-between items-center flex-row border-b border-b-gray-100">
      <div>
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          {conversationId}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Chat</p>
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

interface conversationDrawerProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  conversation: Conversation;
}

export function ConversationDrawer({
  isOpen,
  onOpenChange,
  conversation,
}: conversationDrawerProps) {
  const messages = conversation?.messages ?? [];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <CustomSheetContent className="rounded-2xl p-0 flex flex-col gap-0">
        <SheetHeaderComp
          conversationId={conversation?.conversationId}
          onOpenChange={onOpenChange}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          {messages.length > 0 ? (
            <div className="flex-1 overflow-auto no-scrollbar p-4 scroll-smooth bg-gray-100">
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <Message {...message} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center font-urbanist text-sm text-gray-400 mt-4 font-medium">
              No messages
            </div>
          )}

          <div className="pb-6">
            <h2 className="font-urbanist text-lg text-gray-900 font-semibold pt-6 border-t px-8">
              Source bot
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4 px-8">
              <InvoiceCard header={"Chat bot"} content={conversation?.botId} />
            </div>
          </div>
        </div>
      </CustomSheetContent>
    </Sheet>
  );
}

const CustomSheetContent = styled(SheetContent)`
  height: 95%;
  align-self: center;
  margin-right: 1.5rem;
  min-width: 660px;
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
