import { Switch } from "@/components/form";
import { Spinner } from "@/components/progress";
import { MFAMethods } from "@/enums";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { Tooltip } from "@mantine/core";

export const MethodCard = ({
  label,
  method,
  description,
  iconClass,
  enableMethod,
  currentMethod,
}: {
  label: string;
  method: MFAMethods;
  description: any;
  iconClass: string;
  enableMethod: (method: MFAMethods, enabled: boolean) => void;
  currentMethod: MFAMethods | null;
}) => {
  const { getState } = useStore();
  const { enablingMfaMethod, availableMethods, disablingMfaMethod } =
    getState("Auth");
  const enabled = availableMethods?.includes(method);

  const handleMethodStatusChange = (enabled: boolean) => {
    enableMethod(method, enabled);
  };

  return (
    <div className="p-6 py-5 bg-gray-50 rounded-2xl">
      <div className="flex justify-start items-center gap-6">
        <i
          className={cn(
            iconClass,
            "flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-4xl"
          )}
        ></i>

        {/* Left content */}
        <div>
          <h2 className="text-xl font-medium tracking-tighter text-gray-600">
            {label}
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-[700px] hidden sm:block">
            {description}
          </p>
        </div>
        <Tooltip
          label={enabled ? "Disable" : "Enable"}
          className="!rounded-md !text-xs"
          transitionProps={{ transition: "pop", duration: 300 }}
          disabled={enablingMfaMethod || disablingMfaMethod}
        >
          <div className="flex items-center relative gap-1 ml-auto">
            <Switch
              disabled={enablingMfaMethod || disablingMfaMethod}
              checked={enabled}
              onCheckedChange={handleMethodStatusChange}
            />
            {enablingMfaMethod && currentMethod === method && <Spinner />}
          </div>
        </Tooltip>

        {/* <Button
          className="rounded-lg !text-sm py-0 ml-auto"
          size={"sm"}
          type="button"
          onClick={() => enableMethod(method)}
          disabled={enablingMfaMethod}
        >
          {enablingMfaMethod && currentMethod === method && <Spinner />}
          {enabled ? "Disable" : "Setup"}{" "}
        </Button> */}
      </div>
    </div>
  );
};
