import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, LucideProps } from "lucide-react";
import { CustomDropdownItem } from "./Dropdown";
import { cn } from "@/lib/utils";
import { Button } from "@/components/form";

export type DropdownItemType = {
  placeholder: string;
  onClick: () => void;
  childrenPosition?: "behind" | "after";
  className?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export const DropdownComp = ({ data }: { data: DropdownItemType[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none outline-none">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="px-2 py-2.5 rounded-lg border-none w-52 drop-shadow-lg"
        align="end"
      >
        {data.map(
          ({ placeholder, onClick, childrenPosition, className, Icon }) => (
            <CustomDropdownItem
              placeholder={placeholder}
              onClick={(e: any) => {
                e.stopPropagation();
                onClick();
              }}
              childrenPosition={childrenPosition || "behind"}
              className={cn("py-2", className)}
            >
              {Icon && <Icon />}
            </CustomDropdownItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
