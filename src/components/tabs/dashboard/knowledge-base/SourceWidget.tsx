import { KBSourceType } from "@/constants";
import { cn } from "@/lib/utils";

type SourceWidgetProps = {
  data: KBSourceType;
  openForm: (data: KBSourceType) => void;
};

export const SourceWidget = ({ openForm, data }: SourceWidgetProps) => {
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
