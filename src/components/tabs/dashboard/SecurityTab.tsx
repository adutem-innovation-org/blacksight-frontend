import { DashboardContent } from "@/components/design";
import React, { useEffect } from "react";
import { SecurityTabHeader, SecurityTabMainContent } from "./security";
import { useStore } from "@/hooks";
import { getMfaStatus, resetGetMfaStatus } from "@/store";

export const PasswordAndSecurityTab = () => {
  const { dispatch, getState } = useStore();
  const { mfaStatusFetched, mfaEnabled, availableMethods } = getState("Auth");

  useEffect(() => {
    if (!availableMethods) {
      dispatch(getMfaStatus());
    }
  }, []);

  useEffect(() => {
    if (mfaStatusFetched) {
      dispatch(resetGetMfaStatus());
    }
  }, [mfaStatusFetched]);

  return (
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1 flex flex-col overflow-auto items-center h-full">
          <div className="w-full max-w-5xl mt-6">
            <SecurityTabHeader />
            <SecurityTabMainContent />
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
