import { useProfile } from "@/hooks";
import { useMemo } from "react";

export const PersonalAddressInfo = () => {
  const { user } = useProfile();

  const data = useMemo(() => {
    return [
      {
        label: "Country",
        value: user?.addressInfo.country ?? "-",
      },
      {
        label: "City",
        value: user?.addressInfo.city ?? "-",
      },
      {
        label: "State",
        value: user?.addressInfo.state ?? "-",
      },
      {
        label: "Postal Code",
        value: user?.addressInfo.zipCode ?? "-",
      },
    ];
  }, [user]);

  return (
    <div className="h-max shadow-sm rounded-sm bg-white">
      <div className="p-4">
        <h4 className="font-medium tracking-tight font-dmsans text-brand">
          Address
        </h4>

        <ul className="flex flex-col gap-4 mt-5">
          {data.map((item, index) => (
            <li
              key={index}
              className="font-dmsans tracking-tight grid grid-cols-[90px_1fr] sm:grid-cols-[10px_1fr] md:grid-cols-[100px_1fr] xl:grid-cols-[100px_1fr] gap-2 sm:gap-10 md:gap-16 lg:gap-20 xl:gap-2 text-sm"
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
