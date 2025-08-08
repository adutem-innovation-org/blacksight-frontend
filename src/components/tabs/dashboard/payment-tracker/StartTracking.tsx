import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import pulse from "@/assets/lotties/AI_loading.json";
import { Button } from "@/components/form";
import { ChartNoAxesCombined } from "lucide-react";

export const StartTracking = ({
  startTracking,
}: {
  startTracking: () => void;
}) => {
  return (
    <div className="flex-1 w-full flex flex-col pt-16 sm:pt-12 items-center overflow-hidden">
      <DotLottieReact
        data={pulse}
        loop
        autoplay
        className="max-w-200 max-h-100"
      />
      <Button
        className="font-dmsans tracking-tight rounded-lg duration-500 hover:from-[#EE4266] hover:to-[#7C98DF]
 px-8 h-12 bg-gradient-to-r from-[#028CF3] to-[#3BCEAC]
"
        size={"sm"}
        onClick={startTracking}
      >
        Start tracking
        <ChartNoAxesCombined />
      </Button>
    </div>
  );
};
