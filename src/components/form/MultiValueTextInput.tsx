import React, { useEffect, useRef, useState, useMemo } from "react";
import { cva, VariantProps } from "class-variance-authority";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import { Tooltip } from "../tooltips";
import { X } from "lucide-react";

const inputVariants = cva(
  "w-full flex px-4 items-center gap-3 border border-[#F3F4F6] bg-[#042f5b0d] hover:bg-[#042f5b0d] rounded-[12px] relative cursor-text",
  {
    variants: {
      size: {
        sm: "h-10",
        md: "h-[52px]",
        lg: "h-[56px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const InputEl = styled.input``;

export interface MultipleValueTextInputProps
  extends VariantProps<typeof inputVariants> {
  values?: string[];
  onItemAdded: (item: string, allItems: string[]) => void;
  onItemDeleted: (item: string, remainingItems: string[]) => void;
  label?: string;
  name: string;
  placeholder?: string;
  submitKeys?: string[];
  deleteButton?: React.ReactNode;
  shouldAddOnBlur?: boolean;
  className?: string;
  labelClassName?: string;
  error?: any;
  disabled?: boolean;
  onBlur?: any;
}

const MultipleValueTextInputComp: React.FC<MultipleValueTextInputProps> = ({
  placeholder = "",
  name,
  deleteButton = (
    <X className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
  ),
  onItemAdded,
  onItemDeleted,
  className = "",
  submitKeys = ["Enter", ","],
  values: initialValues = [],
  shouldAddOnBlur = false,
  size,
  error,
  disabled,
  onBlur,
}) => {
  const [values, setValues] = useState<string[]>(initialValues);
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const nonCharacterKeyLabels = ["Enter", "Tab"];
  const delimiters = submitKeys.filter(
    (k) => !nonCharacterKeyLabels.includes(k)
  );

  useEffect(() => {
    setValues(initialValues);
  }, [JSON.stringify(initialValues)]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleItemAdd = (addedValue: string) => {
    if (values.includes(addedValue.trim()) || !addedValue.trim()) {
      setValue("");
      return;
    }
    const newValues = [...values, addedValue.trim()];
    setValues(newValues);
    setValue("");
    onItemAdded(addedValue.trim(), newValues);
  };

  const handleItemsAdd = (addedValues: string[]) => {
    const uniqueValues = Array.from(
      new Set(
        addedValues.map((v) => v.trim()).filter((v) => v && !values.includes(v))
      )
    );
    if (uniqueValues.length > 0) {
      const newValues = [...values, ...uniqueValues];
      setValues(newValues);
      setValue("");
      uniqueValues.forEach((v) => onItemAdded(v, newValues));
    } else {
      setValue("");
    }
  };

  const handleItemRemove = (removedValue: string) => {
    const newValues = values.filter((v) => v !== removedValue);
    onItemDeleted(removedValue, newValues);
    setValues(newValues);
  };

  const splitMulti = (str: string) => {
    const tempChar = delimiters[0];
    let result = str;
    for (let i = 1; i < delimiters.length; i++) {
      result = result.split(delimiters[i]).join(tempChar);
    }
    return result.split(tempChar);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text/plain");
    const shouldSplit = delimiters.some((d) => pasted.includes(d));
    if (shouldSplit) {
      e.preventDefault();
      handleItemsAdd(splitMulti(pasted));
    }
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (submitKeys.includes(e.key)) {
      e.preventDefault();
      handleItemAdd(value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (shouldAddOnBlur) {
      e.preventDefault();
      handleItemAdd(value);
    }
    handleInputBlur(e);
  };

  const valueDisplays = useMemo(() => {
    return values.map((v) => (
      <div
        key={v}
        className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mb-1"
      >
        <span>{v}</span>
        <button
          type="button"
          onClick={() => handleItemRemove(v)}
          className="ml-2 hover:text-red-500"
        >
          {deleteButton}
        </button>
      </div>
    ));
  }, [values]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-1 mb-1">
        {valueDisplays}
      </div>
      <div
        className={cn(inputVariants({ size }), className, {
          "border-[#2563EB]": isFocused && !error,
          "bg-[#F9FAFB]": disabled,
          "border-[#F3F4F6]": disabled,
          "border-[#E11D48]": error && !disabled,
          "pointer-events-none": disabled,
        })}
      >
        <InputEl
          ref={inputRef}
          name={name}
          placeholder={placeholder}
          value={value}
          type="text"
          onChange={handleValueChange}
          onKeyDown={handleKeypress}
          onPaste={handlePaste}
          onBlur={handleBlur}
          onFocus={handleInputFocus}
          className="w-full border-none bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
        />
      </div>
    </div>
  );
};

export const MultipleValueTextInput = ({
  error,
  ...rest
}: MultipleValueTextInputProps) => {
  return (
    <Tooltip
      content={error}
      position={"bottom"}
      tooltipContainerClassName="w-full"
      arrowPosition="start"
      className="left-0 translate-x-0 max-w-full"
      disabled={!error}
    >
      <MultipleValueTextInputComp {...rest} error={error} />
    </Tooltip>
  );
};
