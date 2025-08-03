import { Button, FormGroup } from "@/components/form";
import { Loader } from "@/components/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { INDUSTRIES, KBSourceType } from "@/constants";
import { FileTypes, KnowledgeBaseSources } from "@/enums";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { knowledgeBaseSchema } from "@/schemas";
import {
  addKnowledgeBase,
  getAllKnowledgeBases,
  getKnowledgeBaseAnalytics,
  resetAddKnowledgeBase,
} from "@/store";
import { Divider } from "@mantine/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  } = getState("KnowledgeBase");
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const initialValues = {
    tag: "",
    source: sourceData?.source,
    text: "",
    file: "",
    url: "",

    // for prompt
    businessName: "",
    businessDescripton: "",
    industry: "",
    prompt: "",
    answer: "",
  };

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
          formData.append("prompt", values.prompt);
          formData.append("businessName", values.businessName);
          formData.append("businessDescripton", values.businessDescripton);
          formData.append("industry", values.industry);
          break;
      }
      dispatch(addKnowledgeBase(formData));
    },
  });

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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          "!rounded-3xl p-0 max-h-[85dvh] h-max overflow-y-hidden overflow-x-hidden flex flex-col",
          {
            "!w-[90dvw] !max-w-[800px] !sm:max-w-auto":
              validation.values.source === KnowledgeBaseSources.TEXT_INPUT,
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
          <DialogDescription>{sourceData?.description}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="overflow-y-auto flex-1 pb-8 no-scrollbar">
            <div className="px-8">
              <FormGroup
                type="text"
                groupLabel="Tag"
                placeholder="A short description/title"
                size="md"
                name="tag"
                validation={validation}
                containerClassName="gap-2 mt-4"
              />

              {validation.values.source === KnowledgeBaseSources.URL && (
                <FormGroup
                  type="text"
                  groupLabel="URL"
                  placeholder="https://example.com"
                  size="md"
                  name="url"
                  validation={validation}
                  containerClassName="gap-2 mt-4"
                />
              )}

              {validation.values.source === KnowledgeBaseSources.FILE && (
                <FormGroup
                  type="file-input"
                  groupLabel={"Upload file"}
                  size="md"
                  name={"file"}
                  validation={validation}
                  containerClassName="gap-2 mt-4"
                  handleFileChange={onSelectFile}
                  accept="text/plain, text/markdown, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                  removeSelectedFile={removeSelectedFile}
                  fileTypes={[FileTypes.PDF, FileTypes.DOCX, FileTypes.TXT]}
                  maxFileSize={15}
                />
              )}

              {validation.values.source === KnowledgeBaseSources.TEXT_INPUT && (
                <FormGroup
                  type="textarea"
                  name="text"
                  groupLabel="Text Content"
                  placeholder="Enter your text content here"
                  size="lg"
                  validation={validation}
                  containerClassName="gap-2 mt-4"
                />
              )}
            </div>

            {/* For adding from prompt */}
            {validation.values.source === KnowledgeBaseSources.PROMPT && (
              <AiPromptForm validation={validation} />
            )}
          </div>

          <div className="flex gap-4 justify-end border-t border-gray-200 p-8">
            {validation.values.source === KnowledgeBaseSources.PROMPT && (
              <Button
                type="button"
                variant={"secondary_gray"}
                className="bg-gray-200 duration-300 hover:bg-gray-100 px-6 rounded-2xl"
              >
                Generate KB ✨
              </Button>
            )}
            <Button
              className="cursor-pointer w-full rounded-2xl px-8"
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

const AiPromptForm = ({ validation }: { validation: any }) => {
  return (
    <div className="px-8">
      <FormGroup
        type="text"
        groupLabel="Business name"
        placeholder="Business name"
        size="md"
        name="businessName"
        containerClassName="gap-2 mt-4"
        validation={validation}
      />

      <FormGroup
        type="textarea"
        name="businessDescription"
        groupLabel="Description"
        placeholder="Briefly describe your business"
        size="sm"
        validation={validation}
        containerClassName="gap-2 mt-4"
        maxLength={200}
        inputClassName="h-20 !resize-none !text-sm"
      />

      <FormGroup
        type="select"
        groupLabel="What industry is your business in?"
        size="md"
        name="industry"
        validation={validation}
        containerClassName="gap-2 mt-4"
        options={INDUSTRIES}
      />

      <FormGroup
        type="textarea"
        name="prompt"
        groupLabel="Prompt"
        placeholder="You are a helpful assistant that generates high-quality content. Please provide informative and accurate responses."
        size="sm"
        validation={validation}
        containerClassName="gap-2 mt-4"
        maxLength={1000}
        inputClassName="h-25 !resize-none"
      />
    </div>
  );
};
