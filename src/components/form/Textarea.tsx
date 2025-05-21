import { cva, VariantProps } from "class-variance-authority";
import { useRef, useState } from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import { Tooltip } from "../tooltips";

const inputContainerClassNames =
  "password-root w-full p-4 gap-3 border border-[#F3F4F6] bg-[#042f5b0d] hover:bg-[#042f5b0d] rounded-[12px] relative cursor-pointer";

const inputVariants = cva("", {
  variants: {
    size: {
      sm: "h-30",
      md: "h-40",
      lg: "h-50",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const InputEl = styled.textarea``;

export type TextareaProps = {
  placeholder?: string;
  name?: string;
  onChange: any;
  onBlur?: any;
  onFocus?: any;
  disabled?: boolean;
  value: string;
  error?: any;
  placeholderClassNames?: string;
  maxLength?: number;
} & VariantProps<typeof inputVariants>;

const InputComp = ({
  placeholder,
  name,
  onChange,
  onBlur,
  onFocus,
  size,
  error,
  disabled = false,
  value,
  maxLength,
}: TextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | undefined>(undefined);

  const handleInputFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleInputBlur = (e: any) => {
    onBlur?.(e);
    setIsFocused(false);
  };

  const onClickRoot = (e: any) => {
    if (e.target.matches(".password-root")) {
      const valueLength = inputRef?.current?.value.length!;
      inputRef?.current?.focus();
      inputRef?.current?.setSelectionRange(valueLength, valueLength);
    }
  };

  return (
    <div
      className={cn(inputContainerClassNames, {
        "border-[#2563EB]": isFocused && !error,
        "bg-[#F9FAFB]": disabled,
        "border-[#F3F4F6]": disabled,
        "border-[#E11D48]": error && !disabled,
        "pointer-events-none": disabled,
      })}
      onClick={onClickRoot}
    >
      {/* Input */}
      <InputEl
        id={name}
        name={name}
        onChange={onChange}
        onBlur={handleInputBlur}
        value={value}
        disabled={disabled}
        autoFocus={false}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cn(
          inputVariants({ size }),
          "w-full p-0 outline-none outline-[0px] border-none border-[0px] bg-transparent shadow-none font-normal text-sm text-[#1F2937] placeholder:text-[#6B7280] font-sfpro",
          {
            "text-[#D1D5DB]": disabled,
            "placeholder:text-[#D1D5DB]": disabled,
          }
        )}
        onFocus={() => handleInputFocus()}
        ref={inputRef as any}
      />
    </div>
  );
};

export const Textarea = ({ error, ...rest }: TextareaProps) => {
  return (
    <Tooltip
      content={error}
      position={"bottom"}
      tooltipContainerClassName="w-full"
      arrowPosition="start"
      className="left-0 translate-x-0 max-w-full"
      disabled={!error}
    >
      <InputComp {...rest} error={error} />
    </Tooltip>
  );
};
