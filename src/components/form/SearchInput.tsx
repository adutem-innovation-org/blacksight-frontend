import classNames from "classnames";
import { useMemo, useRef, useState } from "react";

type SearchInputProps = {
  placeholder?: string;
  name?: string;
  onChange: any;
  onBlur?: any;
  onFocus?: any;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
  value?: any;
};

export const SearchInput = ({
  placeholder,
  name,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  defaultValue = "",
  className,
}: SearchInputProps) => {
  const [searchText, setSearchText] = useState(defaultValue);
  const filled = useMemo(() => searchText.length > 0, [searchText]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | undefined>(undefined);

  const handleInputFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleInputBlur = () => {
    onBlur?.();
    setIsFocused(false);
  };

  const clearSearch = () => {
    setSearchText("");
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
    onChange(e);
  };

  return (
    <div
      className={classNames(
        "w-full max-w-96 flex px-3 h-10 items-center gap-3 border border-[#F3F4F6] bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded-[8px] relative",
        {
          "border-[#2563EB]": isFocused,
          "bg-[#F9FAFB]": disabled,
          "border-[#F3F4F6]": disabled,
          "pointer-events-none": disabled,
        },
        className
      )}
    >
      <i
        className={classNames("fi fi-rr-search flex w-4 h-4 font-in", {
          "text-[#9CA3AF]": !filled,
          "text-[#1F2937]": filled,
          "text-[#D1D5DB]": disabled,
        })}
      ></i>
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        name={name}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={searchText}
        disabled={disabled}
        className={classNames(
          "w-full p-0 outline-none outline-[0px] border-none border-[0px] bg-transparent h-auto shadow-none font-normal text-sm text-[#1F2937] placeholder:text-[#6B7280]",
          {
            "text-[#D1D5DB]": disabled,
            "placeholder:text-[#D1D5DB]": disabled,
          }
        )}
        onFocus={() => handleInputFocus()}
        ref={inputRef as any}
      />

      <div className="absolute flex items-center gap-2 right-0">
        {isFocused && filled && !disabled && (
          <button className="text-[#2563EB] text-sm cursor-pointer outline-none border-none">
            Search
          </button>
        )}
        {(isFocused || filled) && (
          <button onClick={() => clearSearch()} className="h-full p-2 pr-3">
            <i
              className={classNames(
                "fi fi-rr-cross-small flex text-[#9CA3AF] w-4 h-4 text-lg pointer-events-none",
                { "text-[#D1D5DB]": disabled }
              )}
            ></i>
          </button>
        )}
      </div>
    </div>
  );
};
