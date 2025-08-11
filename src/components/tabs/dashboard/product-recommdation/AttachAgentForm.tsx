import { FormGroup } from "@/components/form";
import { FormDialog } from "@/components/popups";
import { useStore } from "@/hooks";
import { IProductsSource } from "@/interfaces";
import {
  attachAgentToProductSource,
  getAllProductsSources,
  resetAttachAgent,
} from "@/store";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

export const AttachAgentForm = ({
  isOpen,
  endAttachAgentOperation,
  productSource,
}: {
  isOpen: boolean;
  endAttachAgentOperation: () => void;
  productSource: IProductsSource | null;
}) => {
  const { dispatch, getState } = useStore();
  const { attachingAgent, attachAgentErrorMsg, agentAttached } = getState(
    "ProductRecommendation"
  );
  const { bots } = getState("Bot");

  const initialValues = {
    agentId: "",
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: yup.object({
      agentId: yup
        .string()
        .required("Please select an agent to attach this product source to."),
    }),
    onSubmit: (values) => {
      if (!productSource) {
        toast.error("Please refresh page, and try again");
        return;
      }
      dispatch(
        attachAgentToProductSource({
          id: productSource._id,
          data: { agentId: values.agentId },
        })
      );
    },
  });

  const AGENTS = useMemo(() => {
    if (!bots) return [];
    return bots.map((bot) => ({
      label: bot.name,
      value: bot._id,
    }));
  }, [bots]);

  const handleOpenChange = () => {
    validation.resetForm();
    endAttachAgentOperation();
  };

  useEffect(() => {
    if (agentAttached) {
      toast.success("Agent attached successfully");
      dispatch(resetAttachAgent());
      dispatch(getAllProductsSources());
      endAttachAgentOperation();
    }
  }, [agentAttached]);

  useEffect(() => {
    if (attachAgentErrorMsg) {
      toast.error(attachAgentErrorMsg);
      dispatch(resetAttachAgent());
    }
  }, [attachAgentErrorMsg]);

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title="Attach Agent"
      description="Attach an agent to the product source."
      loading={attachingAgent}
      loadingCtaText="Attaching agent..."
      ctaText="Attach Agent"
      validation={validation}
      ctaDisabled={attachingAgent}
      ctaClassName="bg-primary"
    >
      <FormGroup
        type="select"
        groupLabel="Agent"
        placeholder="Select an agent"
        size="md"
        name="agentId"
        validation={validation}
        options={AGENTS}
        containerClassName="gap-2 mt-4"
        defaultValue={initialValues.agentId}
        info="Select an agent to attach this product source to."
      />
    </FormDialog>
  );
};
