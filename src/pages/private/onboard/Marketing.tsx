import { Checkbox, FormGroup } from "@/components";
import { PreferredContactMethodEnum } from "@/enums";
import { useFormik } from "formik";

export const MarketingAndCommunication = ({
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
        Marketing & Communication Preferences
      </h2>
      <div>
        <FormGroup
          type="checkbox-group"
          groupLabel="What type of content would you find most helpful from us?"
          size="md"
          name="preferredContentType"
          validation={validation}
          containerClassName="gap-2 mt-4"
          checkboxItems={[
            {
              value: "Case studies / success stories",
              label: "Case studies / success stories",
            },
            {
              value: "Tutorials & how-tos",
              label: "Tutorials & how-tos",
            },
            {
              value: "Product updates",
              label: "Product updates",
            },
            {
              value: "Industry insights",
              label: "Industry insights",
            },
          ]}
        />
        <FormGroup
          type="radio-group"
          groupLabel="Are you open to being contacted for a quick feedback call or testimonial?"
          size="md"
          name="feedbackCallConsent"
          validation={validation}
          containerClassName="gap-2 mt-4"
          inputClassName="h-15"
          radioOptions={[
            {
              value: "Yes",
              label: "Yes",
            },
            {
              value: "Maybe later",
              label: "Maybe later",
            },
            {
              value: "No",
              label: "No",
            },
          ]}
        />
        {validation.values.feedbackCallConsent === "Yes" && (
          <>
            <FormGroup
              type="select"
              groupLabel="What's the best way to contact you?"
              placeholder="Select preferred contact method"
              size="md"
              name="preferredContactMethod"
              validation={validation}
              options={Object.values(PreferredContactMethodEnum)}
              containerClassName="gap-2 mt-4"
            />

            {validation.values.preferredContactMethod && (
              <FormGroup
                type="text"
                groupLabel="Contact Information"
                name="contactInfo"
                placeholder="Enter contact information"
                size="md"
                validation={validation}
                containerClassName="gap-2 mt-4"
              />
            )}
          </>
        )}
        <div className="flex items-center gap-1.5 cursor-pointer mt-4">
          <Checkbox
            size={"md"}
            id="remember-me"
            checked={validation.values.receiveUpdates}
            onCheckedChange={(val) =>
              validation.setFieldValue("receiveUpdates", val)
            }
          />
          <label
            className="text-sm text-gray-600 font-medium cursor-pointer italic"
            htmlFor="remember-me"
          >
            Would you like to receive updates, tips, and exclusive offers from
            BlackSight?
          </label>
        </div>
      </div>
    </div>
  );
};
