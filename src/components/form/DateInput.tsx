import { Tooltip } from "../tooltips";
import { DateInput as MantineDateInput } from "@mantine/dates";
import { Calendar } from "lucide-react";

type DateInputProps = {
  name?: string;
  error?: string;
  onBlur?: any;
  onFocus?: any;
  onChange?: any;
  disabled?: boolean;
  placeholder?: string;
  minDate?: Date;
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
}: DateInputProps) => {
  return (
    <div className="relative flex items-center">
      <MantineDateInput
        className="flex-1"
        placeholder={placeholder || "MM/DD/YYYY"}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        name={name}
        minDate={minDate}
      />
      <Calendar className="absolute right-3 stroke-gray-400 w-4 h-4" />
    </div>
  );
};

export const DateInput = ({ error, ...rest }: DateInputProps) => {
  return error ? (
    <Tooltip
      content={error}
      position={"bottom"}
      tooltipContainerClassName="w-full max-w-96"
      arrowPosition="start"
      className="left-0 translate-x-0 max-w-full"
    >
      <CustomDateInput {...rest} error={error} />
    </Tooltip>
  ) : (
    <CustomDateInput {...rest} error={error} />
  );
};
