import { AuthPageLayout } from "@/layouts";
import React, { useEffect, useRef, useState } from "react";
import blacksightLogo from "@/assets/images/blacksight_logo_side.png";
import { useProfile, useStore } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { OnboardBusinessBody } from "@/interfaces";
import { useFormik } from "formik";
import { onboardingSchema } from "@/schemas";
import {
  getProfile,
  onboardUser,
  resetOnboardUser,
  resetSkipOnboarding,
  skipOnboarding,
} from "@/store";
import { getOnboardingSectionFields } from "@/helpers";
import { Button, FormGroup, FormRange, Loader } from "@/components";
import {
  BasicInformation,
  RoleSelector,
  Personalization,
  ProductFeedback,
  MarketingAndCommunication,
} from "./onboard";
import { UserRole } from "@/enums";
import toast from "react-hot-toast";
import { ChevronsRight } from "lucide-react";

const Onboarder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = useRef(5).current;
  const { dispatch, getState } = useStore();

  const {
    onboarding,
    onboarded,
    onboardingErrors,
    onboardingErrorMessage,
    fetchingProfile,

    // Skip onboarding
    skippingOnboarding,
    onboardingSkipped,
    skipOnboardingErrorMessage,
  } = getState("Auth");

  const navigate = useNavigate();

  const initialValues: OnboardBusinessBody & Record<string, any> = {
    role: UserRole.UNSPECIFIED,

    // Basic information
    name: "",
    website: "",
    // address: "",
    businessEmail: "",

    // Personalization
    industry: "",
    industry_others: "",
    numberOfEmployees: "",
    primaryGoal: "",
    primaryGoal_others: "",

    // Product Feedback
    leadSource: "",
    leadSource_others: "",
    preferredFeature: "",

    // Marketing and Communication Preferences
    preferredContentType: [],
    feedbackCallConsent: "",
    preferredContactMethod: "",
    contactInfo: "",
    receiveUpdates: false,
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: onboardingSchema,
    onSubmit: (values) => {
      const data: any = {};
      Object.entries(values).forEach(([field, value]) => {
        if (data[field]) return;

        const VALIDATION_FIELDS = [
          "industry_others",
          "primaryGoal_others",
          "leadSource_others",
        ];

        const CONSENT_FIELDS = ["contactInfo", "preferredContactMethod"];

        if (!VALIDATION_FIELDS.includes(field)) {
          if (field === "feedbackCallConsent") {
            return (data[field] = value || "No");
          }

          if (
            CONSENT_FIELDS.includes(field) &&
            values["feedbackCallConsent"] !== "Yes"
          )
            return;

          if (value !== "") return (data[field] = value);
        }

        const fieldName = field.split("_")[0]!;

        if (values[fieldName] === "Others") {
          data[fieldName] = value;
        }
      });
      dispatch(onboardUser(data));
    },
  });

  const runSectionValidator = async (currentSectionIndex: number) => {
    const sectionFields = getOnboardingSectionFields(currentSectionIndex);
    if (!sectionFields) return true;

    let hasInvalidField = false;

    for (let field of sectionFields) {
      // Trigger it as touched
      const validationResult = await validation.setFieldTouched(field, true);
      if (validationResult && field in validationResult) {
        hasInvalidField = true;
      }
    }
    return hasInvalidField;
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const goToPrevSection = () => prevStep();

  const goToNextSection = () => {
    runSectionValidator(currentStep - 1).then((hasInvalidField: boolean) => {
      if (!hasInvalidField) {
        nextStep();
      }
    });
  };

  const handleSkipOnboarding = () => {
    dispatch(skipOnboarding());
  };

  // Successful onboarding
  useEffect(() => {
    const handleOnboardingSuccess = () => {
      if (onboarded) {
        dispatch(getProfile());
        dispatch(resetOnboardUser());
        return navigate("/dashboard", { replace: true });
      }
    };

    handleOnboardingSuccess();
  }, [onboarded]);

  // Failed onboarding
  useEffect(() => {
    const handleOnboardingFailed = () => {
      if (onboardingErrorMessage) {
        toast.error(onboardingErrorMessage);
        if (onboardingErrors) {
          validation.setErrors(onboardingErrors);
        }
        dispatch(resetOnboardUser());
      }
    };

    handleOnboardingFailed();
  }, [onboardingErrorMessage]);

  // Successful skip onboarding
  useEffect(() => {
    const handleSkipOnboardingSuccess = () => {
      if (onboardingSkipped) {
        dispatch(resetSkipOnboarding());
        return navigate("/dashboard", { replace: true });
      }
    };
    handleSkipOnboardingSuccess();
  }, [onboardingSkipped]);

  // Failed skip onboarding
  useEffect(() => {
    const handleSkipOnboardingFailed = () => {
      if (skipOnboardingErrorMessage) {
        toast.error(skipOnboardingErrorMessage);
        dispatch(resetSkipOnboarding());
      }
    };
    handleSkipOnboardingFailed();
  }, [skipOnboardingErrorMessage]);

  if (fetchingProfile) return <Loader className="w-dvw h-dvh" />;

  return (
    <React.Fragment>
      <div className="flex items-center">
        <img src={blacksightLogo} className="max-h-10 object-contain" />
      </div>

      {/* Form */}
      <div className="w-[90%] max-w-[450px] relative">
        {(onboarding || skippingOnboarding) && <Loader />}

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-center font-caladea">
            Welcome to Blacksight👋
          </h1>
          <p className="text-center text-sm">We're glad to have you onboard!</p>
        </div>

        {/* Progress */}
        <div className="my-8">
          <FormRange currentRange={currentStep} totalRange={totalSteps} />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant={"brand"}
            className="border-none  duration-500 py-1 h-9 !text-sm"
            onClick={handleSkipOnboarding}
            disabled={skippingOnboarding}
          >
            Skip
            <ChevronsRight />
          </Button>
        </div>

        {currentStep === 1 && (
          <RoleSelector
            proceed={goToNextSection}
            userRole={validation.values.role}
            setFieldValue={validation.setFieldValue}
          />
        )}

        {currentStep > 1 && (
          <form
            className="pt-8 w-full max-w-[450px]"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            {currentStep === 2 && <BasicInformation validation={validation} />}
            {currentStep === 3 && <Personalization validation={validation} />}
            {currentStep === 4 && <ProductFeedback validation={validation} />}
            {currentStep === 5 && (
              <MarketingAndCommunication validation={validation} />
            )}

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              {currentStep > 1 && (
                <Button
                  onClick={goToPrevSection}
                  type="button"
                  variant={"secondary_gray"}
                  className="border-none bg-gray-200 hover:bg-gray-300 duration-500"
                >
                  Back
                </Button>
              )}
              {currentStep > 1 && currentStep < totalSteps && (
                <Button onClick={goToNextSection} type="button">
                  Next
                </Button>
              )}
              {currentStep === totalSteps && (
                <Button type="submit">Continue</Button>
              )}
            </div>
          </form>
        )}
      </div>

      <div className="h-10"></div>
    </React.Fragment>
  );
};

export const Onboarding = () => {
  return (
    <AuthPageLayout>
      <Onboarder />
    </AuthPageLayout>
  );
};
