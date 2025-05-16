import { useStore } from "@/hooks";
import { BotAnalyticsTab } from "./Analytics";
import { BotPlaygroundTab } from "./playground";
import { BotTabsEnum } from "@/enums";
import { Tabs } from "@mantine/core";

export const BotTabs = () => {
  const { getState } = useStore();
  const { activeBotTab } = getState("Layout");
  return (
    <Tabs value={activeBotTab} className="w-full h-full" keepMounted={false}>
      <Tabs.Panel value={BotTabsEnum.ANALYTICS} className="w-full h-full">
        <BotAnalyticsTab />
      </Tabs.Panel>
      <Tabs.Panel value={BotTabsEnum.PLAYGROUND} className="w-full h-full">
        <BotPlaygroundTab />
      </Tabs.Panel>
    </Tabs>
  );
};
