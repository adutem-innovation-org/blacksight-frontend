import { useFormik } from "formik";
import { RadioGroupItem, RadioGroup as RadioGroupComp } from "./Radio";
import { CheckboxItemType } from "./CheckboxGroup";

const RadioItem = ({ data }: { data: CheckboxItemType | string }) => {
  const itemIdExtractor = (typeof data === "string" ? data : data.value)
    .toLowerCase()
    .split(" ")
    .join("-");
  return (
    <div className={"flex items-center mt-1 gap-3"}>
      <RadioGroupItem
        id={itemIdExtractor}
        value={typeof data === "string" ? data : data.value}
      />
      <label
        className="text-sm text-gray-600 font-medium cursor-pointer"
        htmlFor={itemIdExtractor}
      >
        {typeof data === "string" ? data : data.label}
      </label>
    </div>
  );
};

type RadioGroupProps = {
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
  name: string;
  radioOptions: CheckboxItemType[] | string[];
};

export const RadioGroup = ({
  defaultValue,
  validation,
  name,
  radioOptions,
}: RadioGroupProps) => {
  return (
    <RadioGroupComp
      defaultValue={defaultValue}
      className="flex flex-col"
      onValueChange={(value) => validation.setFieldValue(name, value)}
    >
      {radioOptions?.map((item) => (
        <RadioItem data={item} />
      ))}
    </RadioGroupComp>
  );
};
