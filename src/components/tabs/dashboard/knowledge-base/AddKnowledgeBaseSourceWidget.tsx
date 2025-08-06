import { kbSources, KBSourceType } from "@/constants";
import { SideBarStateEnum } from "@/enums";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { SourceWidget } from "./SourceWidget";

export const AddKnowledgeBaseSourceWidgets = ({
  openForm,
}: {
  openForm: (data: KBSourceType) => void;
}) => {
  const { getState } = useStore();
  const { sidebarState } = getState("Layout");

  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  return (
    <div className="flex items-start justify-end lg:items-end xl:order-4 xl:ml-auto">
      <div
        className={cn(
          "grid grid-cols-2 lg:grid-cols-[repeat(4,minmax(100px,180px))] xl:grid-cols-4 gap-2 flex-1 xl:flex-none",
          {
            "sm:grid-cols-[repeat(4,minmax(100px,180px))]": isCollapsed,
          }
        )}
      >
        {kbSources.map((source) => (
          <SourceWidget data={source} openForm={openForm} />
        ))}
      </div>
    </div>
  );
};
