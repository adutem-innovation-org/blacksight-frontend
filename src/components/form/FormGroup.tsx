import { Input } from "./Input";
import React, { PropsWithChildren } from "react";
import { PasswordInput } from "./PasswordInput";
import { ComboboxItem, ComboboxLikeRenderOptionInput } from "@mantine/core";
import { DateInput } from "./DateInput";
import { MultiSelectInput } from "./MultiSelectInput";
import { SelectInput } from "./SelectInput";
import { cn } from "@/lib/utils";
import { Switch } from "./Switch";
import { FileInput } from "./FileInput";
import { useFormik } from "formik";
import { MultipleValueTextInput } from "./MultiValueTextInput";
import { Info } from "lucide-react";
import { Tooltip } from "../tooltips";
import { DateValue } from "@mantine/dates";

interface FormGroupProps {
  type:
    | "text"
    | "select"
    | "radio"
    | "password"
    | "date"
    | "date-time"
    | "multi-select"
    | "switch"
    | "file-input"
    | "multivalue-input";
  groupLabel?: string;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  name: string;
  disabled?: boolean;
  defaultValue?: string;
  validation: Pick<
    ReturnType<typeof useFormik>,
    | "handleChange"
    | "handleBlur"
    | "errors"
    | "touched"
    | "errors"
    | "values"
    | "setFieldValue"
    | "setFieldTouched"
  >;
  maxLength?: number;
  minDate?: Date;
  multiSelectInputData?: Array<string>;
  renderOptions?: (
    item: ComboboxLikeRenderOptionInput<ComboboxItem>
  ) => React.ReactNode;
  options?: string[];
  containerClassName?: string;
  handleFileChange?: any;
  hidden?: boolean;
  inputRef?: any;
  accept?: string;
  removeSelectedFile?: (name: string) => void;
}

export const FormGroup = ({
  type,
  size,
  name,
  groupLabel,
  label,
  placeholder,
  disabled,
  validation,
  maxLength,
  minDate,
  multiSelectInputData,
  renderOptions,
  defaultValue,
  options,
  containerClassName,
  handleFileChange,
  hidden,
  inputRef,
  accept,
  removeSelectedFile,
}: FormGroupProps) => {
  switch (type) {
    case "text":
      return (
        <GroupContainer className={containerClassName}>
          <Label>{groupLabel}</Label>
          <Input
            hasAction={false}
            type={type}
            placeholder={placeholder}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            size={size}
            name={name}
            disabled={disabled}
            value={validation.values[name]}
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
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            size={size}
            name={name}
            disabled={disabled}
            value={validation.values[name]}
            error={validation.touched[name] && validation.errors[name]}
          />
        </GroupContainer>
      );
    case "select":
      return (
        <GroupContainer className={containerClassName}>
          <Label>{groupLabel}</Label>
          <SelectInput
            validation={validation}
            defaultValue={defaultValue}
            options={options}
            size={size}
            placeholder={placeholder}
            name={name}
          />
        </GroupContainer>
      );
    case "date":
      return (
        <GroupContainer className={containerClassName}>
          <Label>{groupLabel}</Label>
          <DateInput
            placeholder={placeholder || label}
            onChange={(value: DateValue) => {
              validation.setFieldValue(name, value);
            }}
            onBlur={validation.handleBlur}
            name={name}
            disabled={disabled}
            value={validation.values[name]}
            minDate={minDate}
            error={validation.touched[name] && validation.errors[name]}
          />
        </GroupContainer>
      );
    case "date-time":
      return (
        <GroupContainer className={containerClassName}>
          <Label>{groupLabel}</Label>
          <DateInput
            placeholder={placeholder || label}
            onChange={(value: DateValue) => {
              validation.setFieldValue(name, value);
            }}
            onBlur={validation.handleBlur}
            name={name}
            disabled={disabled}
            value={validation.values[name]}
            includeTime={true}
            minDate={minDate}
            error={validation.touched[name] && validation.errors[name]}
          />
        </GroupContainer>
      );
    case "multi-select":
      return (
        <GroupContainer className={containerClassName}>
          <Label>{groupLabel}</Label>
          <MultiSelectInput
            label={label}
            placeholder={placeholder || label}
            data={multiSelectInputData || []}
            renderOptions={renderOptions}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values[name]}
            name={name}
          />
        </GroupContainer>
      );
    case "multivalue-input":
      return (
        <GroupContainer className={containerClassName}>
          <Label>{groupLabel}</Label>
          <MultipleValueTextInput
            name={name}
            placeholder={placeholder}
            values={validation.values[name]}
            onItemAdded={(_, allItem) =>
              validation.setFieldValue(name, allItem)
            }
            onItemDeleted={(_, allItem) =>
              validation.setFieldValue(name, allItem)
            }
            size={size}
            shouldAddOnBlur
            error={validation.touched[name] && validation.errors[name]}
            disabled={disabled}
            onBlur={onblur}
          />
        </GroupContainer>
      );
    case "switch":
      return (
        <GroupContainer
          className={`${containerClassName} flex-row justify-between items-center`}
        >
          <Label>{groupLabel}</Label>
          <Switch
            name={name}
            checked={validation.values[name]}
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            onCheckedChange={(checked) => {
              validation.setFieldValue(name, checked);
            }}
            disabled={disabled}
          />
        </GroupContainer>
      );
    case "file-input": {
      const error: any = validation.touched[name] && validation.errors[name];
      const ErrorTooltip = (
        <Tooltip
          content={error}
          position={"bottom"}
          tooltipContainerClassName="w-full"
          arrowPosition="start"
          className="left-0 translate-x-0 max-w-full"
          disabled={!error}
        >
          <Info className="text-red-500 !w-4 !h-4 cursor-pointer" />
        </Tooltip>
      );
      return (
        <GroupContainer className={containerClassName}>
          <div className="flex gap-1.5 items-center">
            <Label>{groupLabel}</Label>
            {error && ErrorTooltip}
          </div>
          <FileInput
            name={name}
            onBlur={validation.handleBlur}
            handleFileChange={handleFileChange}
            accept={accept}
            disabled={disabled}
            hidden={hidden}
            inputRef={inputRef}
            value={validation.values[name]}
            removeSelectedFile={removeSelectedFile}
            error={validation.touched[name] && validation.errors[name]}
          />
        </GroupContainer>
      );
    }
    default:
      return (
        <GroupContainer className={containerClassName}>
          <Label>{groupLabel}</Label>
          <Input
            hasAction={false}
            type={type}
            placeholder={placeholder}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            size={size}
            name={name}
            disabled={disabled}
            value={validation.values[name]}
            error={validation.touched[name] && validation.errors[name]}
            maxLength={maxLength}
          />
        </GroupContainer>
      );
      break;
  }
};

const GroupContainer = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  return (
    <div className={cn("flex flex-col gap-3 mt-6", props.className)}>
      {props.children}
    </div>
  );
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
