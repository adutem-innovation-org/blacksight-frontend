import { Button, FormGroup } from "@/components/form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Bot } from "@/interfaces";
import { botSchema } from "@/schemas";
import { useFormik } from "formik";
import { Plus, Upload, X } from "lucide-react";
import styled from "styled-components";
import { EmptySelectOptions } from "../ConfigureBotForm";
import { useStore } from "@/hooks";
import { useEffect, useMemo } from "react";
import {
  changeTab,
  getAllKnowledgeBases,
  getConnectedProviders,
  resetGetAllKnowledgeBases,
  resetGetConnectedProviders,
  resetUpdateBotConfig,
  updateBotConfig,
} from "@/store";
import { DashboardTabsEnum } from "@/enums";
import { Loader } from "@/components/progress";
import toast from "react-hot-toast";

interface SheetHeaderCompProps {
  currentBot: Bot;
  onOpenChange: (value: boolean) => void;
}

const SheetHeaderComp = ({
  currentBot,
  onOpenChange,
}: SheetHeaderCompProps) => {
  return (
    <CustomSheetHeader className="flex p-8 justify-between items-center flex-row border-b border-b-gray-100">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-8">
        <div>
          <p className="font-urbanist font-semibold text-gray-900 md:text-2xl text-xl">
            {currentBot.name}
          </p>
          <p className="font-sfpro text-sm text-gray-400">Bot name</p>
        </div>
        <div className="custom">
          <p className="font-urbanist font-semibold text-gray-900 text:xl md:text-2xl capitalize">
            {currentBot.status}
          </p>
          <p className="font-sfpro text-sm text-gray-400">Status</p>
        </div>
      </div>

      <div className="custom">
        <Button
          variant={"secondary_gray"}
          size={"icon"}
          className="border-none rounded-full bg-gray-100 cursor-pointer"
          onClick={() => onOpenChange(false)}
        >
          <X />
        </Button>
      </div>
    </CustomSheetHeader>
  );
};

const badgeVariantMap: Record<string, any> = {
  Active: "success",
  Inactive: "gray",
  Failed: "error",
};

interface BotConfigDrawerProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  currentBot: Bot;
  addKB: () => void;
  showPromptEditor?: boolean;
}

