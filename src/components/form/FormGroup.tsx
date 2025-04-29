import { Input } from "./Input";
import React, { PropsWithChildren } from "react";
import { PasswordInput } from "./PasswordInput";
import { ComboboxItem, ComboboxLikeRenderOptionInput } from "@mantine/core";
import { DateInput } from "./DateInput";
import { MultiSelectInput } from "./MultiSelectInput";
import { SelectInput } from "./SelectInput";

interface FormGroupProps {
  type: "text" | "select" | "radio" | "password" | "date" | "multi-select";
  groupLabel?: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  size?: "sm" | "md" | "lg";
  name: string;
  disabled?: boolean;
  defaultValue?: string;
  value: string;
  onBlur: (e: any) => any;
  validation: any;
  maxLength?: number;
  minDate?: Date;
  multiSelectInputData?: Array<string>;
  renderOptions?: (
    item: ComboboxLikeRenderOptionInput<ComboboxItem>
  ) => React.ReactNode;
  options?: string[];
}

export const FormGroup = ({
  type,
  size,
  name,
  groupLabel,
  label,
  placeholder,
  onChange,
  onBlur,
  disabled,
  validation,
  value,
  maxLength,
  minDate,
  multiSelectInputData,
  renderOptions,
  defaultValue,
  options,
}: FormGroupProps) => {
  switch (type) {
    case "text":
      return (
        <GroupContainer>
          <Label>{groupLabel}</Label>
          <Input
            hasAction={false}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            size={size}
            name={name}
            disabled={disabled}
            value={value}
            error={validation.touched[name] && validation.errors[name]}
            maxLength={maxLength}
          />
        </GroupContainer>
      );
    case "password":
      return (
        <GroupContainer>
          <Label>{groupLabel}</Label>
          <PasswordInput
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            size={size}
            name={name}
            disabled={disabled}
            value={value}
            error={validation.touched[name] && validation.errors[name]}
          />
        </GroupContainer>
      );
    case "select":
      return (
        <GroupContainer>
          <Label>{groupLabel}</Label>
          <SelectInput
            validation={validation}
            defaultValue={defaultValue}
            options={options}
            size={size}
            placeholder={placeholder}
          />
        </GroupContainer>
      );
    case "date":
      return (
        <GroupContainer>
          <Label>{groupLabel}</Label>
          <DateInput
            placeholder={placeholder || label}
            onChange={onChange}
            minDate={minDate}
          />
        </GroupContainer>
      );
    case "multi-select":
      return (
        <GroupContainer>
          <Label>{groupLabel}</Label>
          <MultiSelectInput
            label={label}
            placeholder={placeholder || label}
            data={multiSelectInputData || []}
            renderOptions={renderOptions}
          />
        </GroupContainer>
      );
    default:
      return (
        <GroupContainer>
          <Label>{groupLabel}</Label>
          <Input
            hasAction={false}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            size={size}
            name={name}
            disabled={disabled}
            value={value}
            error={validation.touched[name] && validation.errors[name]}
            maxLength={maxLength}
          />
        </GroupContainer>
      );
      break;
  }
};

const GroupContainer = (props: PropsWithChildren) => {
  return <div className="flex flex-col gap-3 mt-6">{props.children}</div>;
};

const Label = (
  props: PropsWithChildren &
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >
) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className="font-urbanist font-semibold text-base text-black"
    >
      {props.children}
    </label>
  );
};
