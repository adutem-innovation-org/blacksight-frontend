import { Button } from "@/components/form";
import { CustomDropdownItem } from "./Dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { HeaderContext } from "@tanstack/react-table";
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

export const renderSorter = <T extends unknown>(headerName: string) => {
  return ({ column }: HeaderContext<T, unknown>) => {
    const sortDirection = column.getIsSorted();
    const sortDescending = () =>
      sortDirection === "desc"
        ? column.clearSorting()
        : column.toggleSorting(true);
    const sortAscending = () =>
      sortDirection === "asc"
        ? column.clearSorting()
        : column.toggleSorting(false);

    return (
      <SortingDropDown
        Trigger={
          <Button
            variant={"ghost"}
            onClick={column.getToggleSortingHandler()}
            className="hover:bg-transparent py-4 px-4 w-full h-full justify-start text-xs font-semibold text-[#717680] hover:text-[#535862]"
          >
            {headerName}
            {sortDirection === "asc" && (
              <ListFilter className="text-blue-600 rotate-180" />
            )}
            {sortDirection === "desc" && (
              <ListFilter className="text-blue-600" />
            )}
            {!sortDirection && <ListFilter className="text-[#A4A7AE]" />}
          </Button>
        }
        sortDescending={sortDescending}
        sortAscending={sortAscending}
        sortDirection={sortDirection}
      />
    );
  };
};
