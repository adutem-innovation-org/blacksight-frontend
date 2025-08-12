import { useProfile } from "@/hooks";
import { useMemo } from "react";

export const BusinessContactInfo = () => {
  const { user } = useProfile();

  const data = useMemo(() => {
    const businessData = user?.businessInfo;
    return [
      {
        label: "Contact Name",
        value: businessData?.contactName ?? "-",
      },
      {
        label: "Email",
        value: businessData?.contactEmail ?? "-",
      },
      {
        label: "Phone",
        value: businessData?.contactTel ?? "-",
      },
    ];
  }, [user]);

  return (
    <div className="shadow-sm rounded-sm bg-white p-4">
      <div className="overflow-hidden">
        <h4 className="font-medium tracking-tight font-dmsans text-brand">
          Contact Info
        </h4>

        <ul className="flex flex-col gap-4 mt-5">
          {data.map((item, index) => (
            <li
              key={index}
              className="font-dmsans tracking-tight grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] md:grid-cols-[140px_1fr]  gap-2 sm:gap-10 md:gap-16 lg:gap-20 text-sm"
            >
              <span className="text-[#000] break-words">
                <b>{item.label}:</b>
              </span>
              <span className="text-gray-600">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
