import { HowItWorks } from "./HowItWorks";

export const PaymentTrackerTabHeader = () => {
  return (
    <header>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tighter text-[#0f0f10]">
          Payment tracker
        </h1>
        <p className="text-sm">
          Effortless payment tracking with smart reminders. Automatically notify
          customers and update payment cycles — no manual follow-ups required.
        </p>
        <HowItWorks />
      </div>
    </header>
  );
};