export function BotConfigDrawer({
  isOpen,
  onOpenChange,
  currentBot,
  addKB,
  showPromptEditor,
}: BotConfigDrawerProps) {
  const { dispatch, getState } = useStore();
  const {
    updatingBotConfig,
    botConfigUpdated,
    updateBotConfigErrorMessage,
    updateBotConfigErrors,
  } = getState("Bot");
  const {
    knowledgeBases,
    fetchingAllKnowledgeBases,
    allKnowledgeBasesFetched,
    fetchAllKnowledgeBasesErrorMessage,
  } = getState("KnowledgeBase");
  const {
    fetchingConnectedProviders,
    connectedProviders,
    fetchConnectedProvidersError,
    connectedProvidersFetched,
  } = getState("MeetingProvider");

  const knowledgeBaseOptions = useMemo(() => {
    return knowledgeBases && knowledgeBases.length !== 0
      ? knowledgeBases.map((kBase) => ({
          label: kBase.tag || "Unconfigured",
          value: kBase._id,
        }))
      : [];
  }, [knowledgeBases]);

  const connectedProviderOptions = useMemo(() => {
    return connectedProviders && connectedProviders.length !== 0
      ? connectedProviders.map((cProvider) => ({
          label: cProvider.provider,
          value: cProvider._id,
        }))
      : [];
  }, [connectedProviders]);

  const goToKnowledgeBase = () => {
    return dispatch(changeTab(DashboardTabsEnum.KNOWLEDGE_BASE));
  };

  const goToBookingProviders = () => {
    return dispatch(changeTab(DashboardTabsEnum.CALENDARS));
  };

  const initialValues: {
    name: string;
    knowledgeBaseIds: string[];
    scheduleMeeting: boolean;
    meetingProviderId?: string;
    welcomeMessage: string;
    instructions: string;
  } = {
    name: currentBot.name,
    knowledgeBaseIds: currentBot.knowledgeBaseIds,
    scheduleMeeting: currentBot.scheduleMeeting,
    meetingProviderId: currentBot.meetingProviderId,
    welcomeMessage: currentBot?.welcomeMessage,
    instructions: currentBot?.instructions,
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: botSchema(false),
    onSubmit: (values) => {
      if (!values.scheduleMeeting) delete values.meetingProviderId;
      dispatch(updateBotConfig({ id: currentBot._id, data: values }));
    },
  });

  // Checks if there is any disperity between the current values and the form values
  const canUpdateConfig = useMemo(() => {
    const currentKeys = Object.keys(validation.values);

    for (const key of currentKeys) {
      if (
        currentBot[key as keyof typeof currentBot] !==
        validation.values[key as keyof typeof validation.values]
      ) {
        return true; // Exit early on the first mismatch
      }
    }

    return false; // No mismatches found
  }, [validation.values]);

  // Fetch knowledge base on tab open
  useEffect(() => {
    if (!knowledgeBases && !fetchingAllKnowledgeBases) {
      dispatch(getAllKnowledgeBases());
    }
  }, []);

  // Reset fetch all knowledge bases
  useEffect(() => {
    if (allKnowledgeBasesFetched || fetchAllKnowledgeBasesErrorMessage) {
      dispatch(resetGetAllKnowledgeBases());
    }
  }, [allKnowledgeBasesFetched, fetchAllKnowledgeBasesErrorMessage]);

  // Fetch connected meeting providers on tab open
  useEffect(() => {
    if (!connectedProviders && !fetchingConnectedProviders) {
      dispatch(getConnectedProviders());
    }
  }, []);

  // Reset fetch connected meeting providers on tab opne
  useEffect(() => {
    if (connectedProvidersFetched && fetchConnectedProvidersError) {
      dispatch(resetGetConnectedProviders());
    }
  }, [connectedProvidersFetched, fetchConnectedProvidersError]);

  useEffect(() => {
    if (botConfigUpdated) {
      toast.success("Bot configurations updated");
      // Reset update config state
      dispatch(resetUpdateBotConfig());
      // Close drawer
      onOpenChange(false);
    }
  }, [botConfigUpdated]);

  useEffect(() => {
    if (updateBotConfigErrorMessage) {
      toast.error(updateBotConfigErrorMessage);
      if (Object.keys(updateBotConfigErrors ?? {}).length) {
        validation.setErrors(updateBotConfigErrors);
      }
      dispatch(resetUpdateBotConfig());
    }
  }, [updateBotConfigErrorMessage]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={true}>
      <CustomSheetContent
        className="rounded-2xl p-0 gap-8 !w-[calc(100dvw-24px)] sm:!w-[calc(100dvw-48px)] !max-w-[700px] !min-w-auto !mx-3 
      sm:!m-6"
      >
        {updatingBotConfig && <Loader />}
        <SheetHeaderComp currentBot={currentBot} onOpenChange={onOpenChange} />
        <div className="px-4 sm:px-8 overflow-y-auto overflow-x-hidden pb-6">
          {/* config form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <FormGroup
              type="text"
              groupLabel="Bot name"
              placeholder="Enter a desired bot name."
              size="md"
              name="name"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <FormGroup
              type="textarea"
              groupLabel="Welcome message"
              placeholder="Enter bot welcome message"
              size="md"
              name="welcomeMessage"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            {showPromptEditor && (
              <FormGroup
                type="textarea"
                name="instructions"
                groupLabel="Prompt Editor"
                placeholder="Enter your prompt..."
                size="lg"
                validation={validation}
                containerClassName="gap-2 mt-4"
              />
            )}
            <FormGroup
              type="multi-select"
              groupLabel="Knowledge base"
              label="Knowledge base"
              placeholder="Please select one or more knowledge base"
              info="This is where your bot get informatio about your business from."
              size="md"
              name="knowledgeBaseIds"
              multiSelectInputData={knowledgeBaseOptions}
              validation={validation}
              noOptionsContent={
                <EmptySelectOptions
                  description="You are yet to add a knowledge base."
                  // onClickCta={goToKnowledgeBase}
                  onClickCta={addKB}
                  ctaText="Add knowledge base"
                  loading={fetchingAllKnowledgeBases}
                />
              }
              containerClassName="gap-2 mt-4"
              action={
                <Button onClick={addKB} className="h-8 !text-xs" type="button">
                  Create <Plus />
                </Button>
              }
            />
            <FormGroup
              type="switch"
              groupLabel="Schedule in calendar?"
              placeholder="Schedule meetings"
              info="Decide whatever or not an automatic google meet or zoom meet should be created for you as soon as the appointment is booked."
              size="md"
              name="scheduleMeeting"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            {validation.values.scheduleMeeting && (
              <FormGroup
                type="select"
                groupLabel="Calendar"
                placeholder="Select a provider"
                info="Select a calendar provider, this is where your appointments are scheduled."
                size="md"
                name="meetingProviderId"
                validation={validation}
                containerClassName="gap-2 mt-4"
                options={connectedProviderOptions}
                noOptionsContent={
                  <EmptySelectOptions
                    description="You are yet to setup meeting providers."
                    onClickCta={goToBookingProviders}
                    ctaText="Setup provider"
                    loading={fetchingConnectedProviders}
                  />
                }
              />
            )}
            <Button
              className="w-full cursor-pointer mt-10"
              type="submit"
              disabled={updatingBotConfig || !canUpdateConfig}
            >
              Save
            </Button>
          </form>
        </div>
      </CustomSheetContent>
    </Sheet>
  );
}

const CustomSheetContent = styled(SheetContent)`
  height: 95%;
  align-self: center;
  margin-right: 1.5rem;
  min-width: 660px;
  box-shadow: 0px 4px 16px #0000001f;

  & > button:not(.custom) {
    display: none;
  }
`;

const CustomSheetHeader = styled(SheetHeader)`
  & > div {
    margin: 0px !important;
  }
`;

const CustomRow = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;
