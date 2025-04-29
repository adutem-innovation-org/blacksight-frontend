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
};

export const MultiSelectInput = ({
  label,
  placeholder,
  data,
  renderOptions,
}: MultiSelectInputProps) => {
  return (
    <MultiSelect
      data={data}
      renderOption={renderOptions}
      maxDropdownHeight={300}
      placeholder={placeholder}
      searchable
      checkIconPosition="left"
    />
  );
};
