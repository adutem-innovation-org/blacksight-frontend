import { FormGroup } from "@/components";
import { useFormik } from "formik";

export const Personalization = ({
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
        Personalization
      </h2>
      <div>
        <FormGroup
          type="radio-group"
          groupLabel="What industry is your business in?"
          size="md"
          name="industry"
          validation={validation}
          containerClassName="gap-2 mt-4"
          inputClassName="h-15"
          radioOptions={[
            {
              value: "E-commerce",
              label: "E-commerce",
            },
            {
              value: "Health",
              label: "Health & Wellness",
            },
            {
              value: "Finance",
              label: "Finance",
            },
            {
              value: "Real Estate",
              label: "Real Estate",
            },
            {
              value: "Others",
              label: "Others",
            },
          ]}
        />
        <FormGroup
          type="select"
          groupLabel="How many employees does your business have?"
          placeholder="Select company size"
          size="md"
          name="numberOfEmployees"
          validation={validation}
          options={["Just me", "2 - 10", "11 - 50", "50+"]}
          containerClassName="gap-2 mt-4"
        />
        <FormGroup
          type="radio-group"
          groupLabel="What is your primary goal with Blacksight?"
          size="md"
          name="primaryGoal"
          validation={validation}
          containerClassName="gap-2 mt-4"
          inputClassName="h-15"
          radioOptions={[
            {
              value: "Automate customer support",
              label: "Automate customer support",
            },
            {
              value: "Book appointments",
              label: "Book appointments",
            },
            {
              value: "Reduct staff workload",
              label: "Reduct staff workload",
            },
            {
              value: "Increase sales",
              label: "Increase sales",
            },
            {
              value: "Others",
              label: "Others",
            },
          ]}
        />
      </div>
    </div>
  );
};
