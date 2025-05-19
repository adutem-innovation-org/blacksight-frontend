import { Button } from "@/components/form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Bot } from "@/interfaces";
import { botSchema } from "@/schemas";
import { useFormik } from "formik";
import { Upload, X } from "lucide-react";
import styled from "styled-components";

interface SheetHeaderCompProps {
  currentBot: Bot;
  onOpenChange: (value: boolean) => void;
}

const SheetHeaderComp = ({
  currentBot,
  onOpenChange,
}: SheetHeaderCompProps) => {
  return (
    <CustomSheetHeader className="flex p-8 justify-between items-center flex-row border-b border-b-gray-100">
      <div>
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          {currentBot.name}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Bot name</p>
      </div>
      <div className="custom">
        <p className="font-urbanist font-semibold text-gray-900 text-2xl capitalize">
          {currentBot.status}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Status</p>
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

const badgeVariantMap: Record<string, any> = {
  Active: "success",
  Inactive: "gray",
  Failed: "error",
};

interface BotConfigDrawerProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  currentBot: Bot;
}

export function BotConfigDrawer({
  isOpen,
  onOpenChange,
  currentBot,
}: BotConfigDrawerProps) {
  const initialValues = {
    knowledgeBaseId: currentBot.knowledgeBaseId,
    scheduleMeeting: currentBot.scheduleMeeting,
    meetingProviderId: currentBot.meetingProviderId,
    welcomeMessage:
      currentBot?.welcomeMessage ?? "Hello there.\nHow can I help you today?",
  };

  const validations = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: botSchema(),
    onSubmit: (values) => {},
  });

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={true}>
      <CustomSheetContent className="rounded-2xl p-0 gap-8">
        <SheetHeaderComp currentBot={currentBot} onOpenChange={onOpenChange} />
        <div className="px-8">
          <p className="font-urbanist font-semibold text-lg text-gray-900">
            Bot configuration
          </p>
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

const CustomRow = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;
