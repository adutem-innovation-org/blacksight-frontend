import { HelpfulTip } from "./HelpTip";

export const PaymentBCPsHeader = () => {
  return (
    <header>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tighter text-[#0f0f10]">
          Business Customers
        </h1>
        <p className="text-sm">
          Effortless customer record management. Easily update, remove, and
          remind customers — individually or in bulk — right from your uploaded
          payment file.
        </p>
        <HelpfulTip />
      </div>
    </header>
  );
};
