import { BellOff } from "lucide-react";

export const EmptyNotification = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center text-center gap-3">
        <BellOff className="text-brand w-12 h-12" />
        <p className="text-brand font-urbanist font-semibold tracking-tight text-sm">
          You currently have no notification.
        </p>
      </div>
    </div>
  );
};
