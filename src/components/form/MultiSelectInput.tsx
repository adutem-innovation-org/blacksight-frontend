import { cn } from "@/lib/utils";
import {
  MultiSelect,
  ComboboxLikeRenderOptionInput,
  ComboboxItem,
} from "@mantine/core";
import { cva, VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { Tooltip } from "../tooltips";

const inputVariants = cva(
  "w-full flex px-1 items-center gap-3 border border-[#F3F4F6] bg-[#042f5b0d] hover:bg-[#042f5b0d] rounded-[12px] relative cursor-pointer font-sfpro",
  {
    variants: {
      size: {
        sm: "h-10",
        md: "!h-[52px]",
        lg: "h-[56px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface MultiSelectInputProps extends VariantProps<typeof inputVariants> {
  placeholder?: string;
  data: Array<string> | any;
  renderOptions?: (
    item: ComboboxLikeRenderOptionInput<ComboboxItem>
  ) => React.ReactNode;
  onChange?: any;
  onBlur?: any;
  name: string;
  noOptionsContent?: any;
  value?: any;
  disabled?: boolean;
  className?: string;
  error?: any;
}

const MultiSelectInputEl = ({
  placeholder,
  data,
  renderOptions,
  onChange,
  onBlur,
  value,
  name,
  noOptionsContent,
  disabled,
  size,
  className,
  error,
}: MultiSelectInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleItemRemove = (removedValue: string) => {
    const newValues = value.filter((v: any) => v !== removedValue);
    onChange(newValues);
  };

  const deleteButton = useMemo(() => {
    return (
      <X className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
    );
  }, []);

  const valueDisplays = useMemo(() => {
    if (!value || value.length === 0) return <></>;
    return value.map((v: string) => {
      const label =
        typeof data[0] === "string"
          ? v
          : data.find((opt: any) => opt.value === v)?.label ?? v;
      return (
        <div
          key={v}
          className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mb-1"
        >
          <span>{label}</span>
          <button
            type="button"
            onClick={() => handleItemRemove(v)}
            className="ml-2 hover:text-red-500"
          >
            {deleteButton}
          </button>
        </div>
      );
    });
  }, [value]);
  return (
    <>
      <div className="flex flex-wrap items-center gap-1 mb-1">
        {valueDisplays}
      </div>
      {data?.length === 0 && noOptionsContent && noOptionsContent}
      {data && data.length > 0 && (
        <div
          className={cn(inputVariants({ size }), className, {
            "border-[#2563EB]": isFocused && !error,
            "bg-[#F9FAFB]": disabled,
            "border-[#F3F4F6]": disabled,
            "border-[#E11D48]": error && !disabled,
            "pointer-events-none": disabled,
          })}
        >
          <MultiSelect
            className="flex-1 bg-none border-none outline-none"
            data={data}
            renderOption={renderOptions}
            maxDropdownHeight={300}
            placeholder={
              value && value.length > 0
                ? `${value.length} selected`
                : placeholder
            }
            searchable
            checkIconPosition="left"
            onChange={onChange}
            value={value}
            name={name}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            comboboxProps={{ withinPortal: false }}
            classNames={{
              input: "!hover:bg-none",
              inputField: "!hover:bg-none",
              pill: "!bg-[#ffffff] !hidden",
            }}
          />
        </div>
      )}
    </>
  );
};

export const MultiSelectInput = ({ error, ...rest }: MultiSelectInputProps) => {
  return (
    <Tooltip
      content={error}
      position={"bottom"}
      tooltipContainerClassName="w-full"
      arrowPosition="start"
      className="left-0 translate-x-0 max-w-full"
      disabled={error}
    >
      <MultiSelectInputEl {...rest} error={error} />
    </Tooltip>
  );
};
