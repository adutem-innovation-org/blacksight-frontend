// import { PropsWithChildren } from "react";
// import blacksightAuthBg from "@/assets/images/blacksight-auth-bg.jpg";
// import noiseBg from "@/assets/images/noise-bg.png";

// export const AuthPageLayout = (props: PropsWithChildren) => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 w-dvw min-h-dvh overflow-auto md:overflow-hidden bg-gray-100">
//       <div className="w-full h-dvh max-h-dvh overflow-hidden hidden lg:block relative">
//         <div
//           className="w-full h-full absolute z-4 opacity-[0.06] top-0 left-0"
//           style={{ background: `url(${noiseBg})` }}
//         ></div>
//         <div
//           className="bg-cover w-full h-full absolute z-5 top-0 left-0"
//           style={{
//             background: `linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.4))`,
//           }}
//         ></div>
//         <img
//           src={blacksightAuthBg}
//           className="w-full h-full object-center object-cover"
//         />
//       </div>
//       <div className="w-full h-full md:max-h-dvh flex flex-col justify-between items-center py-10 max-h-max my-auto gap-20 overflow-auto">
//         {props.children}
//       </div>
//     </div>
//   );
// };


import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import botIcon from "@/assets/images/botIcon.png";


interface AuthPageLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
}

export const AuthPageLayout = ({
  title,
  description,
  children,
}: AuthPageLayoutProps) => {
  const [time, setTime] = useState("");



  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setTime(now.toLocaleTimeString([], options));
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);


  return (
    // <div className="grid grid-cols-1 lg:grid-cols-2 w-dvw min-h-dvh">
    <div className="grid grid-cols-1 lg:grid-cols-2 w-dvw min-h-dvh overflow-auto md:overflow-hidden">

      {/* ✅ LEFT SIDE (Blue background + text) */}

      <div className="relative hidden lg:flex flex-col justify-center items-center text-center p-10 text-white bg-gradient-to-b from-[#3975D0] to-[#1D3C6A]">
        {/* Icon */}
        <div className="mb-6">
          <img src={botIcon} className="max-h-70 object-contain" />


        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h1>
          <p className="text-xs sm:text-sm md:text-base max-w-sm whitespace-pre-line text-left">
            {description}
          </p>

        </div>

        {/* Optional Time */}
        {time && (
          <div className="absolute bottom-4 left-4 text-xs sm:text-sm">
            {time}
          </div>
        )}
      </div>


      <div className="w-full h-full md:max-h-dvh flex flex-col justify-between items-center py-10 max-h-max my-auto gap-20 overflow-auto">
        {children}
      </div>
    </div>
  );
};
