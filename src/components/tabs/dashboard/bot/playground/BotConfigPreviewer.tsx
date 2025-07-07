import { Button } from "@/components/form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Bot } from "@/interfaces";
import { Badge } from "@/components/badge";
import { X } from "lucide-react";
import styled from "styled-components";
import { InvoiceCard } from "@/components/cards";

interface SheetHeaderCompProps {
  botDetails: Bot;
  onOpenChange: (value: boolean) => void;
}

const SheetHeaderComp = ({
  botDetails,
  onOpenChange,
}: SheetHeaderCompProps) => {
  return (
    <CustomSheetHeader className="flex p-8 justify-between items-center flex-row border-b border-b-gray-100">
      <div>
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          {botDetails?._id}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Bot ID</p>
      </div>
      <div className="custom">
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          {botDetails?.isActive ? "Active" : "Inactive"}
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

interface BotConfigPreviewerProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  botDetails: Bot;
}

export const BotConfigPreviewer = ({
  isOpen,
  onOpenChange,
  botDetails,
}: BotConfigPreviewerProps) => {
  const connectedKBs = botDetails?.knowledgeBases ?? [];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <CustomSheetContent className="rounded-2xl p-0">
        <SheetHeaderComp botDetails={botDetails} onOpenChange={onOpenChange} />
        <div>
          <div className="px-8 pb-4 mt-10 flex justify-between items-end">
            <p className="font-urbanist font-semibold text-lg text-gray-900">
              Bot configurations
            </p>
          </div>

          {/* Reminder Details */}
          <div className="px-8">
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Status</p>
              <Badge
                variant={
                  badgeVariantMap[
                    (botDetails?.isActive
                      ? "Active"
                      : "Inactive") as keyof typeof badgeVariantMap
                  ]
                }
                className="font-sfpro-medium"
                size={"sm"}
              >
                {botDetails?.isActive ? "Active" : "Inactive"}
              </Badge>
            </CustomRow>

            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Created At</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {new Date(botDetails?.createdAt).toLocaleString()}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Bot ID</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {botDetails?._id}
              </p>
            </CustomRow>
            <CustomRow className="no-border border-none">
              <p className="font-sfpro text-sm text-gray-900">Name</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {botDetails?.name}
              </p>
            </CustomRow>

            <h2 className="font-urbanist text-lg text-gray-900 font-semibold pt-6 border-t">
              Connected KBS
            </h2>
            {connectedKBs.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {connectedKBs.map((kb) => (
                  <InvoiceCard header={kb.tag} content={kb._id} />
                ))}
              </div>
            ) : (
              <div className="text-center font-urbanist text-sm text-gray-400 mt-4 font-medium">
                No connected Knowledge base
              </div>
            )}
          </div>
        </div>
      </CustomSheetContent>
    </Sheet>
  );
};

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
