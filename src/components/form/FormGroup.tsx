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
import { Textarea } from "./Textarea";
import { PhoneInput } from "./PhoneInput";
import { CheckboxGroup, CheckboxItemType } from "./CheckboxGroup";
import { RadioGroup } from "./RadioGroup";
import { FileTypes } from "@/enums";

export type FormikValidation = Pick<
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

interface FormGroupProps {
  type:
    | "text"
    | "textarea"
    | "select"
    | "radio"
    | "password"
    | "date"
    | "date-time"
    | "multi-select"
    | "switch"
    | "file-input"
    | "multivalue-input"
    | "phone"
    | "checkbox-group"
    | "radio-group";
  groupLabel?: string;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  name: string;
  disabled?: boolean;
  defaultValue?: string;
  validation: FormikValidation;
  maxLength?: number;
  minDate?: Date;
  multiSelectInputData?: Array<string> | Record<string, any>[];
  renderOptions?: (
    item: ComboboxLikeRenderOptionInput<ComboboxItem>
  ) => React.ReactNode;
  options?: string[] | Record<string, any>[];
  containerClassName?: string;
  handleFileChange?: any;
  hidden?: boolean;
  inputRef?: any;
  accept?: string;
  fileTypes?: FileTypes[];
  maxFileSize?: string | number;
  removeSelectedFile?: (name: string) => void;
  info?: string;
  noOptionsContent?: any;
  checkboxItems?: CheckboxItemType[];
  radioOptions?: CheckboxItemType[] | string[];
  inputClassName?: string;
  action?: any;
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
  fileTypes,
  removeSelectedFile,
  info,
  noOptionsContent,
  checkboxItems,
  radioOptions,
  inputClassName,
  action,
  maxFileSize,
}: FormGroupProps) => {
  if (type === "checkbox-group" && !checkboxItems)
    throw Error("Checkbox items required for checkbox input");

  if (type === "radio-group" && !radioOptions)
    throw Error("Radio options required for radio group");

  const InfoTooltip = (
    <Tooltip
      content={info}
      position={"bottom"}
      tooltipContainerClassName="w-auto max-w-full"
      arrowPosition="start"
      className="left-0 translate-x-0 max-w-full text-primary"
      disabled={!info}
    >
      <Info className="text-brand !w-4 !h-4 cursor-pointer hidden md:block" />
    </Tooltip>
  );
  switch (type) {
    case "text":
      return (
        <GroupContainer className={containerClassName}>
          <div className="flex gap-1.5 items-center">
            <Label className="min-w-max">{groupLabel}</Label>
            {info && InfoTooltip}
          </div>
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
    case "textarea":
      return (
        <GroupContainer className={containerClassName}>
          <div className="flex gap-1.5 items-center">
            <Label className="min-w-max">{groupLabel}</Label>
            {info && InfoTooltip}
          </div>
          <Textarea
            placeholder={placeholder}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            size={size}
            name={name}
            disabled={disabled}
            value={validation.values[name]}
            error={validation.touched[name] && validation.errors[name]}
            maxLength={maxLength}
            inputClassName={inputClassName}
          />
        </GroupContainer>
      );
    case "password":
      return (
        <GroupContainer className={containerClassName}>
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
          <div className="flex gap-1.5 items-center">
            <Label className="min-w-max">{groupLabel}</Label>
            {info && InfoTooltip}
          </div>
          <SelectInput
            validation={validation}
            defaultValue={defaultValue}
            options={options}
            size={size}
            placeholder={placeholder}
            name={name}
            noOptionsContent={noOptionsContent}
            error={validation.touched[name] && validation.errors[name]}
            disabled={disabled}
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
          <div
            className={cn("flex gap-1.5 items-center", {
              "justify-between": action,
            })}
          >
            <div className="flex items-center gap-1.5">
              <Label className="min-w-max">{groupLabel}</Label>
              {info && InfoTooltip}
            </div>
            {action}
          </div>
          <MultiSelectInput
            placeholder={placeholder || label}
            data={multiSelectInputData || []}
            renderOptions={renderOptions}
            onChange={(value: DateValue) => {
              validation.setFieldValue(name, value);
            }}
            onBlur={validation.handleBlur}
            value={validation.values[name]}
            noOptionsContent={noOptionsContent}
            name={name}
            disabled={disabled}
            error={validation.touched[name] && validation.errors[name]}
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
          <div className="flex gap-1.5 items-center">
            <Label className="min-w-max">{groupLabel}</Label>
            {info && InfoTooltip}
          </div>
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
            <Label className="min-w-max">{groupLabel}</Label>
            {error && ErrorTooltip}
            {info && !error && InfoTooltip}
          </div>
          <FileInput
            name={name}
            onBlur={validation.handleBlur}
            handleFileChange={handleFileChange}
            accept={accept}
            fileTypes={fileTypes}
            disabled={disabled}
            hidden={hidden}
            inputRef={inputRef}
            value={validation.values[name]}
            removeSelectedFile={removeSelectedFile}
            error={validation.touched[name] && validation.errors[name]}
            maxFileSize={maxFileSize}
          />
        </GroupContainer>
      );
    }
    case "phone": {
      return (
        <GroupContainer className={containerClassName}>
          <div className="flex gap-1.5 items-center">
            <Label className="min-w-max">{groupLabel}</Label>
            {info && InfoTooltip}
          </div>
          <PhoneInput
            placeholder={placeholder || label}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name={name}
            size={size}
            disabled={disabled}
            value={validation.values[name]}
            error={validation.touched[name] && validation.errors[name]}
            maxLength={maxLength}
          />
        </GroupContainer>
      );
    }
    case "checkbox-group": {
      const showOthersInput = (validation.values[name] || []).includes(
        "Others"
      );
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
        <GroupContainer className={`${containerClassName}`}>
          <div className="flex gap-1.5 items-center">
            <Label>{groupLabel}</Label>
            {info && InfoTooltip}
            {error && ErrorTooltip}
          </div>
          <CheckboxGroup
            name={name}
            checkboxItems={checkboxItems || []}
            validation={validation}
            value={validation.values[name]}
            shouldHide={showOthersInput}
          />
          {showOthersInput && (
            <Textarea
              placeholder={"Enter text here..."}
              onChange={(e: any) => {
                validation.setFieldValue(name, ["Others", e.target.value]);
              }}
              onBlur={validation.handleBlur}
              name={name}
              disabled={disabled}
              value={validation.values[name][1] || ""}
            />
          )}
        </GroupContainer>
      );
    }
    case "radio-group": {
      const showOthersInput = validation.values[name] === "Others";
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
        <GroupContainer className={`${containerClassName}`}>
          <div className="flex gap-1.5 items-center">
            <Label>{groupLabel}</Label>
            {info && InfoTooltip}
            {error && ErrorTooltip}
          </div>
          <RadioGroup
            name={name}
            radioOptions={radioOptions || []}
            validation={validation}
            defaultValue={defaultValue || validation.values[name]}
          />
          {showOthersInput && (
            <Textarea
              placeholder={"Enter text here..."}
              onChange={validation.handleChange}
              size={"sm"}
              inputClassName={inputClassName}
              onBlur={validation.handleBlur}
              name={`${name}_others`}
              disabled={disabled}
              value={validation.values[`${name}_others`] || ""}
              error={
                validation.touched[`${name}_others`] &&
                validation.errors[`${name}_others`]
              }
              maxLength={40}
            />
          )}
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

const Label = ({
  className,
  ...props
}: PropsWithChildren &
  React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className={cn(
        "font-urbanist font-semibold text-base text-black",
        className
      )}
    >
      {props.children}
    </label>
  );
};
