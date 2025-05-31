import { Button } from "@/components/form";
import { UserData } from "@/interfaces";
import { PencilLine } from "lucide-react";
import man from "@/assets/images/man.png";

export const HeroSection = ({ user }: { user: UserData | null }) => {
  return (
    <div className="p-6 border rounded-xl border-gray-200 flex items-center gap-4">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-brand">
        <img
          src={user?.imageUrl || man}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="font-dmsans">
        <p className="text-lg font-medium">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-gray-500 font-inter">Owner</p>
        <p>-</p>
      </div>

      {/* <Button
        className="ml-auto text-gray-500 font-normal cursor-pointer gap-2"
        variant={"outline"}
      >
        Edit
        <PencilLine />
      </Button> */}
    </div>
  );
};
