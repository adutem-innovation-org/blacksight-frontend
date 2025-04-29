import { CustomDropdownItem } from "./Dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ListFilter } from "lucide-react";
import { JSX } from "react";

type Props = {
  Trigger: JSX.Element;
  sortDescending: () => void;
  sortAscending: () => void;
  sortDirection: "desc" | "asc" | false;
};

export const SortingDropDown = ({
  Trigger,
  sortAscending,
  sortDescending,
  sortDirection,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full h-full p-0 m-0 outline-none border-none">
        {Trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-none drop-shadow-none shadow-[0px_4px_16px_#0000001F]"
        align="start"
      >
        <CustomDropdownItem
          placeholder="Descending"
          onClick={sortDescending}
          childrenPosition="behind"
        >
          <ListFilter
            className={cn("text-[#A4A7AE]", {
              "text-blue-500": sortDirection === "desc",
            })}
          />
        </CustomDropdownItem>
        <CustomDropdownItem
          placeholder="Ascending"
          onClick={sortAscending}
          childrenPosition="behind"
        >
          <ListFilter
            className={cn("rotate-180 text-[#A4A7AE]", {
              "text-blue-500": sortDirection === "asc",
            })}
          />
        </CustomDropdownItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
