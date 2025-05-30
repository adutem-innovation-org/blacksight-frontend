import { cn } from "@/lib/utils";
import { Tooltip } from "../tooltips";
import { DateInput as MantineDateInput, DateTimePicker } from "@mantine/dates";
import { Calendar } from "lucide-react";
import { useState } from "react";

type DateInputProps = {
  name?: string;
  error?: any;
  onBlur?: any;
  onFocus?: any;
  onChange?: any;
  disabled?: boolean;
  placeholder?: string;
  minDate?: Date;
  value?: any;
  includeTime?: boolean;
};

export const CustomDateInput = ({
  placeholder,
  name,
  error,
  onBlur,
  onFocus,
  onChange,
  disabled,
  minDate,
  value,
  includeTime,
}: DateInputProps) => {
  const BaseComponent = includeTime ? DateTimePicker : MantineDateInput;

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleInputBlur = (e: any) => {
    onBlur?.(e);
    setIsFocused(false);
  };

  return (
    <div
      className={cn(
        "password-root w-full flex items-center gap-3 border border-[#F3F4F6] bg-[#042f5b0d] hover:bg-[#042f5b0d] rounded-[12px] relative cursor-pointer",
        {
          "border-[#2563EB]": isFocused && !error,
          "bg-[#F9FAFB]": disabled,
          "border-[#F3F4F6]": disabled,
          "border-[#E11D48]": error && !disabled,
          "pointer-events-none": disabled,
        }
      )}
    >
      <BaseComponent
        className="flex-1 bg-none border-none outline-none"
        placeholder={placeholder || "MM/DD/YYYY"}
        onChange={onChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        disabled={disabled}
        name={name}
        value={value && new Date(value)}
        minDate={new Date()}
        popoverProps={{ withinPortal: false }}
      />
      <Calendar className="absolute right-3 stroke-gray-400 w-4 h-4" />
    </div>
  );
};

export const DateInput = ({ error, ...rest }: DateInputProps) => {
  return (
    <Tooltip
      content={error}
      position={"bottom"}
      tooltipContainerClassName="w-full"
      arrowPosition="start"
      className="left-0 translate-x-0 max-w-full"
      disabled={!error}
    >
      <CustomDateInput {...rest} error={error} />
    </Tooltip>
  );
};
