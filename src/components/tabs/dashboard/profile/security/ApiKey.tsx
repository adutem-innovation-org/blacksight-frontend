import { useStore } from "@/hooks";
import { SecurityCard } from "./SecurityCard";
import { Button } from "@/components/form";
import { useEffect, useMemo, useState } from "react";
import {
  activateApiKey,
  createApiKey,
  deactivateApiKey,
  getApiKey,
  regenerateApiKey,
  resetActivateApiKey,
  resetCreateApiKey,
  resetDeactivateApiKey,
  resetGetApiKey,
  resetRegenerateApiKey,
} from "@/store";
import { Loader } from "@/components/progress";
import toast from "react-hot-toast";
import { Ban, CircleFadingArrowUp } from "lucide-react";

export const ApiKey = () => {
  const { dispatch, getState } = useStore();
  const [error, setError] = useState("");
  const {
    apiKey,
    fetchingApiKey,
    apiKeyFetched,
    fetchApiKeyError,

    // Create api key
    creatingApiKey,
    apiKeyCreated,
    createApiKeyError,

    // Regenerate api key
    regeneratingApiKey,
    apiKeyRegenerated,
    regenerateApiKeyError,

    // Activate api key
    activatingApiKey,
    apiKeyActivated,
    activateApiKeyError,

    // Deactivate api key
    deactivatingApiKey,
    apiKeyDeactivated,
    deactivateApiKeyError,
  } = getState("ApiKey");

  console.log(fetchingApiKey, apiKeyFetched, fetchApiKeyError, apiKey);

  const retryGetApiKey = () => {
    setError("");
    dispatch(getApiKey());
  };

  const generateNewKey = () => {
    if (apiKey && apiKey.secretKey) {
      dispatch(regenerateApiKey(apiKey._id));
    } else {
      dispatch(createApiKey());
    }
  };

  const updateApiKeyStatus = () => {
    if (!apiKey || Object.keys(apiKey).length === 0) return;
    if (apiKey.disabled) {
      dispatch(activateApiKey(apiKey._id));
    } else {
      dispatch(deactivateApiKey(apiKey._id));
    }
  };

  useEffect(() => {
    if (apiKey === null) dispatch(getApiKey());
  }, []);

  useEffect(() => {
    if (apiKeyFetched) dispatch(resetGetApiKey());
  }, [apiKeyFetched]);

  useEffect(() => {
    if (fetchApiKeyError) {
      setError(fetchApiKeyError);
      dispatch(resetGetApiKey());
    }
  }, [fetchApiKeyError]);

  // Create api key
  useEffect(() => {
    if (apiKeyCreated) {
      toast.success("Api key generated");
      dispatch(resetCreateApiKey());
    }
  }, [apiKeyCreated]);

  useEffect(() => {
    if (createApiKeyError) {
      toast.error(createApiKeyError);
      dispatch(resetCreateApiKey());
    }
  }, [createApiKeyError]);

  // Regenerate api key
  useEffect(() => {
    if (apiKeyRegenerated) {
      toast.success("Api key generated");
      dispatch(resetRegenerateApiKey());
    }
  }, [apiKeyRegenerated]);

  useEffect(() => {
    if (regenerateApiKeyError) {
      toast.error(regenerateApiKeyError);
      dispatch(resetRegenerateApiKey());
    }
  }, [regenerateApiKeyError]);

  // Activate api key
  useEffect(() => {
    if (apiKeyActivated) {
      toast.success("API key activated");
      dispatch(resetActivateApiKey());
    }
  }, [apiKeyActivated]);

  useEffect(() => {
    if (activateApiKeyError) {
      toast.error(activateApiKeyError);
      dispatch(resetActivateApiKey());
    }
  }, [activateApiKeyError]);

  // Deactivate api key
  useEffect(() => {
    if (apiKeyDeactivated) {
      toast.success("API key disabled");
      dispatch(resetDeactivateApiKey());
    }
  }, [apiKeyDeactivated]);

  useEffect(() => {
    if (deactivateApiKeyError) {
      toast.error(deactivateApiKeyError);
      dispatch(resetDeactivateApiKey());
    }
  }, [deactivateApiKeyError]);

  const obscuredApiKey = useMemo(() => {
    if (!apiKey || !apiKey?.secretKey) return Array(50).fill("*").join("");
    const secretKey = apiKey.secretKey as string;
    const secretKeyLength = secretKey.length;
    const leftIndexEnd = 6;
    const rightIndexStart = secretKeyLength - 6;
    return (
      secretKey.substring(0, leftIndexEnd) +
      secretKey
        .substring(leftIndexEnd, Math.min(leftIndexEnd + 20, rightIndexStart))
        .replace(/[a-zA-Z0-9]/g, "*") +
      secretKey.substring(rightIndexStart, secretKeyLength)
    );
  }, [apiKey?.secretKey]);

  const disableBtns = useMemo(
    () =>
      activatingApiKey ||
      deactivatingApiKey ||
      regeneratingApiKey ||
      creatingApiKey,
    [activatingApiKey, deactivatingApiKey, regeneratingApiKey, creatingApiKey]
  );

  return (
    <>
      <div className="flex flex-col gap-2 items-start border-t mt-2">
        {fetchingApiKey ||
        creatingApiKey ||
        regeneratingApiKey ||
        activatingApiKey ||
        deactivatingApiKey ? (
          <div className="h-10 w-full relative mt-4">
            <Loader />
          </div>
        ) : (
          <SecurityCard
            title="API Key"
            value={
              apiKey?.secretKey
                ? obscuredApiKey
                : error || "You are yet to generate an API key"
            }
            copiedText={apiKey?.secretKey ?? ""}
            valueClassName={error && "text-destructive italic"}
            hideAction={!apiKey?.secretKey}
          />
        )}

        <div className="flex items-center gap-3 mt-2">
          {!fetchingApiKey && !error && (
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={generateNewKey}
              disabled={disableBtns}
            >
              Generate New Key
            </Button>
          )}
          {!fetchingApiKey && !error && apiKey?.secretKey && (
            <Button
              onClick={updateApiKeyStatus}
              variant={"brand"}
              size={"sm"}
              disabled={disableBtns}
            >
              {apiKey?.disabled ? (
                <>
                  <CircleFadingArrowUp /> <>Activate</>
                </>
              ) : (
                <>
                  <Ban />
                  <>Deactivate</>
                </>
              )}
            </Button>
          )}
        </div>

        {error && (
          <Button variant={"brand"} size={"sm"} onClick={retryGetApiKey}>
            Retry
          </Button>
        )}
      </div>
    </>
  );
};
