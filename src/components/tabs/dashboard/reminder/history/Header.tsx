import { HelpfulTip } from "./HelpTip";

export const ReminderHistoryHeader = () => {
  return (
    <header>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tighter text-[#0f0f10]">
          Reminders
        </h1>
        <p className="text-sm">
          Effortless reminder management. Quickly view, update, delete, or pause
          reminders — individually or in bulk — all from your reminders
          dashboard.
        </p>
        <HelpfulTip />
      </div>
    </header>
  );
};
