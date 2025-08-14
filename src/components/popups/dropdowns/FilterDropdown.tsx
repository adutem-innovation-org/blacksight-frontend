import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomDropdownMenuCheckboxItem } from "./Dropdown";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import pinLogo from "@/assets/svgs/pin.svg";
import { Column, HeaderContext } from "@tanstack/react-table";

type FilterDropdownProps<T> = {
  column: Column<T, unknown>;
  OPTIONS: Array<any>;
  columnHeader: string;
};

export const TableFilterDropdown = ({
  column,
  OPTIONS,
  columnHeader,
}: FilterDropdownProps<any>) => {
  const [open, setOpen] = useState(false);

  const filterValue = column.getFilterValue() as string[] | undefined;

  // Determine if all options are selected
  const isAllSelected = filterValue?.length === OPTIONS.length || !filterValue;

  // Handle select all toggle
  const handleSelectAll = (checked: boolean) => {
    column.setFilterValue(checked ? OPTIONS : []);
  };

  // Handle individual option toggle
  const handleOptionToggle = (option: string) => {
    const currentFilter = filterValue || [];

    if (currentFilter.includes(option)) {
      // Remove option if already selected
      column.setFilterValue(currentFilter.filter((s) => s !== option));
    } else {
      // Add option if not selected
      column.setFilterValue([...currentFilter, option]);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center py-4 px-4 gap-1 w-full h-full border-none outline-none font-semibold text-xs hover:text-[#535862]">
        {columnHeader}
        {open ? (
          <ChevronUp className="text-blue-600 w-4 h-4" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white w-[230px] rounded-lg border-none z-20 px-2 py-2.5 shadow-[0px_4px_16px_#0000001F]"
        align="start"
      >
        {/* Header */}
        <DropdownMenuLabel className="p-0 border-b pb-2">
          <p className="px-2 pb-1 text-gray-400 text-xs font-normal font-sfpro mb-1">
            Currently showing
          </p>

          {/* Select all */}
          <CustomDropdownMenuCheckboxItem
            iconType="minus"
            onSelect={(e) => e.preventDefault()}
            className="py-1"
            disabled={isAllSelected}
            checked={isAllSelected}
            onCheckedChange={handleSelectAll}
          >
            <p className="flex justify-between items-center flex-1 text-gray-800 font-normal font-sfpro">
              Select all
            </p>
          </CustomDropdownMenuCheckboxItem>
        </DropdownMenuLabel>

        <DropdownMenuLabel className="px-2 my-2 py-0 font-sfpro text-xs text-gray-400">
          {columnHeader}
        </DropdownMenuLabel>

        {/* Other options */}
        <div className="flex flex-col gap-1">
          {OPTIONS.map((option) => (
            <CustomDropdownMenuCheckboxItem
              key={option}
              onSelect={(e) => e.preventDefault()}
              checked={filterValue?.includes(option) || false}
              onCheckedChange={(value) => handleOptionToggle(option)}
              className="capitalize py-1 px-2 cursor-pointer font-sfpro"
            >
              <div className="flex justify-between items-center flex-1 ml-6">
                <p className="text-sm font-sfpro font-normal text-gray-800">
                  {option}
                </p>
                <img src={pinLogo} />
              </div>
            </CustomDropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const renderTableFilter = <T extends unknown>(
  columnHeader: string,
  options: any[]
) => {
  return ({ column }: HeaderContext<T, unknown>) => {
    return (
      <TableFilterDropdown
        OPTIONS={options}
        column={column}
        columnHeader={columnHeader}
      />
    );
  };
};
