import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { Checkbox } from "../../form";
import { useProfile } from "@/hooks";
import { Avatar } from "../../avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropsWithChildren, useState } from "react";
import { ChevronDown, Plus, ChevronUp } from "lucide-react";

interface OtherProps {
  iconType?: "minus" | "check";
}

export const CustomDropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> &
    OtherProps
>(
  (
    { className, children, checked, disabled, iconType = "check", ...props },
    ref
  ) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:text-gray-400",
        className
      )}
      checked={checked}
      disabled={disabled}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Checkbox checked={checked} disabled={disabled} iconType={iconType} />
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
);
CustomDropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

type Props = {};
export const CompanyDropDown = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className="">
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger className="border-none outline-none">
          <Trigger isOpen={isOpen} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="px-2 py-2.5 rounded-lg border-none min-w-[200px] max-w-[400px]"
          align="start"
          style={{ boxShadow: "0px 4px 16px #0000001F" }}
        >
          <CustomDropdownItem placeholder="Settings" />
          <DropdownMenuSeparator className="my-1.5" />
          <CustomDropdownItem
            placeholder="Add Company"
            childrenPosition="behind"
          >
            {/* <Plus className="fill-gray-900" /> */}
            <Plus />
          </CustomDropdownItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Trigger = ({ isOpen }: { isOpen: boolean }) => {
  const { user } = useProfile();
  return (
    <div className="bg-gray-100 flex items-center gap-2 rounded-full cursor-pointer pr-1 group">
      <Avatar
        size={"md"}
        altText={user?.firstName || "Company Logo"}
        fallbackText={"CN"}
        className="bg-white"
        fallbackClassName="bg-white"
      />
      <p className="font-sfpro-medium text-sm text-gray-900 group-hover:text-blue-600">
        Company name
      </p>
      {isOpen ? (
        <ChevronUp className="text-gray-900 group-hover:text-blue-600" />
      ) : (
        <ChevronDown className="text-gray-900 group-hover:text-blue-600" />
      )}
    </div>
  );
};

interface ItemProps extends PropsWithChildren {
  placeholder: string;
  onClick?: (...args: any) => any;
  childrenPosition?: "behind" | "after";
  className?: any;
}

export const CustomDropdownItem = ({
  placeholder,
  onClick,
  children,
  childrenPosition,
  className,
}: ItemProps) => {
  return (
    <DropdownMenuItem
      className={cn(
        "flex items-center cursor-pointer gap-2.5 px-2 py-1 rounded-lg hover:bg-blue-50",
        className
      )}
      onClick={() => onClick?.()}
    >
      {childrenPosition === "behind" && children}
      <p className="text-gray-900 text-sm font-sfpro pointer-events-none leading-[20px]">
        {placeholder}
      </p>
      {childrenPosition === "after" && children}
    </DropdownMenuItem>
  );
};
