import { FormGroup } from "@/components";
import { useFormik } from "formik";

export const ProductFeedback = ({
  validation,
}: {
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
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl text-gray-900 font-urbanist font-bold">
        Product Feedback
      </h2>
      <div>
        <FormGroup
          type="radio-group"
          groupLabel="How did you first hear about Blacksight?"
          size="md"
          name="leadSource"
          validation={validation}
          containerClassName="gap-2 mt-4"
          inputClassName="h-15"
          radioOptions={[
            {
              value: "Social Media",
              label: "Social Media",
            },
            {
              value: "Referral",
              label: "Referral",
            },
            {
              value: "Google Search",
              label: "Google Search",
            },
            {
              value: "Ad",
              label: "Ad",
            },
            {
              value: "Others",
              label: "Others",
            },
          ]}
        />
        <FormGroup
          type="radio-group"
          groupLabel="Which BlackSight feature do you find most valuable so far?"
          size="md"
          name="preferredFeature"
          validation={validation}
          containerClassName="gap-2 mt-4"
          inputClassName="h-15"
          radioOptions={[
            {
              value: "Appointment Booking",
              label: "Appointment Booking",
            },
            {
              value: "AI Customer Support",
              label: "AI Customer Support",
            },
            {
              value: "Live Chat Integration",
              label: "Live Chat Integration",
            },
            {
              value: "Dashboard Analytics",
              label: "Dashboard Analytics",
            },
            {
              value: "Not sure yet",
              label: "Not sure yet",
            },
          ]}
        />
      </div>
    </div>
  );
};
