import { writeTextToClipboard } from "@/helpers";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

type SecurityCardProps = {
  title: string;
  value?: string;
  copiedText?: string;
  hidden?: boolean;
  hideAction?: boolean;
  valueClassName?: string;
};

export const SecurityCard = ({
  title,
  value,
  copiedText,
  hideAction,
  hidden,
  valueClassName,
}: SecurityCardProps) => {
  const copyToClipboard = async () => {
    try {
      if (!copiedText) return;
      await writeTextToClipboard(copiedText);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Unable to copy");
    }
  };

  return (
    <div className="flex flex-col gap-1 mt-4">
      <p className="font-dmsans tracking-tight">{title}</p>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "font-dmsans font-medium text-sm xl:text-base",
            valueClassName
          )}
        >
          {value}
        </span>
        <button
          className={cn("text-brand cursor-pointer", { hidden: hideAction })}
          onClick={copyToClipboard}
        >
          <Copy />
        </button>
      </div>
    </div>
  );
};
