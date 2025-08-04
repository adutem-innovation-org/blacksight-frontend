import { Button } from "@/components/form";
import { Spinner } from "@/components/progress";
import { useStore } from "@/hooks";
import { createApiKey, regenerateApiKey } from "@/store";
import { useMemo } from "react";

export const ApiKeyTabHeader = () => {
  const { getState, dispatch } = useStore();
  const {
    activatingApiKey,
    deactivatingApiKey,
    regeneratingApiKey,
    creatingApiKey,
    apiKey,
  } = getState("ApiKey");

  const handleSearch = (val: string) => console.log(val);

  const disableBtn = useMemo(
    () =>
      activatingApiKey ||
      deactivatingApiKey ||
      regeneratingApiKey ||
      creatingApiKey ||
      apiKey?.revoked,
    [activatingApiKey, deactivatingApiKey, regeneratingApiKey, creatingApiKey]
  );

  const generateNewKey = () => {
    if (apiKey && apiKey.secretKey) {
      dispatch(regenerateApiKey(apiKey._id));
    } else {
      dispatch(createApiKey());
    }
  };

  return (
    <header className="w-full">
      <div className="flex flex-col min-[400px]:flex-row justify-between items-stretch gap-4">
        <input
          className="flex-1 border border-gray-200 rounded-lg px-4 outline-none tracking-tight !text-sm font-medium bg-gray-100 text-black placeholder:text-gray-700 h-10 py-3 min-[400px]:h-auto min-[400px]:py-0"
          placeholder="Search your API Keys..."
        />
        <Button
          type="button"
          size={"sm"}
          className="rounded-lg !text-sm py-0"
          onClick={generateNewKey}
          disabled={disableBtn}
        >
          {(regeneratingApiKey || creatingApiKey) && <Spinner />}
          {creatingApiKey && <>Generating...</>}
          {regeneratingApiKey && <>Regenerating...</>}
          {!(regeneratingApiKey || creatingApiKey) &&
            (apiKey && apiKey.secretKey
              ? "Generate New Key"
              : "Create API Key")}
        </Button>
      </div>
    </header>
  );
};
