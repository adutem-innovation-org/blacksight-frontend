import { Button, FormGroup } from "@/components/form";
import { Loader } from "@/components/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DashboardTabsEnum } from "@/enums";
import { useStore } from "@/hooks";
import { botSchema } from "@/schemas";
import {
  changeTab,
  configureBot,
  getAllBots,
  getAllKnowledgeBases,
  getBotAnalytics,
  resetConfigureBot,
} from "@/store";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type FormSectionProps = {
  validation: Pick<
    ReturnType<typeof useFormik>,
    | "handleChange"
    | "handleBlur"
    | "errors"
    | "touched"
    | "errors"
    | "values"
    | "setFieldValue"
    | "setFieldTouched"
  >;
};

const EmptySelectOptions = ({
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
}

export const ConfigureBotForm = ({
  isOpen,
  onOpenChange,
}: ConfigureBotProps) => {
  const { dispatch, getState } = useStore();
  const {
    configuringBot,
    botConfigured,
    configureBotErrorMessage,
    configureBotErrors,
  } = getState("Bot");
  const { knowledgeBases, fetchingAllKnowledgeBases } =
    getState("KnowledgeBase");

  const knowledgeBaseOptions = useMemo(() => {
    return knowledgeBases && knowledgeBases.length !== 0
      ? knowledgeBases.map((kBase) => ({
          placeholder: kBase.tag || "Unconfigured",
          value: kBase._id,
        }))
      : [];
  }, [knowledgeBases]);

  const goToKnowledgeBase = () => {
    return dispatch(changeTab(DashboardTabsEnum.KNOWLEDGE_BASE));
  };
  const goToBookingProviders = () => {
    return dispatch(changeTab(DashboardTabsEnum.PROVIDERS));
  };

  const initialValues: {
    name: string;
    knowledgeBaseId: string;
    scheduleMeeting: boolean;
    meetingProviderId?: string;
  } = {
    name: "",
    knowledgeBaseId: "",
    scheduleMeeting: false,
    meetingProviderId: "",
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: botSchema([]), // Update to properly connect to meeting provider list
    onSubmit: (values) => {
      if (!values.scheduleMeeting) delete values.meetingProviderId;
      dispatch(configureBot(values));
    },
  });

  // Fetch analytics and knowledge base on tab open
  useEffect(() => {
    if (!knowledgeBases && !fetchingAllKnowledgeBases) {
      dispatch(getAllKnowledgeBases());
    }
  }, []);

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
              type="select"
              groupLabel="Knowledge base"
              placeholder="Pick a knowledge base"
              info="This is where your bot get information about your business from."
              size="md"
              name="knowledgeBaseId"
              validation={validation}
              containerClassName="gap-2 mt-4"
              options={knowledgeBaseOptions}
              noOptionsContent={
                <EmptySelectOptions
                  description="You are yet to add a knowledge base."
                  onClickCta={goToKnowledgeBase}
                  ctaText="Add knowledge base"
                  loading={fetchingAllKnowledgeBases}
                />
              }
            />

            <FormGroup
              type="switch"
              groupLabel="Schedule meetings automatically?"
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
                groupLabel="Meeting Provider"
                placeholder="Select a meeting provider"
                info="Select a meeting provider, this is where your appointments are scheduled."
                size="md"
                name="meetingProviderId"
                validation={validation}
                containerClassName="gap-2 mt-4"
                noOptionsContent={
                  <EmptySelectOptions
                    ctaText="Setup provider"
                    description="You are yet to setup meeting providers."
                    onClickCta={goToBookingProviders}
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
