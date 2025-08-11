import { FormGroup } from "@/components/form";
import { FormDialog } from "@/components/popups";
import { useStore } from "@/hooks";
import { IProductsSource } from "@/interfaces";
import {
  detachAgentFromProductSource,
  getAllBots,
  getAllProductsSources,
  resetDetachAgent,
} from "@/store";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

export const DetachAgentForm = ({
  isOpen,
  endDetachAgentOperation,
  productSource,
}: {
  isOpen: boolean;
  endDetachAgentOperation: () => void;
  productSource: IProductsSource | null;
}) => {
  const { dispatch, getState } = useStore();
  const { detachingAgent, detachAgentErrorMsg, agentDetached } = getState(
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
        .required("Please select an agent to detach this product source from."),
    }),
    onSubmit: (values) => {
      if (!productSource) {
        toast.error("Please refresh page, and try again");
        return;
      }
      dispatch(
        detachAgentFromProductSource({
          id: productSource._id,
          data: { agentId: values.agentId },
        })
      );
    },
  });

  const AGENTS = useMemo(() => {
    if (!productSource?.connectedBots) return [];
    return (
      productSource?.connectedBots.map((bot) => ({
        label: bot.name,
        value: bot._id,
      })) || []
    );
  }, [bots, productSource]);

  const handleOpenChange = () => {
    validation.resetForm();
    endDetachAgentOperation();
  };

  useEffect(() => {
    if (agentDetached) {
      toast.success("Agent detached successfully");
      dispatch(resetDetachAgent());
      dispatch(getAllProductsSources());
      dispatch(getAllBots());
      endDetachAgentOperation();
    }
  }, [agentDetached]);

  useEffect(() => {
    if (detachAgentErrorMsg) {
      toast.error(detachAgentErrorMsg);
      dispatch(resetDetachAgent());
    }
  }, [detachAgentErrorMsg]);

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title="Detach Agent"
      description="Detach an agent from this product source."
      loading={detachingAgent}
      loadingCtaText="Detaching agent..."
      ctaText="Detach Agent"
      validation={validation}
      ctaDisabled={detachingAgent}
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
        info="Select an agent to detach from this product source."
      />
    </FormDialog>
  );
};
