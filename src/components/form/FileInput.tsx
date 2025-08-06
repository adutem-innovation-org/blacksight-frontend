import React, { useRef } from "react";
import { Button } from "./Button";
import { FileUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../badge";
import { FileTypes } from "@/enums";

type Props = {
  name: string;
  onBlur: any;
  handleFileChange?: any;
  disabled?: boolean;
  hidden?: boolean;
  inputRef?: any;
  accept?: string;
  value?: any;
  removeSelectedFile?: (name: string) => void;
  error?: any;
  fileTypes?: FileTypes[];
  maxFileSize?: string | number;
};

export const FileInput = ({
  name,
  onBlur,
  handleFileChange,
  disabled,
  hidden,
  inputRef,
  accept,
  value,
  removeSelectedFile,
  error,
  fileTypes,
  maxFileSize,
}: Props) => {
  const ref = useRef<any>(null);

  const openFileExplorer = () => {
    !disabled &&
      (inputRef?.current || ref.current.previousElementSibling)?.click();
  };
  return (
    <React.Fragment>
      {value && (
        <div className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mb-1 justify-between">
          <span>{value}</span>
          <button
            type="button"
            onClick={() => removeSelectedFile?.(name)}
            className="ml-2 hover:text-red-500 pointer"
          >
            <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500" />
          </button>
        </div>
      )}
      <input
        type={"file"}
        name={name}
        onBlur={onBlur}
        onChange={handleFileChange}
        disabled={disabled}
        hidden={hidden ?? true}
        ref={inputRef}
        accept={accept}
      />
      {/* {!value && ( */}
      <div
        className={cn(
          "h-[200px] w-full rounded-lg border-2 border-gray-200 border-dashed",
          {
            "border-[#E11D48]": error && !disabled,
          }
        )}
        ref={ref}
      >
        <div className="w-full h-full flex flex-col justify-center gap-2 items-center">
          <Button
            variant={"secondary_gray"}
            className="rounded-full border-none bg-gray-100 w-14 h-14 hover:bg-gray-200 mb-1"
            type="button"
            onClick={openFileExplorer}
          >
            <i className="fi fi-rr-file-upload flex text-brand text-2xl"></i>
          </Button>
          <div className="flex flex-col items-center">
            <div className="flex items-baseline flex-col sm:flex-row gap-0 sm:gap-1.5 leading-tight">
              <Button
                variant={"link"}
                className="text-brand p-0 hover:no-underline h-auto leading-tight !text-sm 
                !font-dmsans tracking-tight !font-medium"
                type="button"
                onClick={openFileExplorer}
              >
                Click to Upload
              </Button>{" "}
              <span className="leading-tight text-sm tracking-tight font-dmsans font-medium">
                or drag and drop
              </span>
            </div>

            {maxFileSize && (
              <p className="font-dmsans font-medium text-xs mt-0.5 text-gray-500">
                (Max file size: {maxFileSize}MB)
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {fileTypes?.map((item: any, index: number) => (
              <Badge variant={"gray"} size={"sm"}>
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      {/* )} */}
    </React.Fragment>
  );
};
