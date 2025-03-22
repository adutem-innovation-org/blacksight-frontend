import { Button } from "@/components/form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Subscription } from "@/interfaces";
import { Badge } from "@/components/badge";
import { Download, X } from "lucide-react";
import styled from "styled-components";
import { ClientCard, InvoiceCard } from "@/components/cards";

interface SheetHeaderCompProps {
  subscriptionDetails: Subscription;
  onOpenChange: (value: boolean) => void;
}

const SheetHeaderComp = ({
  subscriptionDetails,
  onOpenChange,
}: SheetHeaderCompProps) => {
  return (
    <CustomSheetHeader className="flex p-8 justify-between items-center flex-row border-b border-b-gray-100">
      <div>
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          {subscriptionDetails?.subscriptionId}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Subscription ID</p>
      </div>
      <div className="custom">
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          ₦
          {subscriptionDetails?.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Amount</p>
      </div>
      <div className="custom">
        <Button
          variant={"secondary_gray"}
          size={"icon"}
          className="border-none rounded-full bg-gray-100"
          onClick={() => onOpenChange(false)}
        >
          <X />
        </Button>
      </div>
    </CustomSheetHeader>
  );
};

const badgeVariantMap: Record<string, any> = {
  Paid: "success",
  "In progress": "gray",
  Refunds: "warning",
  Failed: "error",
};

interface SubscriptionDetailsDrawerProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  subscriptionDetails: Subscription;
}

export function SubscriptionDetailsDrawer({
  isOpen,
  onOpenChange,
  subscriptionDetails,
}: SubscriptionDetailsDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <CustomSheetContent className="rounded-2xl p-0">
        <SheetHeaderComp
          subscriptionDetails={subscriptionDetails}
          onOpenChange={onOpenChange}
        />
        <div>
          <div className="px-8 pb-4 mt-10 flex justify-between items-end">
            <p className="font-urbanist font-semibold text-lg text-gray-900">
              Payment details
            </p>
            <Button variant={"outline"}>
              <Download className="text-gray-800 outine-gray-800" />
              <p className="font-sfpro-medium text-sm text-gray-800">Refund</p>
            </Button>
          </div>

          {/* Payment Details */}
          <div className="px-8">
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">
                Subscription type
              </p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {subscriptionDetails?.subscriptionType}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Status</p>
              <Badge
                variant={
                  badgeVariantMap[
                    subscriptionDetails?.status as keyof typeof badgeVariantMap
                  ]
                }
                className="font-sfpro-medium"
                size={"sm"}
              >
                {subscriptionDetails?.status}
              </Badge>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Payment Method</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {subscriptionDetails?.paymentMethod}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Client ID</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {subscriptionDetails?.clientId}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">
                Client IP address
              </p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {subscriptionDetails?.clientIpAddress}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Invoice ID</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {subscriptionDetails?.invoiceId}
              </p>
            </CustomRow>
            <CustomRow className="no-border border-none">
              <p className="font-sfpro text-sm text-gray-900">Description</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {subscriptionDetails?.description}
              </p>
            </CustomRow>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <InvoiceCard
                header="Invoice ID"
                content={subscriptionDetails?.invoiceId}
              />
              <ClientCard
                header={subscriptionDetails?.clientName}
                content={subscriptionDetails?.clientEmail}
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
