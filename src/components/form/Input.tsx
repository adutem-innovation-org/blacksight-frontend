import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";
import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { Tooltip } from "../tooltips";

const inputVariants = cva(
  "password-root w-full flex px-4 items-center gap-3 border border-[#F3F4F6] bg-[#042f5b0d] hover:bg-[#042f5b0d] rounded-[12px] relative cursor-pointer",
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

export type InputProps = {
  placeholder?: string;
  name?: string;
  onChange: any;
  onBlur?: any;
  onFocus?: any;
  disabled?: boolean;
  value: string;
  error?: string;
  hasAction?: boolean;
  hasIcon?: boolean;
  placeholderClassNames?: string;
  Icon?: any;
  onClickAction?(...args: any): any;
  actionText?: string;
  type?: string;
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
  hasAction = false,
  hasIcon = false,
  Icon,
  onClickAction,
  actionText,
  type = "text",
  maxLength,
}: InputProps) => {
  const filled = useMemo(() => value.length > 0, [value]);
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
      className={cn(inputVariants({ size }), {
        "border-[#2563EB]": isFocused && !error,
        "bg-[#F9FAFB]": disabled,
        "border-[#F3F4F6]": disabled,
        "border-[#E11D48]": error && !disabled,
        "pointer-events-none": disabled,
      })}
      onClick={onClickRoot}
    >
      {hasIcon && (
        <Settings
          className={cn("w-4 h-4 flex", {
            "text-[#9CA3AF]": !filled,
            "text-[#1F2937]": filled || isFocused,
            "text-[#D1D5DB]": disabled,
          })}
        />
      )}
      {/* Form group */}
      <div className="flex flex-col w-full">
        {/* Input */}
        <InputEl
          type={type}
          id={name}
          name={name}
          onChange={onChange}
          onBlur={handleInputBlur}
          value={value}
          disabled={disabled}
          autoFocus={false}
          placeholder={placeholder}
          maxLength={maxLength}
          className={classNames(
            "w-full p-0 outline-none outline-[0px] border-none border-[0px] bg-transparent h-auto shadow-none font-normal text-sm text-[#1F2937] placeholder:text-[#6B7280] font-sfpro",
            {
              "text-[#D1D5DB]": disabled,
              "placeholder:text-[#D1D5DB]": disabled,
            }
          )}
          onFocus={() => handleInputFocus()}
          ref={inputRef as any}
        />
      </div>

      {/* Action button */}
      {hasAction && (
        <div
          className={cn("absolute items-center right-0 hidden", {
            flex: filled,
          })}
        >
          <p
            className={"text-[#9CA3AF] text-sm outline-none border-none block"}
          >
            {actionText}
          </p>

          <button onClick={() => onClickAction?.()} className="h-full p-2 pr-3">
            <Icon
              className={classNames(
                "fi fi-rr-cross-small flex text-[#374151] w-4 h-4 text-lg pointer-events-none",
                { "text-[#D1D5DB]": disabled }
              )}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export const Input = ({ error, ...rest }: InputProps) => {
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
