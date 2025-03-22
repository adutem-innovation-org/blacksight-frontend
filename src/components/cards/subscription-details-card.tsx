import { FileText } from "lucide-react";

type CardProps = {
  header: string;
  content: string;
};

export const InvoiceCard = ({ header, content }: CardProps) => {
  return (
    <div className="bg-gray-50 rounded-2xl py-4 px-6 w-full">
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex justify-center items-center">
          <FileText className="stroke-emerald-600 w-4 h-4" />
        </div>
        <div>
          <p className="font-urbanist font-semibold text-sm text-gray-900">
            {header}
          </p>
          <p className="text-gray-400 text-sm font-sfpro">{content}</p>
        </div>
      </div>
    </div>
  );
};

export const ClientCard = ({ header, content }: CardProps) => {
  return (
    <div className="bg-gray-50 rounded-2xl py-4 px-6 w-full">
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex justify-center items-center">
          <FileText className="stroke-emerald-600 w-4 h-4" />
        </div>
        <div>
          <p className="font-urbanist font-semibold text-sm text-gray-900">
            {header}
          </p>
          <p className="text-gray-400 text-sm font-sfpro">{content}</p>
        </div>
      </div>
    </div>
  );
};
