import { useProfile } from "@/hooks";
import { ApiKey, PasswordUpdate, SecurityCard } from "./security";

export const Security = () => {
  const { user } = useProfile();

  return (
    <div className="px-8 py-6 grid grid-cols-1 gap-15 lg:grid-cols-2 lg:gap-6 xl:gap-16 max-h-full overflow-auto">
      <PasswordUpdate />

      <div>
        <div className="flex flex-col gap-6">
          {/* Tab Icon */}
          <div className="w-15 h-15 bg-brand/10 rounded-full flex items-center justify-center">
            <i className="fi fi-rr-key text-2xl flex text-brand"></i>
          </div>
          <h4 className="font-semibold text-xl text-gray-800">Api Key</h4>
          <p>
            API key is your gateway to accessing Blacksight API. Please keep
            safe
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <SecurityCard
            title="Blacksight App ID"
            value={user?.businessId}
            copiedText={user?.businessId}
          />
          <ApiKey />
        </div>
      </div>
    </div>
  );
};
