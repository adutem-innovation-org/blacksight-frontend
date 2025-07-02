import { cn } from "@/lib/utils";
import { Checkbox } from "./Checkbox";
import { useFormik } from "formik";

export type CheckboxItemType = {
  label: string;
  value: string;
};

type CheckboxItemProps = {
  item: CheckboxItemType;
  name: string;
  values: string[];
  handleCheckedChange: (name: string, values: string[]) => void;
  hidden: boolean;
};

const CheckboxItem = ({
  item,
  name,
  values,
  handleCheckedChange,
  hidden,
}: CheckboxItemProps) => {
  const itemIdExtractor = item.value.toLowerCase().split(" ").join("-");

  return (
    <div className={cn("flex items-center mt-1 gap-3", { hidden: hidden })}>
      <Checkbox
        checked={values.includes(item.value)}
        name={name}
        id={itemIdExtractor}
        onCheckedChange={(checked) => {
          return checked
            ? handleCheckedChange(name, [...values, item.value])
            : handleCheckedChange(
                name,
                values.filter((value: string) => value !== item.value)
              );
        }}
      />
      <label
        className="text-sm text-gray-600 font-medium cursor-pointer"
        htmlFor={itemIdExtractor}
      >
        {item.value}
      </label>
    </div>
  );
};

type CheckboxGroupProps = {
  checkboxItems: CheckboxItemType[];
  name: string;
  value: any;
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
  shouldHide: boolean;
};

export const CheckboxGroup = ({
  checkboxItems,
  name,
  value,
  validation,
  shouldHide,
}: CheckboxGroupProps) => {
  return (
    <>
      {checkboxItems.map((item) => (
        <CheckboxItem
          name={name}
          item={item}
          values={value}
          handleCheckedChange={(name: string, value: string[]) => {
            if (value.includes("Others")) {
              validation.setFieldValue(name, ["Others"]);
            } else {
              validation.setFieldValue(name, value);
            }
          }}
          hidden={shouldHide && item.value !== "Others"}
        />
      ))}
    </>
  );
};
