import { Button } from "@/components/form";
import { Paperclip } from "lucide-react";

export const SearchSection = ({
  onChange,
  value,
  openUploadForm,
}: {
  onChange: (e: any) => void;
  value: string;
  openUploadForm: () => void;
}) => {
  return (
    <div className="flex flex-col min-[400px]:flex-row justify-between items-stretch gap-4">
      <input
        className="flex-1 border border-gray-200 rounded-lg px-4 outline-none tracking-tight !text-sm font-medium bg-gray-100 text-black placeholder:text-gray-700 h-11 py-3 focus-within:border-gray-300 focus-within:border-2"
        placeholder="Search Payment file..."
        onChange={onChange}
        value={value}
      />
      <Button
        className="rounded-lg !text-sm h-11"
        size={"sm"}
        type="button"
        onClick={openUploadForm}
      >
        Upload file <Paperclip />
      </Button>
    </div>
  );
};
