import { FormGroup } from "@/components";
import { useFormik } from "formik";

export const BasicInformation = ({
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
        Tell us about your business
      </h2>
      <div>
        <FormGroup
          type="text"
          groupLabel="Business name"
          placeholder="Enter your business name"
          size="md"
          name="name"
          validation={validation}
          containerClassName="gap-2 mt-4"
        />
        <FormGroup
          type="text"
          groupLabel="Website"
          placeholder="Provide link to your webiste"
          size="md"
          name="website"
          validation={validation}
          containerClassName="gap-2 mt-4"
        />
        {/* <FormGroup
          type="text"
          groupLabel="Address"
          placeholder="Provide your business address"
          size="md"
          name="address"
          validation={validation}
          containerClassName="gap-2 mt-4"
        /> */}
        <FormGroup
          type="text"
          groupLabel="Business Email"
          placeholder="Provide your business email"
          size="md"
          name="businessEmail"
          validation={validation}
          containerClassName="gap-2 mt-4"
        />
      </div>
    </div>
  );
};
