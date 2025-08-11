import { MyProfile } from "./MyProfile";
import { ProfileTabsEnum } from "@/enums";
import { Tabs } from "@mantine/core";
import { BusinessInfo } from "./BusinessInfo";

type Props = {
  activeTab: ProfileTabsEnum;
};

export const ProfileTabs = ({ activeTab }: Props) => {
  return (
    <Tabs value={activeTab} className="w-full h-full" keepMounted={false}>
      <Tabs.Panel value={ProfileTabsEnum.MY_PROFILE} className="w-full h-full">
        <MyProfile />
      </Tabs.Panel>
      <Tabs.Panel
        value={ProfileTabsEnum.BUSINESS_INFO}
        className="w-full h-full"
      >
        <BusinessInfo />
      </Tabs.Panel>
    </Tabs>
  );
};
