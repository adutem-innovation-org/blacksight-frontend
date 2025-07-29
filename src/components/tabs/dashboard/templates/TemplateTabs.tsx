import { TemplateTabsEnum } from "@/enums";
import { useStore } from "@/hooks";
import { Tabs } from "@mantine/core";
import { TemplateAnalyticsTab } from "./Analytics";
import { EmailTemplateEditorTab } from "./EmailEditor";

export const TemplateTabs = () => {
  const { getState } = useStore();
  const { activeTemplateTab } = getState("Layout");

  return (
    <Tabs
      value={activeTemplateTab}
      className="w-full h-full"
      keepMounted={false}
    >
      <Tabs.Panel value={TemplateTabsEnum.ANALYTICS} className="w-full h-full">
        <TemplateAnalyticsTab />
      </Tabs.Panel>
      <Tabs.Panel value={TemplateTabsEnum.EDITOR} className="w-full h-full">
        <EmailTemplateEditorTab />
      </Tabs.Panel>
    </Tabs>
  );
};
