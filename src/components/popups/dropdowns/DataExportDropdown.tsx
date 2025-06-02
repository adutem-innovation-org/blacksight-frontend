import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomDropdownItem } from "./Dropdown";
import { Button } from "@/components/form";
import { ArrowDownToLine, FileUp } from "lucide-react";

type DataExportDropdownProps = {
  exportExcel: () => void;
  exportCSV: () => void;
};

export const DataExportDropdown = ({
  exportExcel,
  exportCSV,
}: DataExportDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none outline-none">
        <Button
          size={"icon"}
          variant={"secondary_gray"}
          className="rounded-full"
        >
          <ArrowDownToLine />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="px-2 py-2.5 rounded-lg border-none w-52 drop-shadow-lg"
        align="end"
      >
        <CustomDropdownItem
          placeholder="Export as Excel"
          onClick={(e: any) => {
            e.stopPropagation();
            exportExcel();
          }}
          childrenPosition="behind"
          className={"py-2"}
        >
          <FileUp />
        </CustomDropdownItem>
        <CustomDropdownItem
          placeholder="Export as CSV"
          onClick={(e: any) => {
            e.stopPropagation();
            exportCSV();
          }}
          childrenPosition="behind"
          className={"py-2"}
        >
          <FileUp />
        </CustomDropdownItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
