import { InfoBlock } from "@/components/InfoBlock";
import { availableMFAMethods } from "@/constants";
import { MethodCard } from "./MethodCard";

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
  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold tracking-tight text-gray-600">
        Available methods
      </h3>
      <div className="mt-4 flex flex-col gap-4">
        {availableMFAMethods.map((method) => (
          <MethodCard {...method} />
        ))}
      </div>
    </div>
  );
};
