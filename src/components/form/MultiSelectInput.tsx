import {
  MultiSelect,
  ComboboxLikeRenderOptionInput,
  ComboboxItem,
} from "@mantine/core";

type MultiSelectInputProps = {
  label?: string;
  placeholder?: string;
  data: Array<string>;
  renderOptions?: (
    item: ComboboxLikeRenderOptionInput<ComboboxItem>
  ) => React.ReactNode;
  onChange?: any;
  onBlur?: any;
  name: string;
  value?: any;
};

export const MultiSelectInput = ({
  label,
  placeholder,
  data,
  renderOptions,
  onChange,
  onBlur,
  value,
  name,
}: MultiSelectInputProps) => {
  return (
    <MultiSelect
      data={data}
      renderOption={renderOptions}
      maxDropdownHeight={300}
      placeholder={placeholder}
      searchable
      checkIconPosition="left"
      onChange={onChange}
      value={value}
      name={name}
      onBlur={onBlur}
    />
  );
};
