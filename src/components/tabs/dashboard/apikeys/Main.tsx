import { Button, Switch } from "@/components/form";
import { ConfirmationDialog } from "@/components/popups";
import { Loader, Spinner } from "@/components/progress";
import { resetDocumentElement, writeTextToClipboard } from "@/helpers";
import { useStore } from "@/hooks";
import { activateApiKey, deactivateApiKey, deleteApiKey } from "@/store";
import { Tooltip } from "@mantine/core";
import { Check, Copy, Key, Trash } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const ApiKeyTabMainContent = ({ error }: { error: string }) => {
  const { dispatch, getState } = useStore();
  const {
    fetchingApiKey,
    apiKey,

    deactivatingApiKey,
    apiKeyDeactivated,

    deletingApiKey,
    apiKeyDeleted,
  } = getState("ApiKey");
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const triggerStatusUpdate = () => {
    if (!apiKey || Object.keys(apiKey).length === 0) return;
    if (apiKey.disabled) {
      dispatch(activateApiKey(apiKey._id));
    } else {
      setDeactivateDialogOpen(true);
    }
  };

  const endDeactivateOperation = () => {
    setDeactivateDialogOpen(false);
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

  const confirmDeactivateOperation = () => {
    if (!apiKey || Object.keys(apiKey).length === 0) return;
    dispatch(deactivateApiKey(apiKey._id));
  };

  // Deactivate api key
  useEffect(() => {
    if (apiKeyDeactivated) {
      setDeactivateDialogOpen(false);
    }
  }, [apiKeyDeactivated]);

  const triggerDeleteApiKey = () => {
    if (!apiKey || Object.keys(apiKey).length === 0) return;
    setDeleteDialogOpen(true);
  };

  const endDeleteOperation = () => {
    setDeleteDialogOpen(false);
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

  const confirmDeleteOperation = () => {
    if (!apiKey || Object.keys(apiKey).length === 0) return;
    dispatch(deleteApiKey(apiKey._id));
  };

  // Deactivate api key
  useEffect(() => {
    if (apiKeyDeleted) {
      setDeleteDialogOpen(false);
    }
  }, [apiKeyDeleted]);
  return (
    <div className="mt-5">
      <h4 className="text-black tracking-tight font-semibold">User API Keys</h4>

      {fetchingApiKey && <FetchingLoader />}

      {!fetchingApiKey && !error && !apiKey?.secretKey && <NoApiKey />}

      {!fetchingApiKey && !error && apiKey && apiKey.secretKey && (
        <ApiKeyCard
          secret={apiKey.secretKey}
          isActive={!apiKey.disabled}
          isRevoked={apiKey.revoked}
          triggerStatusUpdate={triggerStatusUpdate}
          triggerDeleteApiKey={triggerDeleteApiKey}
        />
      )}

      <ConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        cancelOperation={endDeleteOperation}
        confirmOperation={confirmDeleteOperation}
        loading={deletingApiKey}
        title="Delete API Key"
        confirmCtaText="Delete"
        description={`Do you really want to delete the API key? This will make the agent using the API key to stop working. This action is irreversible.`}
      />

      <ConfirmationDialog
        isOpen={deactivateDialogOpen}
        onOpenChange={setDeactivateDialogOpen}
        cancelOperation={endDeactivateOperation}
        confirmOperation={confirmDeactivateOperation}
        loading={deactivatingApiKey}
        title="Disable API Key"
        confirmCtaText="Disable"
        description={`Do you really want to disable the API key? This will make the API key no longer work until you enable it again.`}
      />
    </div>
  );
};

const FetchingLoader = () => {
  return (
    <div className="h-20 relative">
      <Loader />
    </div>
  );
};

const NoApiKey = () => {
  return (
    <div className="h-20 flex items-center justify-center text-sm text-gray-600 bg-white mt-5 italic font-medium">
      <p>You are yet to generate an API Key</p>
    </div>
  );
};

const ApiKeyCard = ({
  secret,
  isActive,
  isRevoked,
  triggerStatusUpdate,
  triggerDeleteApiKey,
}: {
  secret: string;
  isActive: boolean;
  isRevoked: boolean;
  triggerStatusUpdate: () => void;
  triggerDeleteApiKey: () => void;
}) => {
  const obscuredApiKey = useMemo(() => {
    if (!secret) return Array(5).fill("*").join("").padStart(8, ".");
    const keyLength = secret.length;
    const sliceStart = keyLength - 5;
    return secret.substring(sliceStart).padStart(8, ".");
  }, [secret]);

  return (
    <div className="text-sm text-gray-600 bg-gray-100 mt-5 border-y border-gray-200 py-4">
      <div className="flex justify-between items-center w-full">
        {/* Left content */}
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 w-10 h-10 rounded-md justify-center items-center hidden min-[380]:flex">
            <Key className="w-5 h-5" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm tracking-tight font-medium text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap max-w-[80px] min-[400px]:max-w-[120px">
              Blacksight API Key
            </p>
            <p className="text-xs text-gray-400 tracking-tight overflow-hidden text-ellipsis whitespace-nowrap max-w-[80px] min-[400px]:max-w-[120px]">
              Unlimited access
            </p>
          </div>
        </div>

        {/* Right content */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{obscuredApiKey}</span>
          <Actions
            isActive={isActive}
            isRevoked={isRevoked}
            triggerStatusUpdate={triggerStatusUpdate}
            triggerDeleteApiKey={triggerDeleteApiKey}
          />
        </div>
      </div>
    </div>
  );
};

const Actions = ({
  isActive,
  isRevoked,
  triggerStatusUpdate,
  triggerDeleteApiKey,
}: {
  isActive: boolean;
  isRevoked: boolean;
  triggerStatusUpdate: () => void;
  triggerDeleteApiKey: () => void;
}) => {
  const { getState } = useStore();
  const { apiKey, activatingApiKey, regeneratingApiKey, deletingApiKey } =
    getState("ApiKey");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      const copiedText = apiKey?.secretKey;
      if (!copiedText) return;
      await writeTextToClipboard(copiedText);
      toast.success("Copied to clipboard");
      setCopied(true);
    } catch (error) {
      toast.error("Unable to copy");
    } finally {
      let tmo = setTimeout(() => {
        setCopied(false);
        clearTimeout(tmo);
      }, 500);
    }
  };

  return (
    <React.Fragment>
      <Tooltip
        label={isActive ? "Deactivate" : "Activate"}
        className="!rounded-md !text-xs"
        transitionProps={{ transition: "pop", duration: 300 }}
        disabled={isRevoked}
      >
        <div>
          <Switch
            className="data-[state=unchecked]:bg-gray-300 data-[state=unchecked]:hover:!bg-gray-400"
            disabled={isRevoked}
            checked={isActive}
            onCheckedChange={() => {
              triggerStatusUpdate();
            }}
          />
          {activatingApiKey && <Spinner />}
        </div>
      </Tooltip>
      <Tooltip
        label={copied ? "Copied" : "Copy"}
        className="!rounded-md !text-xs"
        transitionProps={{ transition: "pop", duration: 300 }}
        onClick={copyToClipboard}
      >
        <Button
          size={"icon"}
          variant={"secondary_gray"}
          className="hover:bg-gray-200 w-9 h-9"
          disabled={isRevoked || regeneratingApiKey}
        >
          {copied ? (
            <Check className="text-black" />
          ) : (
            <Copy className="text-black" />
          )}
        </Button>
      </Tooltip>
      <Tooltip
        label="Delete"
        className="!rounded-md !text-xs"
        transitionProps={{ transition: "pop", duration: 300 }}
        disabled={isRevoked || deletingApiKey}
      >
        <Button
          size={"icon"}
          variant={"secondary_gray"}
          className="hover:bg-gray-200 w-9 h-9"
          onClick={triggerDeleteApiKey}
        >
          <Trash className="text-black" />
        </Button>
      </Tooltip>
    </React.Fragment>
  );
};
