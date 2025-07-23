import { Button, FormGroup } from "@/components/form";
import { Loader } from "@/components/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DashboardTabsEnum, UserTypes } from "@/enums";
import { useProfile, useStore } from "@/hooks";
import { botSchema } from "@/schemas";
import {
  changeTab,
  configureBot,
  getAllBots,
  getAllKnowledgeBases,
  getBotAnalytics,
  getConnectedProviders,
  resetConfigureBot,
  resetGetAllKnowledgeBases,
  resetGetConnectedProviders,
} from "@/store";
import { useFormik } from "formik";
import { Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

export const EmptySelectOptions = ({
  description,
  onClickCta,
  ctaText,
  loading = false,
}: {
  description: string;
  onClickCta: () => void;
  ctaText: string;
  loading?: boolean;
}) => {
  return (
    <div className="p-4 flex flex-col gap-3 items-center py-6 relative">
      {loading ? (
        <Loader />
      ) : (
        <>
          <p className="text-sm">{description}</p>
          <Button
            onClick={onClickCta}
            className="h-10 text-xs"
            variant={"brand"}
          >
            {ctaText}
          </Button>
        </>
      )}
    </div>
  );
};

interface ConfigureBotProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  addKB: () => void;
}

export const ConfigureBotForm = ({
  isOpen,
  onOpenChange,
  addKB,
}: ConfigureBotProps) => {
  const { dispatch, getState } = useStore();
  const {
    configuringBot,
    botConfigured,
    configureBotErrorMessage,
    configureBotErrors,
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
  const { user } = useProfile();

  const knowledgeBaseOptions = useMemo(() => {
    if (!knowledgeBases?.length) return [];

    return knowledgeBases
      .filter((kBase) => kBase.isActive)
      .map((kBase) => ({
        label: kBase.tag || "Unconfigured",
        value: kBase._id,
      }));
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
  } = {
    name: "",
    knowledgeBaseIds: [],
    scheduleMeeting: false,
    meetingProviderId: "",
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: botSchema(), // Update to properly connect to meeting provider list
    onSubmit: (values) => {
      if (!values.scheduleMeeting) delete values.meetingProviderId;
      dispatch(configureBot(values));
    },
  });

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
    if (
      !connectedProviders &&
      !fetchingConnectedProviders &&
      user?.userType === UserTypes.USER
    ) {
      dispatch(getConnectedProviders());
    }
  }, [user]);

  // Reset fetch connected meeting providers on tab open
  useEffect(() => {
    if (connectedProvidersFetched && fetchConnectedProvidersError) {
      dispatch(resetGetConnectedProviders());
    }
  }, [connectedProvidersFetched, fetchConnectedProvidersError]);

  useEffect(() => {
    if (botConfigured) {
      toast.success("Bot configured successfully");
      // Reset add bot state
      dispatch(resetConfigureBot());
      // Reset form
      validation.resetForm();
      // Close the modal
      onOpenChange(false);
      // Dispatch fetch bots
      dispatch(getAllBots());
      // Dispatch fetch bot analytics
      dispatch(getBotAnalytics());
    }
  }, [botConfigured]);

  useEffect(() => {
    if (configureBotErrorMessage) {
      toast.error(configureBotErrorMessage);
      if (configureBotErrors) {
        validation.setErrors(configureBotErrors);
      }
      const tmo = setTimeout(() => {
        dispatch(resetConfigureBot());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [configureBotErrorMessage]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-h-[85dvh] overflow-y-auto overflow-x-hidden"
      >
        {configuringBot && <Loader />}
        <DialogHeader>
          <DialogTitle>Configure bot</DialogTitle>
          <DialogDescription>
            Configure your AI assistant and let it serve customers in seconds.
          </DialogDescription>
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
                <Button
                  onClick={addKB}
                  className="h-8 !text-xs px-2.5"
                  type="button"
                >
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
                    description="You are yet to setup any calendar provider."
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
              disabled={configuringBot}
            >
              Configure bot
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
