import styled from "styled-components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Tooltip } from "../tooltips";

const inputVariants = cva(
  "w-full flex px-4 items-center gap-3 border border-[#F3F4F6] bg-[#042f5b0d] hover:bg-[#042f5b0d] rounded-[12px] relative cursor-pointer font-sfpro",
  {
    variants: {
      size: {
        sm: "h-10",
        md: "!h-[52px]",
        lg: "h-[56px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type Props = {
  validation: any;
  // validation: Pick<
  //     ReturnType<typeof useFormik>,
  //     | "handleChange"
  //     | "handleBlur"
  //     | "errors"
  //     | "touched"
  //     | "values"
  //     | "setFieldValue"
  //   >;
  defaultValue?: string;
  placeholder?: string;
  options?: string[];
  error?: string;
  name?: string;
} & VariantProps<typeof inputVariants>;

export const SelectInputComp = ({
  validation,
  defaultValue,
  placeholder,
  options,
  size,
  name,
}: Props) => {
  return (
    <Select
      onValueChange={(newValue: string) =>
        validation.setFieldValue(name, newValue)
      }
      defaultValue={defaultValue}
      name={name}
    >
      <CustomSelectTrigger className={cn(inputVariants({ size }))}>
        <SelectValue placeholder={placeholder} />
      </CustomSelectTrigger>
      <SelectContent
        className={cn("z-[100000010] text-gray-800 border-[lightgray]")}
      >
        {options &&
          options.map((opt) => (
            <SelectItem
              value={opt}
              className={cn(
                "px-4 py-2 cursor-pointer text-gray-800 font-sfpro"
              )}
              aria-roledescription="button"
              aria-role="button"
            >
              <span className="text-sm text-cartwey-black-40">
                {opt[0].toUpperCase()}
                {opt.slice(1)}
              </span>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

const CustomSelectTrigger = styled(SelectTrigger)`
  &.focus {
    outline: none !important;
    border: 1px solid lightgray;
    box-shadow: none;
  }

  &::focus {
    outline: none !important;
    border: 1px solid lightgray;
    box-shadow: none;
  }

  span {
    margin-left: 0px;
  }
`;

export const SelectInput = ({ error, ...rest }: Props) => {
  return (
    <Tooltip
      content={error}
      position={"bottom"}
      tooltipContainerClassName="w-full"
      arrowPosition="start"
      className="left-0 translate-x-0 max-w-full"
      disabled={!error}
    >
      <SelectInputComp {...rest} />
    </Tooltip>
  );
};
