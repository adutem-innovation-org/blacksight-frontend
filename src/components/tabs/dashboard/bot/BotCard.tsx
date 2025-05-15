import { Badge } from "@/components/badge";
import { Button } from "@/components/form";
import { botImages } from "@/constants";
import { getRandomArrayItem } from "@/helpers";
import { Bot } from "@/interfaces";
import { EllipsisVertical } from "lucide-react";
import { useMemo } from "react";

interface BotCardProps {
  bot: Bot;
}

export const BotCard = ({ bot }: BotCardProps) => {
  const imageUrl = useMemo(() => getRandomArrayItem(botImages), []);
  return (
    <div className="bg-white rounded-md overflow-hidden flex flex-col shadow-md">
      {/* Bot image container */}
      <div className="h-[300px] w-full overflow-hidden flex items-center justify-center border-b relative">
        {/* Overlay */}
        <div className="absolute z-50 top-0 left-0 w-full h-full p-4">
          <div className="flex justify-between">
            <Badge className="capitalize">{bot.status}</Badge>
            <EllipsisVertical />
          </div>
        </div>
        <img src={imageUrl} className="w-[90%] h-[200px] object-contain" />
      </div>

      <div className="flex-1 p-3 px-4 flex items-center justify-between">
        {/* Bot info */}
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold font-sfpro-medium text-lg">
            {bot.name}
          </h4>
          <p className="text-sm font-medium font-sfpro flex items-center gap-1">
            Created on:
            <Badge variant={"gray"}>
              {new Date(bot.createdAt).toDateString()}
            </Badge>
          </p>
        </div>

        <Button
          variant={"primary"}
          className="cursor-pointer py-1 h-11 hover:bg-primary/80"
        >
          Launch
        </Button>
      </div>
    </div>
  );
};
