import { Badge } from "@/components/badge";
import { Button } from "@/components/form";
import { cn } from "@/lib/utils";

interface ProviderCardProps {
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  comingSoon?: boolean;
}

export const ProviderCard = ({
  name,
  description,
  icon,
  connected,
  onConnect,
  onDisconnect,
  comingSoon,
}: ProviderCardProps) => {
  return (
    <div className="border-2 rounded-md p-4 py-5 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="bg-gray-100 w-12 h-12 rounded-full overflow-hidden flex justify-center items-center">
          <img src={icon} className="w-7 h-7 object-contain" />
        </div>
        {connected && (
          <Badge
            variant={"success"}
            className="bg-green-500 text-gray-100 py-2 px-4"
          >
            Connected
          </Badge>
        )}
      </div>

      {/* Provider name */}
      <h4 className="text-black text-xl font-medium tracking-tight">{name}</h4>

      {/* Provider description */}
      <p className="w-10/12 text-sm text-gray-500 leading-relaxed max-w-[500px]">
        {description}
      </p>

      {/* Action */}

      <Button
        className={cn(
          "w-max rounded-sm gap-3 flex items-center h-11 px-4 font-dmsans tracking-tight hover:text-gray-100 duration-400 border-2 mt-auto",
          {
            "border-red-800 text-red-800 hover:bg-red-800": connected,
            "border-blue-500 text-blue-500 hover:bg-blue-500": !connected,
          }
        )}
        variant={"outline"}
        onClick={() => (connected ? onDisconnect() : onConnect())}
        disabled={comingSoon}
      >
        <i
          className={cn("flex", {
            "rotate-45 fi fi-rr-plug-circle-minus": connected,
            "fi fi-rr-plug-connection": !connected,
          })}
        />
        <span className="font-semibold">
          {comingSoon ? "Coming soon" : connected ? "Disconnect" : "Connect"}
        </span>
      </Button>
    </div>
  );
};
