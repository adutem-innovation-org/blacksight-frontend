import { kbSources, KBSourceType } from "@/constants";
import { KnowledgeBaseSources, SideBarStateEnum } from "@/enums";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";

type SourceWidgetProps = {
  data: KBSourceType;
  openForm: (data: KBSourceType) => void;
};

const SourceWidget = ({ openForm, data }: SourceWidgetProps) => {
  const openKBForm = () => openForm(data);

  const { label, iconClass } = data;

  return (
    <button
      className="border border-gray-200 rounded-2xl px-4 py-3 pt-3.5 pr-6 flex flex-col items-start gap-3 cursor-pointer hover:bg-gray-100 bg-[#fbfbfb] w-full"
      onClick={openKBForm}
    >
      <i className={cn(iconClass, "flex text-xl text-gray-500")}></i>
      <span className="font-medium tracking-tighter leading-tight text-gray-800 text-sm">
        {label}
      </span>
    </button>
  );
};

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
