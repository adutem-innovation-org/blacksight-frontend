import { Button, FormGroup } from "@/components/form";
import { Loader } from "@/components/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { INDUSTRIES, KBSourceType } from "@/constants";
import { FileTypes, KnowledgeBaseSources } from "@/enums";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { generateKnowledgeBaseSchema, knowledgeBaseSchema } from "@/schemas";
import {
  addKnowledgeBase,
  clearGeneratedKB,
  generateKnowledgeBase,
  getAllKnowledgeBases,
  getKnowledgeBaseAnalytics,
  resetAddKnowledgeBase,
  resetGenerateKnowledgeBase,
} from "@/store";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { GeneratingLoader } from "./GeneratingLoader";
import { AiPromptForm } from "./AiPrompForm";
import { DefaultKBForm } from "./DefaultKBForm";

interface AddKnowledgeBaseProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  sourceData: KBSourceType | null;
}

export const AddKnowledgeBaseForm = ({
  isOpen,
  onOpenChange,
  sourceData,
}: AddKnowledgeBaseProps) => {
  const { dispatch, getState } = useStore();
  const {
    addingKnowledgeBase,
    knowledgeBaseAdded,
    addKnowledgeBaseErrorMessage,
    addKnowledgeBaseErrors,

    // Generate knowledge base
    generatingKnowledgeBase,
    knowledgeBaseGenerated,
    generateKnowledgeBaseError,
    generatedKB,
  } = getState("KnowledgeBase");
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const initialValues = useMemo(
    () => ({
      tag: "",
      source: sourceData?.source,
      text: "",
      file: "",
      url: "",
      generatedKB: "",
    }),
    [sourceData]
  );

  const initialAiPromptValues = useMemo(
    () => ({
      prompt: "",
      businessName: "",
      businessDescription: "",
      industry: "",
    }),
    []
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: knowledgeBaseSchema,
    onSubmit: (values) => {
      const { tag, source } = values;
      const formData = new FormData();

      // The form should not be open without a source
      if (!source) return onOpenChange(false);

      formData.append("tag", tag);
      formData.append("source", source);

      switch (source) {
        case KnowledgeBaseSources.FILE:
          formData.append("file", currentFile as Blob);
          break;
        case KnowledgeBaseSources.TEXT_INPUT:
          formData.append("text", values.text);
          break;
        case KnowledgeBaseSources.URL:
          formData.append("url", values.url);
          break;
        case KnowledgeBaseSources.PROMPT:
          formData.append("generatedKB", values.generatedKB);
          break;
      }
      dispatch(addKnowledgeBase(formData));
    },
  });

  const aiPromptValidation = useFormik({
    enableReinitialize: false,
    initialValues: initialAiPromptValues,
    validationSchema: generateKnowledgeBaseSchema,
    onSubmit: (values) => {
      let fullPrompt = `
            Instruction: ${values.prompt}

            Business Name: ${values.businessName}
            Business Description: ${values.businessDescription}
            Industry: ${values.industry}
          `;
      dispatch(
        generateKnowledgeBase({
          prompt: fullPrompt,
        })
      );
    },
  });

  useEffect(() => {
    if (knowledgeBaseGenerated) {
      validation.setFieldValue("generatedKB", generatedKB);
      dispatch(resetGenerateKnowledgeBase());
    }
  }, [knowledgeBaseGenerated]);

  useEffect(() => {
    if (generateKnowledgeBaseError) {
      toast.error(generateKnowledgeBaseError);
      dispatch(resetGenerateKnowledgeBase());
    }
  }, [generateKnowledgeBaseError]);

  const onSelectFile = (e: any) => {
    let file = e.target.files[0];
    if (file) {
      setCurrentFile(file);
      validation.setFieldValue(e.target.name, file.name);
    }
  };

  const removeSelectedFile = (name: string) => {
    setCurrentFile(null);
    validation.setFieldValue(name, "");
  };

  const generateKB = () => {
    aiPromptValidation.handleSubmit();
  };

  const rejectGeneratedKB = () => {
    validation.setFieldValue("generatedKB", "");
    dispatch(clearGeneratedKB());
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      validation.resetForm();
      aiPromptValidation.resetForm();
      dispatch(clearGeneratedKB());
    }
    onOpenChange(val);
  };

  useEffect(() => {
    if (knowledgeBaseAdded) {
      toast.success("Knowledge base added successfully");
      // Reset add knowledge base state
      dispatch(resetAddKnowledgeBase());
      // Reset form
      validation.resetForm();
      // Close the modal
      onOpenChange(false);
      // Dispatch fetch knowledgebases
      dispatch(getAllKnowledgeBases());
      // Dispatch fetch knowledgebase analytics
      dispatch(getKnowledgeBaseAnalytics());
    }
  }, [knowledgeBaseAdded]);

  useEffect(() => {
    if (addKnowledgeBaseErrorMessage) {
      toast.error(addKnowledgeBaseErrorMessage);
      if (addKnowledgeBaseErrors) {
        validation.setErrors(addKnowledgeBaseErrors);
      }
      const tmo = setTimeout(() => {
        dispatch(resetAddKnowledgeBase());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [addKnowledgeBaseErrorMessage]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay className="fixed inset bg-black/40 backdrop-blur-[2px]" />
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          "!rounded-3xl p-0 max-h-[85dvh] h-max overflow-y-hidden overflow-x-hidden flex flex-col",
          {
            "!w-[90dvw] !max-w-[800px] !sm:max-w-auto": [
              KnowledgeBaseSources.TEXT_INPUT,
              KnowledgeBaseSources.PROMPT,
            ].includes(sourceData?.source!),
          }
        )}
      >
        {addingKnowledgeBase && (
          <Loader
            text1={"Do not close this window..."}
            text2={
              "Our AI model is extracting and analysing your document for proper use."
            }
            className="bg-[#ffffffe0] rounded-md"
          />
        )}
        <DialogHeader className="p-8 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <span className="bg-white border rounded-lg w-10 h-10 grid place-items-center">
                <i
                  className={cn(
                    sourceData?.iconClass,
                    "flex text-xl text-gray-500"
                  )}
                ></i>
              </span>
              <DialogTitle className="font-medium tracking-tighter text-xl">
                {sourceData?.label}
              </DialogTitle>
            </div>
            <DialogDescription>
              {sourceData?.source === KnowledgeBaseSources.PROMPT &&
              generatingKnowledgeBase
                ? "Generating knowledgebase..."
                : sourceData?.description}
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          className="flex flex-col flex-1 overflow-hidden relative"
        >
          <div className="overflow-y-auto flex-1 pb-8 no-scrollbar relative overflow-hidden">
            {sourceData?.source !== KnowledgeBaseSources.PROMPT && (
              <DefaultKBForm
                validation={validation}
                onSelectFile={onSelectFile}
                removeSelectedFile={removeSelectedFile}
              />
            )}

            {/* For adding from prompt */}
            {validation.values.source === KnowledgeBaseSources.PROMPT && (
              <AiPromptForm
                validation={validation}
                aiPromptValidation={aiPromptValidation}
              />
            )}

            {/* Generating overlay */}
            {generatingKnowledgeBase && <GeneratingLoader />}
          </div>

          <div className="flex gap-4 justify-end border-t border-gray-200 p-8">
            {validation.values.source === KnowledgeBaseSources.PROMPT &&
              generatedKB && (
                <Button
                  type="button"
                  variant={"secondary_gray"}
                  className="bg-gray-200 duration-300 hover:bg-gray-100 px-6 rounded-2xl font-dmsans tracking-tighter !font-medium"
                  onClick={rejectGeneratedKB}
                >
                  Reject KB 🚫
                </Button>
              )}
            {validation.values.source === KnowledgeBaseSources.PROMPT &&
              !generatedKB && (
                <Button
                  type="button"
                  variant={"secondary_gray"}
                  className="bg-gray-200 duration-300 hover:bg-gray-100 px-6 rounded-2xl font-dmsans tracking-tighter !font-medium"
                  onClick={generateKB}
                  disabled={generatingKnowledgeBase || addingKnowledgeBase}
                >
                  {/* {generatedKB && !generatingKnowledgeBase && "Regenerate KB 💫"} */}
                  {generatingKnowledgeBase && "Generating KB..."}
                  {!generatedKB && !generatingKnowledgeBase && "Generate KB ✨"}
                </Button>
              )}

            <Button
              className={cn("cursor-pointer w-full rounded-2xl px-8", {
                hidden:
                  validation.values.source === KnowledgeBaseSources.PROMPT &&
                  !generatedKB,
              })}
              type="submit"
              disabled={addingKnowledgeBase}
            >
              {validation.values.source !== KnowledgeBaseSources.PROMPT
                ? sourceData?.label
                : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
