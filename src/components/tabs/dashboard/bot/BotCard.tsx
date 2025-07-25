import { Badge } from "@/components/badge";
import { Button } from "@/components/form";
import { CustomDropdownItem } from "@/components/popups";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { botImages } from "@/constants";
import { BotTabsEnum } from "@/enums";
import { getRandomArrayItem, isAdmin, isSuperAdmin, isUser } from "@/helpers";
import { useProfile } from "@/hooks";
import { Bot } from "@/interfaces";
import { cn } from "@/lib/utils";
import { changeBotTab, setCurrentBot } from "@/store";
import {
  Ban,
  CircleFadingArrowUp,
  Cog,
  Copy,
  EllipsisVertical,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "react-redux";

type ActionsProps = {
  onEditConfiguration: () => void;
  onViewConfiguration: () => void;
  onDelete: () => void;
  onClone: () => void;
  setActiveStatus: (status: boolean) => void;
  isActive: boolean;
};

const Actions = ({
  onEditConfiguration,
  onViewConfiguration,
  onDelete,
  onClone,
  setActiveStatus,
  isActive,
}: ActionsProps) => {
  const { user } = useProfile();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="border-none outline-none cursor-pointer hover:bg-gray-100 p-1 rounded-md">
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="px-2 py-2.5 rounded-lg border-none min-w-50 bg-white z-1000 shadow-[0px_4px_16px_0px_#0000001f]"
        align="end"
      >
        {user && isUser(user) && (
          <CustomDropdownItem
            placeholder="Edit Configuration"
            childrenPosition="behind"
            className={"py-2"}
            onClick={onEditConfiguration}
          >
            <Cog />
          </CustomDropdownItem>
        )}
        {user && isAdmin(user) && (
          <CustomDropdownItem
            placeholder="View Configuration"
            childrenPosition="behind"
            className={"py-2"}
            onClick={onViewConfiguration}
          >
            <Cog />
          </CustomDropdownItem>
        )}
        {user && isUser(user) && (
          <CustomDropdownItem
            placeholder={"Clone"}
            childrenPosition="behind"
            className={"py-2"}
            onClick={onClone}
          >
            <Copy />
          </CustomDropdownItem>
        )}
        {user && (isSuperAdmin(user) || isUser(user)) && (
          <CustomDropdownItem
            placeholder={isActive ? "Deactivate" : "Activate"}
            childrenPosition="behind"
            className={"py-2"}
            onClick={() => setActiveStatus(!isActive)}
          >
            {isActive ? <Ban /> : <CircleFadingArrowUp />}
          </CustomDropdownItem>
        )}
        {user && isUser(user) && (
          <CustomDropdownItem
            placeholder="Delete"
            childrenPosition="behind"
            className={"py-2"}
            onClick={onDelete}
          >
            <Trash2 />
          </CustomDropdownItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface BotCardProps {
  bot: Bot;
  editConfiguration: (bot: Bot) => void;
  viewConfiguration: (bot: Bot) => void;
  onDeleteBot: (bot: Bot) => void;
  onCloneBot: (bot: Bot) => void;
  setActiveStatus: (bot: Bot, status: boolean) => void;
}

export const BotCard = ({
  bot,
  editConfiguration,
  viewConfiguration,
  onDeleteBot,
  onCloneBot,
  setActiveStatus,
}: BotCardProps) => {
  const { dispatch } = useStore();
  const { user } = useProfile();
  const imageUrl = useMemo(() => getRandomArrayItem(botImages), []);

  const goToPlayground = () => {
    if (!bot.isActive) return toast.error("Cannot launch inactive bot.");
    dispatch(setCurrentBot(bot));
    dispatch(changeBotTab(BotTabsEnum.PLAYGROUND));
  };

  const onEditConfiguration = () => editConfiguration(bot);

  const onViewConfiguration = () => viewConfiguration(bot);

  const onDelete = () => onDeleteBot(bot);

  const onClone = () => onCloneBot(bot);

  const onSetActiveStatus = (status: boolean) => setActiveStatus(bot, status);

  return (
    <div className="bg-white rounded-md overflow-hidden flex flex-col shadow-md">
      {/* Bot image container */}
      <div className="h-[300px] w-full overflow-hidden flex items-center justify-center border-b relative">
        {/* Overlay */}
        <div className="absolute z-50 top-0 left-0 w-full h-full p-4">
          <div className="flex justify-between">
            <Badge className="capitalize">{bot.status}</Badge>
            <Actions
              onEditConfiguration={onEditConfiguration}
              onViewConfiguration={onViewConfiguration}
              onDelete={onDelete}
              onClone={onClone}
              setActiveStatus={onSetActiveStatus}
              isActive={bot.isActive}
            />
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
          variant={bot.isActive ? "primary" : "secondary"}
          className={cn("cursor-pointer py-1 h-11", {
            "hover:bg-primary/80": bot.isActive,
          })}
          onClick={goToPlayground}
          disabled={!user || !isUser(user)}
        >
          Launch
        </Button>
      </div>
    </div>
  );
};
