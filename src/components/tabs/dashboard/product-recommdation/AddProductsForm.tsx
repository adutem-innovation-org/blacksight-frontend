import { Button, FormGroup } from "@/components/form";
import { Loader, Spinner } from "@/components/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { INDUSTRIES, KBSourceType } from "@/constants";
import {
  ApiProductsUpdateInterval,
  ApiSourceAuthMethod,
  FileTypes,
  KnowledgeBaseSources,
} from "@/enums";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import {
  generateKnowledgeBaseSchema,
  knowledgeBaseSchema,
  productsSourceSchema,
} from "@/schemas";
import {
  addProductsSource,
  getAllProductsSources,
  resetAddProductsSource,
} from "@/store";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ApiSourceForm, FileSourceForm, TextSourceForm } from "./SourceForms";

interface AddProductFormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  sourceData: KBSourceType | null;
}

export const AddProductsForm = ({
  isOpen,
  onOpenChange,
  sourceData,
}: AddProductFormProps) => {
  const { dispatch, getState } = useStore();
  const {
    addingProductsSource,
    productsSourceAdded,
    addProductsSourceErrors,
    addProductsSourceErrorMessage,
  } = getState("ProductRecommendation");
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const initialValues = useMemo(
    () => ({
      tag: "",
      source: sourceData?.source,
      text: "",
      file: "",
      apiUrl: "",
      authMethod: ApiSourceAuthMethod.NONE,
      apiKey: "",
      bearerToken: "",
      username: "",
      password: "",
      updateInterval: ApiProductsUpdateInterval.NEVER,
    }),
    [sourceData]
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: productsSourceSchema,
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
        case KnowledgeBaseSources.API:
          formData.append("apiUrl", values.apiUrl);
          formData.append("authMethod", values.authMethod);
          formData.append("updateInterval", values.updateInterval);
          if (values.authMethod === ApiSourceAuthMethod.X_API_KEY) {
            formData.append("apiKey", values.apiKey);
          } else if (values.authMethod === ApiSourceAuthMethod.BEARER) {
            formData.append("bearerToken", values.bearerToken);
          } else if (values.authMethod === ApiSourceAuthMethod.BASIC) {
            formData.append("username", values.username);
            formData.append("password", values.password);
          }
          break;
      }
      dispatch(addProductsSource(formData));
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

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      validation.resetForm();
    }
    onOpenChange(val);
  };

  useEffect(() => {
    if (productsSourceAdded) {
      toast.success("Products source added");
      // Reset add products source state
      dispatch(resetAddProductsSource());
      // Reset form
      validation.resetForm();
      // Close the modal
      onOpenChange(false);
      // Dispatch fetch products sources
      dispatch(getAllProductsSources());
    }
  }, [productsSourceAdded]);

  useEffect(() => {
    if (addProductsSourceErrorMessage) {
      toast.error(addProductsSourceErrorMessage);
      if (Object.keys(addProductsSourceErrors).length > 0) {
        validation.setErrors(addProductsSourceErrors);
      }
      const tmo = setTimeout(() => {
        dispatch(resetAddProductsSource());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [addProductsSourceErrorMessage]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          "!rounded-3xl p-0 max-h-[85dvh] h-max overflow-y-hidden overflow-x-hidden flex flex-col",
          {
            "!w-[90dvw] !max-w-[800px] !sm:max-w-auto":
              KnowledgeBaseSources.TEXT_INPUT,
          }
        )}
      >
        {addingProductsSource && (
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
            <DialogDescription>{sourceData?.description}</DialogDescription>
          </motion.div>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          className="flex flex-col flex-1 relative"
        >
          <div className="overflow-y-auto flex-1 pb-8 no-scrollbar relative">
            {sourceData?.source === KnowledgeBaseSources.FILE && (
              <FileSourceForm
                validation={validation}
                onSelectFile={onSelectFile}
                removeSelectedFile={removeSelectedFile}
              />
            )}
            {sourceData?.source === KnowledgeBaseSources.TEXT_INPUT && (
              <TextSourceForm validation={validation} />
            )}
            {sourceData?.source === KnowledgeBaseSources.API && (
              <ApiSourceForm validation={validation} />
            )}
          </div>

          <div className="flex gap-4 justify-end border-t border-gray-200 p-8">
            <Button
              className={cn("cursor-pointer w-full rounded-2xl px-8")}
              type="submit"
              disabled={addingProductsSource}
            >
              {addingProductsSource && <Spinner />}
              {sourceData?.label}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
