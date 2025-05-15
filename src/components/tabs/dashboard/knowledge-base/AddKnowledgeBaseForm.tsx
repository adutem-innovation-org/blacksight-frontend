import { Button, FormGroup } from "@/components/form";
import { Loader } from "@/components/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/hooks";
import { knowledgeBaseSchema } from "@/schemas";
import {
  addKnowledgeBase,
  getAllKnowledgeBases,
  getKnowledgeBaseAnalytics,
  resetAddKnowledgeBase,
} from "@/store";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type FormSectionProps = {
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
};

interface AddKnowledgeBaseProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export const AddKnowledgeBaseForm = ({
  isOpen,
  onOpenChange,
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
    file: "",
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: knowledgeBaseSchema,
    onSubmit: (values) => {
      const { tag } = values;
      const formData = new FormData();
      formData.append("tag", tag);
      formData.append("file", currentFile as Blob);
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
        <DialogHeader>
          <DialogTitle>Add Knowledge base</DialogTitle>
          <DialogDescription>
            Define the information your assistant will use to respond to user
            inquiries and handle tasks such as booking appointments.
          </DialogDescription>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <FormGroup
              type="text"
              groupLabel="Tag"
              placeholder="A short description/title"
              size="md"
              name="tag"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
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
            />

            <Button
              className="w-full cursor-pointer mt-10"
              type="submit"
              disabled={addingKnowledgeBase}
            >
              Add knowledge base
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
