import { InfoBlock } from "@/components/InfoBlock";
import { availableMFAMethods } from "@/constants";
import { MethodCard } from "./MethodCard";
import { useStore } from "@/hooks";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  disableMfaMethod,
  enableEmailMfa,
  getMfaStatus,
  resetDisableMfaMethod,
  resetEnableMfaMethod,
} from "@/store";
import { MFAMethods } from "@/enums";
import { SmsMfaSetupForm } from "./SmsMfaSetupForm";
import { resetDocumentElement } from "@/helpers";
import { ConfirmationDialog } from "@/components/popups";
import { Loader } from "@/components/progress";

export const MFASection = () => {
  const { getState } = useStore();
  const { mfaEnabled, availableMethods } = getState("Auth");

  return (
    <div className="mt-12">
      <MFASectionHeader />

      <div className="my-6">
        <InfoBlock
          variant={mfaEnabled ? "success" : "warning"}
          size={"lg"}
          className="sm:text-base xl:text-lg p-6 rounded-2xl flex items-center gap-4"
        >
          <i className="fi fi-sr-info flex"></i>
          <span>
            {mfaEnabled ? (
              <>
                You have enabled <b>{(availableMethods?.length || 1) - 1}</b>{" "}
                Two-factor authentication on your account.{" "}
              </>
            ) : (
              <>
                Setup at least <b>1 authentication methods</b> to help protect
                your account.
              </>
            )}
          </span>
        </InfoBlock>
      </div>

      <AvailableMethods />
    </div>
  );
};

const MFASectionHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold tracking-tight text-gray-600">
        Two-Factor Authentication
      </h2>
      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
        Two-factor authentication (also known as 2FA) is a security feature that
        adds an extra layer of protection to your account. It requires you to
        enter a unique code in addition to your password when you log in.
      </p>
    </div>
  );
};

const AvailableMethods = () => {
  const { getState, dispatch } = useStore();
  const {
    mfaMethodEnabled,
    enableMfaMethodErrorMessage,

    disablingMfaMethod,
    mfaMethodDisabled,
    disableMfaMethodErrorMessage,

    fetchingMfaStatus,
  } = getState("Auth");
  const [smsMfaSetupFormOpen, setSmsMfaSetupFormOpen] = useState(false);
  const [currentMethod, setCurrentMethod] = useState<MFAMethods | null>(null);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);

  const showDeactivateDialog = () => setDeactivateDialogOpen(true);
  const hideDeactivateDialog = () => setDeactivateDialogOpen(false);

  const endDeactivateOperation = () => {
    setCurrentMethod(null);
    hideDeactivateDialog();
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

  const confirmDeactivateOperation = () => {
    if (!currentMethod) return hideDeactivateDialog();
    dispatch(disableMfaMethod({ method: currentMethod }));
  };

  const onOpenChange = (val: boolean) => {
    setSmsMfaSetupFormOpen(val);
    setCurrentMethod(null);
  };

  const enableMethod = (method: MFAMethods, enabled: boolean) => {
    setCurrentMethod(method);
    if (!enabled) return showDeactivateDialog();
    if (method === MFAMethods.SMS) {
      setSmsMfaSetupFormOpen(true);
    } else {
      dispatch(enableEmailMfa());
    }
  };

  useEffect(() => {
    if (mfaMethodEnabled) {
      toast.success("Enabled");
      // Get the new mfa status
      dispatch(getMfaStatus());
      // Reset enable mfa method state
      dispatch(resetEnableMfaMethod());
    }
  }, [mfaMethodEnabled]);

  useEffect(() => {
    if (enableMfaMethodErrorMessage) {
      toast.error(enableMfaMethodErrorMessage);
      dispatch(resetEnableMfaMethod());
    }
  }, [enableMfaMethodErrorMessage]);

  useEffect(() => {
    if (mfaMethodDisabled) {
      toast.success("Disabled");
      // Get new mfa status
      dispatch(getMfaStatus());
      // Close deactivate dialog
      hideDeactivateDialog();
      // Reset disable mfa method state
      dispatch(resetDisableMfaMethod());
    }
  }, [mfaMethodDisabled]);

  useEffect(() => {
    if (disableMfaMethodErrorMessage) {
      toast.error(disableMfaMethodErrorMessage);
      dispatch(resetDisableMfaMethod());
    }
  }, [disableMfaMethodErrorMessage]);

  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold tracking-tight text-gray-600">
        Available methods
      </h3>

      {fetchingMfaStatus ? (
        <div className="h-20 relative">
          <Loader />
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {availableMFAMethods.map((method) => (
            <MethodCard
              {...method}
              enableMethod={enableMethod}
              currentMethod={currentMethod}
            />
          ))}
        </div>
      )}

      <SmsMfaSetupForm
        isOpen={smsMfaSetupFormOpen && currentMethod === MFAMethods.SMS}
        onOpenChange={onOpenChange}
      />

      <ConfirmationDialog
        isOpen={deactivateDialogOpen}
        onOpenChange={setDeactivateDialogOpen}
        cancelOperation={endDeactivateOperation}
        confirmOperation={confirmDeactivateOperation}
        loading={disablingMfaMethod}
        title={`Disable ${currentMethod} method?`}
        confirmCtaText="Disable"
        description={`Are you sure you want to disable this method? You account will not longer be protected by ${currentMethod} verification.`}
      />
    </div>
  );
};
