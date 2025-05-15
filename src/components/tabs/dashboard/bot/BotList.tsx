import { Bot } from "@/interfaces";
import { BotCard } from "./BotCard";
import { cn } from "@/lib/utils";

interface BotListProps {
  bots: Bot[];
}

export const BotList = ({ bots }: BotListProps) => {
  return (
    <div className={cn("overflow-hidden flex-1 bg-transparent")}>
      <div className="h-full overflow-auto grid bg-transparent auto-rows-[400px] grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6 md:gap-5 no-scrollbar">
        {bots.map((bot) => (
          <BotCard bot={bot} />
        ))}
      </div>
    </div>
  );
};
