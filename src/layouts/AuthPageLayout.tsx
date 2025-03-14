import { PropsWithChildren } from "react";
import blacksightAuthBg from "@/assets/images/blacksight-auth-bg.jpg";
import noiseBg from "@/assets/images/noise-bg.png";

export const AuthPageLayout = (props: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-dvw min-h-dvh overflow-auto md:overflow-hidden bg-gray-100">
      <div className="w-full h-dvh max-h-dvh overflow-hidden hidden lg:block relative">
        <div
          className="w-full h-full absolute z-4 opacity-[0.06] top-0 left-0"
          style={{ background: `url(${noiseBg})` }}
        ></div>
        <div
          className="bg-cover w-full h-full absolute z-5 top-0 left-0"
          style={{
            background: `linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.4))`,
          }}
        ></div>
        <img
          src={blacksightAuthBg}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="w-full h-full md:max-h-dvh flex flex-col justify-between items-center py-10 max-h-max my-auto gap-20 overflow-auto">
        {props.children}
      </div>
    </div>
  );
};
