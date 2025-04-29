import { Button } from "@/components/form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Reminder } from "@/interfaces";
import { Badge } from "@/components/badge";
import { Download, X } from "lucide-react";
import styled from "styled-components";
import { ClientCard, InvoiceCard } from "@/components/cards";

interface SheetHeaderCompProps {
  reminderDetails: Reminder;
  onOpenChange: (value: boolean) => void;
}

const SheetHeaderComp = ({
  reminderDetails,
  onOpenChange,
}: SheetHeaderCompProps) => {
  return (
    <CustomSheetHeader className="flex p-8 justify-between items-center flex-row border-b border-b-gray-100">
      <div>
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          {reminderDetails?._id}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Reminder ID</p>
      </div>
      <div className="custom">
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          {reminderDetails?.isActive ? "Active" : "Inactive"}
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

interface ReminderDetailsDrawerProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  reminderDetails: Reminder;
}

export function ReminderDetailsDrawer({
  isOpen,
  onOpenChange,
  reminderDetails,
}: ReminderDetailsDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <CustomSheetContent className="rounded-2xl p-0">
        <SheetHeaderComp
          reminderDetails={reminderDetails}
          onOpenChange={onOpenChange}
        />
        <div>
          <div className="px-8 pb-4 mt-10 flex justify-between items-end">
            <p className="font-urbanist font-semibold text-lg text-gray-900">
              Reminder details
            </p>
            <Button variant={"outline"}>
              <Download className="text-gray-800 outine-gray-800" />
              <p className="font-sfpro-medium text-sm text-gray-800">Resend</p>
            </Button>
          </div>

          {/* Reminder Details */}
          <div className="px-8">
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Reminder type</p>
              <p className="font-sfpro-medium text-sm text-gray-900 capitalize">
                {reminderDetails?.type}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Status</p>
              <Badge
                variant={
                  badgeVariantMap[
                    (reminderDetails?.isActive
                      ? "Active"
                      : "Inactive") as keyof typeof badgeVariantMap
                  ]
                }
                className="font-sfpro-medium"
                size={"sm"}
              >
                {reminderDetails?.isActive ? "Active" : "Inactive"}
              </Badge>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">
                Reminder Channel
              </p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {reminderDetails?.channel}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Reminder Date</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {reminderDetails?.remindAt}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Reminder Volue</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {reminderDetails?.isBulk ? "Bulk" : "Single"}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Reminder ID</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {reminderDetails?._id}
              </p>
            </CustomRow>
            <CustomRow className="no-border border-none">
              <p className="font-sfpro text-sm text-gray-900">Tag</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {reminderDetails?.tag}
              </p>
            </CustomRow>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <InvoiceCard
                header="Reminder ID"
                content={reminderDetails?._id}
              />
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

const CustomRow = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;
