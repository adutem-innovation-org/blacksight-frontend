import { Button } from "@/components/form";
import { Spinner } from "@/components/progress";
import { MFAMethods } from "@/enums";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { enableEmailMfa, enableSMSMfa } from "@/store";
import { useEffect, useState } from "react";

export const MethodCard = ({
  label,
  method,
  enabled,
  description,
  iconClass,
  enableMethod,
  currentMethod,
}: {
  label: string;
  method: MFAMethods;
  enabled: boolean;
  description: any;
  iconClass: string;
  enableMethod: (method: MFAMethods) => void;
  currentMethod: MFAMethods | null;
}) => {
  const { getState } = useStore();
  const { enablingMfaMethod } = getState("Auth");

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
          <p className="text-sm text-gray-600 mt-1 max-w-[600px]">
            {description}
          </p>
        </div>

        <Button
          className="rounded-lg !text-sm py-0 ml-auto"
          size={"sm"}
          type="button"
          onClick={() => enableMethod(method)}
          disabled={enablingMfaMethod}
        >
          {enablingMfaMethod && currentMethod === method && <Spinner />}
          {enabled ? "Disable" : "Setup"}{" "}
        </Button>
      </div>
    </div>
  );
};
