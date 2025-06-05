import { Button } from "@/components/form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { KnowledgeBase } from "@/interfaces";
import { Badge } from "@/components/badge";
import { Download, X } from "lucide-react";
import styled from "styled-components";
import { InvoiceCard } from "@/components/cards";

interface SheetHeaderCompProps {
  knowledgeBaseDetails: KnowledgeBase;
  onOpenChange: (value: boolean) => void;
}

const SheetHeaderComp = ({
  knowledgeBaseDetails,
  onOpenChange,
}: SheetHeaderCompProps) => {
  return (
    <CustomSheetHeader className="flex p-8 justify-between items-center flex-row border-b border-b-gray-100">
      <div>
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          {knowledgeBaseDetails?._id}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Knowledge Base ID</p>
      </div>
      <div className="custom">
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          {knowledgeBaseDetails?.isActive ? "Active" : "Inactive"}
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

interface KnowledgeBaseDetailsDrawerProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  knowledgeBaseDetails: KnowledgeBase;
}

export function KnowledgeBaseDetailsDrawer({
  isOpen,
  onOpenChange,
  knowledgeBaseDetails,
}: KnowledgeBaseDetailsDrawerProps) {
  const connectedBots = knowledgeBaseDetails?.connectedBots ?? [];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <CustomSheetContent className="rounded-2xl p-0">
        <SheetHeaderComp
          knowledgeBaseDetails={knowledgeBaseDetails}
          onOpenChange={onOpenChange}
        />
        <div>
          <div className="px-8 pb-4 mt-10 flex justify-between items-end">
            <p className="font-urbanist font-semibold text-lg text-gray-900">
              Knowledge Base details
            </p>
          </div>

          {/* Reminder Details */}
          <div className="px-8">
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Status</p>
              <Badge
                variant={
                  badgeVariantMap[
                    (knowledgeBaseDetails?.isActive
                      ? "Active"
                      : "Inactive") as keyof typeof badgeVariantMap
                  ]
                }
                className="font-sfpro-medium"
                size={"sm"}
              >
                {knowledgeBaseDetails?.isActive ? "Active" : "Inactive"}
              </Badge>
            </CustomRow>

            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Created At</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {new Date(knowledgeBaseDetails?.createdAt).toLocaleString()}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">
                Knowledge Base ID
              </p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {knowledgeBaseDetails?._id}
              </p>
            </CustomRow>
            <CustomRow className="no-border border-none">
              <p className="font-sfpro text-sm text-gray-900">Tag</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {knowledgeBaseDetails?.tag}
              </p>
            </CustomRow>

            <h2 className="font-urbanist text-lg text-gray-900 font-semibold pt-6 border-t">
              Connected Bots
            </h2>
            {connectedBots.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {connectedBots.map((bot) => (
                  <InvoiceCard header={bot.name} content={bot._id} />
                ))}
              </div>
            ) : (
              <div className="text-center font-urbanist text-sm text-gray-400 mt-4 font-medium">
                No connected bots
              </div>
            )}
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

const CustomRow = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;
