import { Button } from "@/components/form";
import { ProfileTabsEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";

export const ProfileTopTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: ProfileTabsEnum;
  setActiveTab: (tab: ProfileTabsEnum) => void;
}) => {
  return (
    <div className="w-full mb-6 mt-12">
      <div className="w-full flex justify-between items-center">
        <div>
          <Button
            className={cn(
              "bg-transparent rounded-md h-10 !text-sm !font-dmsans tracking-tight font-medium hover:bg-gray-300/10 px-6 duration-300",
              {
                "bg-gray-300/10": activeTab === ProfileTabsEnum.OVERVIEW,
              }
            )}
          >
            Overview
          </Button>
        </div>

        <Button
          className="
        rounded-md h-10 !text-sm !font-dmsans tracking-tight font-medium
        "
          variant={"brand"}
        >
          <SquarePen />
          Edit Profile
        </Button>
      </div>
    </div>
  );
};
