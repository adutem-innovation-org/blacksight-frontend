import { DashboardContent } from "@/components/design";
import React from "react";
import { PaymentTrackerTabHeader } from "./payment-tracker";

export const PaymentTrackerTab = () => {
  return (
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1 flex flex-col overflow-auto items-center h-full">
          <div className="w-full max-w-6xl mt-4 md:mt-8 flex flex-col gap-6">
            <PaymentTrackerTabHeader />
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
