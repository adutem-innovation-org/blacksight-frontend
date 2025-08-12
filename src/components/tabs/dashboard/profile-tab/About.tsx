import { useProfile } from "@/hooks";
import { useMemo } from "react";

export const ProfileAboutSection = () => {
  const { user } = useProfile();

  const data = useMemo(() => {
    return [
      {
        label: "Full Name",
        value: user?.firstName + " " + user?.lastName,
      },
      {
        label: "Email",
        value: user?.email,
      },
      {
        label: "Phone",
        value: user?.phone ? user.phone : "-",
      },
      {
        label: "Address",
        value:
          user?.addressInfo.city || user?.addressInfo.country
            ? `${user?.addressInfo?.city}, ` + user?.addressInfo?.country
            : "-",
      },
      {
        label: "Join Date",
        value: user?.createdAt
          ? new Date(user?.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          : "-",
      },
    ];
  }, [user]);

  return (
    <div className="h-max shadow-sm rounded-sm bg-white p-4">
      <div className="overflow-hidden">
        <h4 className="font-medium tracking-tight font-dmsans text-brand">
          Personal Info
        </h4>

        <ul className="flex flex-col gap-4 mt-5">
          {data.map((item, index) => (
            <li
              key={index}
              className="font-dmsans tracking-tight grid grid-cols-[80px_1fr] sm:grid-cols-[90px_1fr] md:grid-cols-[100px_1fr] xl:grid-cols-[80px_1fr] gap-2 sm:gap-10 md:gap-16 lg:gap-20 xl:gap-2 text-sm"
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
