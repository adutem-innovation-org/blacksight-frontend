import React, { useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import { Tooltip } from "../tooltips";
import PhoneInputEl from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

export interface PhoneInputProps extends VariantProps<typeof inputVariants> {
  name?: string;
  error?: any;
  onBlur?: any;
  onFocus?: any;
  onChange?: any;
  disabled?: boolean;
  placeholder?: string;
  value?: any;
  maxLength?: number;
}

const PhoneInputComp: React.FC<PhoneInputProps> = ({
  placeholder,
  name,
  error,
  onBlur,
  onFocus,
  onChange,
  disabled,
  value,
  maxLength,
  size,
}) => {
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
        inputVariants({ size }),
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
      <PhoneInputEl
        country={"us"}
        value={value}
        inputProps={{ id: name, name, maxLength }}
        onChange={(value, data, e) => onChange(e)}
        disabled={disabled}
        dropdownStyle={{
          padding: "12px",
        }}
        dropdownClass={cn(
          "border text-xs outline-none font-medium text-gray-800 border-[lightgray]"
        )}
        inputStyle={{
          padding: "0px 16px 0px 48px",
          fontSize: "14px",
          height: "auto",
          border: "none",
          background: "transparent",
          fontFamily: "var(--sfpro)",
          color: "#1F2937",
        }}
        buttonClass={cn("text-[#1F2937]")}
        buttonStyle={{
          border: "none",
          background: "transparent",
        }}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        placeholder={placeholder}
      />
    </div>
  );
};

export const PhoneInput = ({ error, ...rest }: PhoneInputProps) => {
  return (
    <Tooltip
      content={error}
      position={"bottom"}
      tooltipContainerClassName="w-full"
      arrowPosition="start"
      className="left-0 translate-x-0 max-w-full"
      disabled={!error}
    >
      <PhoneInputComp {...rest} error={error} />
    </Tooltip>
  );
};
