import { useProfile } from "@/hooks";
import { BasicInfo, ContactInfo } from "./business-info";

export const BusinessInfo = () => {
  const { user } = useProfile();

  return (
    <div className="px-8 py-4">
      <h4 className="font-semibold text-xl text-gray-800 mb-8">
        Business Information
      </h4>
      <div className="flex flex-col gap-6">
        <BasicInfo user={user} />
        <ContactInfo user={user} />
      </div>
    </div>
  );
};
