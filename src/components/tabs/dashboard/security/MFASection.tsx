import { InfoBlock } from "@/components/InfoBlock";
import { availableMFAMethods } from "@/constants";
import { MethodCard } from "./MethodCard";
import { useStore } from "@/hooks";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { enableEmailMfa, resetEnableMfaMethod } from "@/store";
import { MFAMethods } from "@/enums";
import { SmsMfaSetupForm } from "./SmsMfaSetupForm";

export const MFASection = () => {
  return (
    <div className="mt-12">
      <MFASectionHeader />
      <div className="my-6">
        <InfoBlock
          variant={"warning"}
          size={"lg"}
          className="sm:text-base xl:text-lg p-6 rounded-2xl flex items-center gap-4"
        >
          <i className="fi fi-sr-info flex"></i>
          <span>
            Setup at least <b>1 authentication methods</b> to help protect your
            account.
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
  const { mfaMethodEnabled, enableMfaMethodErrorMessage } = getState("Auth");
  const [smsMfaSetupFormOpen, setSmsMfaSetupFormOpen] = useState(false);
  const [currentMethod, setCurrentMethod] = useState<MFAMethods | null>(null);

  const onOpenChange = (val: boolean) => {
    setSmsMfaSetupFormOpen(val);
    setCurrentMethod(null);
  };

  const enableMethod = (method: MFAMethods) => {
    setCurrentMethod(method);
    if (method === MFAMethods.SMS) {
      setSmsMfaSetupFormOpen(true);
    } else {
      dispatch(enableEmailMfa());
    }
  };

  useEffect(() => {
    if (mfaMethodEnabled) {
      toast.success("Enabled");
      dispatch(resetEnableMfaMethod());
    }
  }, [mfaMethodEnabled]);

  useEffect(() => {
    if (enableMfaMethodErrorMessage) {
      toast.error(enableMfaMethodErrorMessage);
      dispatch(resetEnableMfaMethod());
    }
  }, [enableMfaMethodErrorMessage]);

  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold tracking-tight text-gray-600">
        Available methods
      </h3>
      <div className="mt-4 flex flex-col gap-4">
        {availableMFAMethods.map((method) => (
          <MethodCard
            {...method}
            enableMethod={enableMethod}
            currentMethod={currentMethod}
          />
        ))}
      </div>

      <SmsMfaSetupForm
        isOpen={smsMfaSetupFormOpen && currentMethod === MFAMethods.SMS}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};
