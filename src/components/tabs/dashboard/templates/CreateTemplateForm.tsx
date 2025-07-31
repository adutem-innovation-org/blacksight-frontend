import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Button,
  FormGroup,
  FormikValidation,
  getSaveTemplateSectionFields,
  Loader,
} from "@/components";
import { emailTemplateSchema } from "@/schemas";
import { useFormik } from "formik";
import { TemplateCategory, TemplateTabsEnum, TemplateType } from "@/enums";
import { InferType } from "yup";
import { templateCategoryDynamicFieldMap, templateKeywords } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { useProfile, useStore } from "@/hooks";
import toast from "react-hot-toast";
import {
  changeTemplateTab,
  createTemplate,
  getPaginatedTemplates,
  getTemplateAnalytics,
  resetCreateTemplate,
} from "@/store";

const SectionOne = ({ validation }: { validation: FormikValidation }) => {
  return (
    <>
      <FormGroup
        type={"text"}
        groupLabel={"Template name"}
        placeholder={"Enter a desired template name/tag"}
        size={"md"}
        name={"name"}
        validation={validation}
        containerClassName={"gap-2 mt-4"}
      />
      <FormGroup
        type={"textarea"}
        groupLabel={"Description"}
        placeholder={"Enter a desired template name"}
        size={"sm"}
        name={"description"}
        validation={validation}
        containerClassName={"gap-2 mt-4"}
      />
    </>
  );
};

const SectionTwo = ({ validation }: { validation: FormikValidation }) => {
  const category = validation.values.category as TemplateCategory;

  return (
    <>
      <FormGroup
        type={"select"}
        groupLabel={"Category"}
        placeholder={"Select a category"}
        info={
          "The category of a template description with service it is useful for, e.g Payment tracking or appointment reminder."
        }
        size={"md"}
        name={"category"}
        validation={validation}
        containerClassName={"gap-2 mt-4"}
        options={Object.values(TemplateCategory)}
      />
      {category && Object.values(TemplateCategory).includes(category) && (
        <FormGroup
          type={"multi-select"}
          groupLabel={"Dynamic fields"}
          label={"Dynamic fields"}
          placeholder={"Select one or more dynamic fields"}
          info={
            "Dynamic fields are field that are dynamic populate from appointment data or payment data"
          }
          size={"md"}
          name={"dynamicFields"}
          multiSelectInputData={templateCategoryDynamicFieldMap[category] ?? []}
          validation={validation}
          containerClassName={"gap-2 mt-4"}
        />
      )}
      <FormGroup
        type={"multi-select"}
        groupLabel={"Keywords"}
        label={"Keywords"}
        placeholder={"Select one or more keywords"}
        info={"Keywords are used for filter search to a specific niche."}
        size={"md"}
        name={"keywords"}
        multiSelectInputData={templateKeywords}
        validation={validation}
        containerClassName={"gap-2 mt-4"}
      />
    </>
  );
};

type SaveTemplateFormProps = {
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
  exportHtml: () => Promise<{ html: string; design: any }>;
};

export const CreateTemplateForm = ({
  isOpen,
  onOpenChange,
  exportHtml,
}: SaveTemplateFormProps) => {
  const { dispatch, getState } = useStore();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = useRef(2).current;
  const { user } = useProfile();

  const {
    creatingTemplate,
    templateCreated,
    createTemplateErrors,
    createTemplateErrorMessage,
  } = getState("Template");

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));

  const initialValues: InferType<typeof emailTemplateSchema> & {
    dynamicFields: string[];
    keywords: string[];
  } = {
    name: "",
    description: "",
    type: TemplateType.EMAIL,
    category: TemplateCategory.APPOINTMENT,
    dynamicFields: [],
    keywords: [],
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: emailTemplateSchema,
    onSubmit: async (values) => {
      const { html, design } = await exportHtml();
      try {
        dispatch(
          createTemplate({
            ...values,
            html,
            design,
          })
        );
      } catch (e) {
        toast.error("Unable to export template.");
      }
    },
  });

  const runSectionValidator = async (currentSectionIndex: number) => {
    const sectionFields = getSaveTemplateSectionFields(currentSectionIndex);
    if (!sectionFields) return true;

    let hasInvalidField = false;

    for (const field of sectionFields) {
      // Trigger it as touched
      const validationResult = await validation.setFieldTouched(field, true);
      if (validationResult && field in validationResult) {
        hasInvalidField = true;
      }
    }
    return hasInvalidField;
  };

  const goToPrevSection = () => prevStep();

  const goToNextSection = () => {
    runSectionValidator(currentStep - 1).then((hasInvalidField: boolean) => {
      if (!hasInvalidField) {
        nextStep();
      }
    });
  };

  useEffect(() => {
    if (templateCreated) {
      toast.success("Template created successfully");
      // Reset create template state
      dispatch(resetCreateTemplate());
      // Reset form
      validation.resetForm();
      // Close modal
      onOpenChange(false);
      // Get latest analytics
      dispatch(getTemplateAnalytics());
      // Get all templates
      dispatch(getPaginatedTemplates(user?.userType!));
      // Go to templates tab
      dispatch(changeTemplateTab(TemplateTabsEnum.ANALYTICS));
    }
  }, [templateCreated]);

  useEffect(() => {
    if (createTemplateErrorMessage) toast.error(createTemplateErrorMessage);
    if (Object.keys(createTemplateErrors).length)
      validation.setErrors(createTemplateErrors);
    const tmo = setTimeout(() => {
      dispatch(resetCreateTemplate());
      clearTimeout(tmo);
    }, 1400);
  }, [createTemplateErrorMessage]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={"max-h-[85dvh] overflow-y-auto overflow-x-hidden"}
      >
        {creatingTemplate && <Loader />}
        <DialogHeader>
          <DialogTitle>Save template</DialogTitle>
          <DialogDescription>
            Create a new template to use in other services like reminder and
            payment tracking
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          {currentStep === 1 && <SectionOne validation={validation} />}

          {currentStep === 2 && <SectionTwo validation={validation} />}

          {currentStep === totalSteps && (
            <Button className="w-full cursor-pointer mt-10" type="submit">
              Save
            </Button>
          )}
          {currentStep < totalSteps && (
            <Button
              className="w-full cursor-pointer mt-10"
              onClick={goToNextSection}
              variant={"default"}
              size={"md"}
              type="button"
            >
              Next
            </Button>
          )}
          {currentStep > 1 && (
            <Button
              className="w-full cursor-pointer mt-2 bg-accent border-none hover:bg-gray-200 duration-500"
              type="button"
              onClick={goToPrevSection}
              variant={"secondary_gray"}
            >
              Back
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
