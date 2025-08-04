import { DashboardContent } from "@/components/design";
import React, { useEffect, useState } from "react";
import {
  ApiKeyTabHeader,
  ApiKeyTabFooter,
  ApiKeyTabMainContent,
} from "./apikeys";
import { useStore } from "@/hooks";
import {
  getApiKey,
  resetActivateApiKey,
  resetCreateApiKey,
  resetDeactivateApiKey,
  resetDeleteApiKey,
  resetGetApiKey,
  resetRegenerateApiKey,
} from "@/store";
import toast from "react-hot-toast";

export const ApiKeysTab = () => {
  const { dispatch, getState } = useStore();
  const [error, setError] = useState("");
  const {
    apiKey,
    apiKeyFetched,
    fetchApiKeyError,

    // Create api key
    apiKeyCreated,
    createApiKeyError,

    // Regenerate api key
    apiKeyRegenerated,
    regenerateApiKeyError,

    // Activate api key
    apiKeyActivated,
    activateApiKeyError,

    // Deactivate api key
    apiKeyDeactivated,
    deactivateApiKeyError,

    // Delete api key
    apiKeyDeleted,
    deleteApiKeyError,
  } = getState("ApiKey");

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

  // Delete api key
  useEffect(() => {
    if (apiKeyDeleted) {
      toast.success("API key deleted");
      dispatch(resetDeleteApiKey());
    }
  }, [apiKeyDeleted]);

  useEffect(() => {
    if (deleteApiKeyError) {
      toast.error(deleteApiKeyError);
      dispatch(resetDeleteApiKey());
    }
  }, [deactivateApiKeyError]);
  return (
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1  flex flex-col overflow-auto items-center h-full">
          <div className="w-full max-w-4xl mt-6">
            <ApiKeyTabHeader />
            <ApiKeyTabMainContent error={error} />
            <ApiKeyTabFooter />
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
