import { MyProfile } from "./MyProfile";
import { Security } from "./Security";
import { Billing } from "./Billing";
import { DataExport } from "./DataExport";
import { ProfileTabsEnum } from "@/enums";
import { Tabs } from "@mantine/core";

type Props = {
  activeTab: ProfileTabsEnum;
};

export const ProfileTabs = ({ activeTab }: Props) => {
  return (
    <Tabs value={activeTab} className="w-full h-full" keepMounted={false}>
      <Tabs.Panel value={ProfileTabsEnum.MY_PROFILE} className="w-full h-full">
        <MyProfile />
      </Tabs.Panel>
      <Tabs.Panel value={ProfileTabsEnum.SECURTIY} className="w-full h-full">
        <Security />
      </Tabs.Panel>
      <Tabs.Panel value={ProfileTabsEnum.BILLING} className="w-full h-full">
        <Billing />
      </Tabs.Panel>
      <Tabs.Panel value={ProfileTabsEnum.DATA_EXPORT} className="w-full h-full">
        <DataExport />
      </Tabs.Panel>
    </Tabs>
  );
};
