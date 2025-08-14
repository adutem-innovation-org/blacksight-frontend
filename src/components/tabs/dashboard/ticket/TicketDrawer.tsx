import { Button } from "@/components/form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { X } from "lucide-react";
import styled from "styled-components";
import { InvoiceCard } from "@/components/cards";
import { useStore } from "@/hooks";
import { removeOpenedTicket } from "@/store";
import { DialogOverlay } from "@/components/ui/dialog";
import { Message, MessageBox } from "./ChatComponents";
import { TicketStatus } from "@/enums";

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
            <div className="text-center font-urbanist text-sm text-gray-400 mt-4 font-medium h-20 flex-1">
              No messages
            </div>
          )}

          {currentTicket?.status !== TicketStatus.CLOSED ? (
            <MessageBox />
          ) : (
            <div className="pb-6">
              <h2 className="font-dmsans tracking-tight text-lg text-gray-900 font-semibold pt-6 border-t px-4 sm:px-8 text-center">
                This ticket is already closed!
              </h2>
            </div>
          )}
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
