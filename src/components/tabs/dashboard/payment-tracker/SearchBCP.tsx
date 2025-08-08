import { Button } from "@/components/form";
import { Paperclip } from "lucide-react";

export const SearchBCPs = ({
  onChange,
  value,
}: {
  onChange: (e: any) => void;
  value: string;
}) => {
  return (
    <div className="flex flex-col min-[400px]:flex-row justify-between items-stretch gap-4">
      <input
        className="flex-1 border border-gray-200 rounded-lg px-4 outline-none tracking-tight !text-sm font-medium bg-gray-100 text-black placeholder:text-gray-700 h-11 py-3 focus-within:border-gray-300 focus-within:border-2"
        placeholder="Search name or email..."
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
