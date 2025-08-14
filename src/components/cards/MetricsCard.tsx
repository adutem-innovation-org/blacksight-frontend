import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { LucideProps } from "lucide-react";

const metricsCardVariants = cva("", {
  variants: {
    variant: {
      gray: "bg-[#F3F4F6] text-[#374151]",
      primary: "bg-[#EFF6FF] text-[#2563EB]",
      error: "bg-[#FFF1F2] text-[#BE123C]",
      warning: "bg-[#FFFBEB] text-[#B45309]",
      success: "bg-[#ECFDF5] text-[#047857]",
      purple: "bg-[#F5F3FF] text-[#6D28D9]",
      danger: "bg-[#fde8e4] text-[#f06548]",
      info: "bg-[#dff0fa] text-[#299cdb]",
      "warning-subtle": "bg-[#fef4e4] text-[#f7b84b]",
      "success-subtle": "bg-[#daf4f0] text-[#0ab39c]",
    },
    textOnly: {
      gray: "text-[#374151]",
      primary: "text-[#2563EB]",
      error: "text-[#BE123C]",
      warning: "text-[#B45309]",
      success: "text-[#047857]",
      purple: "text-[#6D28D9]",
      danger: "text-[#f06548]",
      info: "text-[#299cdb]",
      "warning-subtle": "text-[#f7b84b]",
      "success-subtle": "text-[#0ab39c]",
    },
  },
  defaultVariants: {},
});

export const MetricsCard = ({
  label,
  value = 0,
  Icon,
  variant,
}: {
  label: string;
  value?: number;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  variant:
    | "gray"
    | "primary"
    | "error"
    | "warning"
    | "success"
    | "purple"
    | "danger"
    | "info"
    | "warning-subtle"
    | "success-subtle";
}) => {
  return (
    <div className="bg-white border-gray-200 rounded-sm shadow py-5 px-5 lg:px-6 flex justify-between hover:shadow-md hover:translate-y-0.5 duration-300 cursor-pointer">
      <div className="flex flex-col gap-4">
        <div className="text-gray-600 text-sm tracking-tight">{label}</div>
        <div
          className={cn(
            "text-3xl font-medium text-gray-600"
            // metricsCardVariants({ textOnly: variant })
          )}
        >
          {value}
        </div>
      </div>
      <div
        className={cn(
          "w-12 h-12 rounded-sm flex justify-center items-center",
          metricsCardVariants({ variant })
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
