import { DashboardContent } from "@/components/design";
import React from "react";
import { SecurityTabHeader, SecurityTabMainContent } from "./security";

export const PasswordAndSecurityTab = () => {
  return (
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1 flex flex-col overflow-auto items-center h-full">
          <div className="w-full max-w-4xl mt-6">
            <SecurityTabHeader />
            <SecurityTabMainContent />
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
