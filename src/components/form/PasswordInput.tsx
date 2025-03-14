import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";
import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Tooltip } from "../tooltips";

const passwordVariants = cva(
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

export type PasswordInputProps = {
  placeholder?: string;
  name?: string;
  onChange: any;
  onBlur?: any;
  onFocus?: any;
  disabled?: boolean;
  value: string;
  error?: string;
  className?: string;
} & VariantProps<typeof passwordVariants>;

const PasswordInputComp = ({
  placeholder,
  name,
  onChange,
  onBlur,
  onFocus,
  size,
  error,
  disabled = false,
  value,
  className,
}: PasswordInputProps) => {
  const filled = useMemo(() => value.length > 0, [value]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | undefined>(undefined);
  const [hideValue, setHideValue] = useState(true);

  const handleInputFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleInputBlur = (e: any) => {
    onBlur?.(e);
    setIsFocused(false);
  };

  const toggleHideValue = () => {
    setHideValue((prev) => !prev);
  };

  const EyeIcon = useMemo(() => (hideValue ? Eye : EyeOff), [hideValue]);

  const onClickRoot = (e: any) => {
    if (e.target.matches(".password-root")) {
      const valueLength = inputRef?.current?.value.length!;
      inputRef?.current?.focus();
      inputRef?.current?.setSelectionRange(valueLength, valueLength);
    }
  };

  return (
    <div
      className={cn(
        passwordVariants({ size }),
        {
          "border-[#2563EB]": isFocused && !error,
          "bg-[#F9FAFB]": disabled,
          "border-[#F3F4F6]": disabled,
          "border-[#E11D48]": error && !disabled,
          "pointer-events-none": disabled,
        },
        className
      )}
      onClick={onClickRoot}
    >
      {/* Form group */}
      <div className="flex-1">
        {/* Input */}
        <InputEl
          type={hideValue ? "password" : "text"}
          name={name}
          id={name}
          onChange={onChange}
          onBlur={handleInputBlur}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          className={classNames(
            "w-full p-0 outline-none outline-[0px] border-none border-[0px] bg-transparent h-auto shadow-none font-normal font-sfpro text-sm text-[#1F2937] placeholder:text-[#6B7280]",
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
      <div className={cn("right-0 block", { flex: filled })}>
        <button
          onClick={() => toggleHideValue()}
          className="h-full p-2 pr-3 flex items-center gap-2 cursor-pointer"
          type="button"
        >
          <p
            className={"text-[#9CA3AF] text-sm outline-none border-none block"}
          >
            {hideValue ? "Show" : "Hide"}
          </p>
          <EyeIcon
            className={classNames(
              "fi fi-rr-cross-small flex text-[#374151] w-4 h-4 text-lg pointer-events-none",
              { "text-[#D1D5DB]": disabled }
            )}
          />
        </button>
      </div>
    </div>
  );
};

export const PasswordInput = ({ error, ...rest }: PasswordInputProps) => {
  return (
    <Tooltip
      content={error}
      position={"bottom"}
      tooltipContainerClassName="w-full"
      arrowPosition="start"
      className="left-0 translate-x-0 max-w-full"
      disabled={!error}
    >
      <PasswordInputComp {...rest} error={error} />
    </Tooltip>
  );
};
