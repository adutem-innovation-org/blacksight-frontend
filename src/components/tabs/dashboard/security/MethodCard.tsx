import { Button } from "@/components/form";
import { MFAMethods } from "@/enums";
import { cn } from "@/lib/utils";

export const MethodCard = ({
  label,
  method,
  enabled,
  description,
  iconClass,
}: {
  label: string;
  method: MFAMethods;
  enabled: boolean;
  description: any;
  iconClass: string;
}) => {
  return (
    <div className="p-6 py-5 bg-gray-50 rounded-2xl">
      <div className="flex justify-start items-center gap-6">
        <i
          className={cn(
            iconClass,
            "flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-4xl"
          )}
        ></i>

        {/* Left content */}
        <div>
          <h2 className="text-xl font-medium tracking-tighter text-gray-600">
            {label}
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-[600px]">
            {description}
          </p>
        </div>

        <Button
          className="rounded-lg !text-sm py-0 ml-auto"
          size={"sm"}
          type="button"
        >
          {enabled ? "Disable" : "Setup"}{" "}
        </Button>
      </div>
    </div>
  );
};
