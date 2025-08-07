import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { uploadPaymentsFileSchema } from "@/schemas";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FileTypes } from "@/enums";
import { Button, FormGroup } from "@/components/form";
import { Paperclip } from "lucide-react";
import {
  getAllPaymentFiles,
  resetUploadPaymentFile,
  uploadPaymentFile,
} from "@/store";
import { Loader, Spinner } from "@/components/progress";
import toast from "react-hot-toast";
import { InfoBlock } from "@/components/InfoBlock";
import { Badge } from "@/components/badge";

export const UploadPaymentFileForm = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const { dispatch, getState } = useStore();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const {
    uploadingPaymentFile,
    paymentFileUploaded,
    uploadPaymentFileErrorMsg,
    uploadPaymentFileErrors,
  } = getState("PaymentTracker");

  const initialValues = useMemo(
    () => ({
      tag: "",
      file: "",
    }),
    []
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: uploadPaymentsFileSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("tag", values.tag);
      formData.append("file", currentFile as Blob);
      dispatch(uploadPaymentFile(formData));
    },
  });

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      validation.resetForm();
    }
    onOpenChange(val);
  };

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
    if (paymentFileUploaded) {
      dispatch(getAllPaymentFiles());
      dispatch(resetUploadPaymentFile());
      validation.resetForm();
      onOpenChange(false);
    }
  }, [paymentFileUploaded]);

  useEffect(() => {
    if (uploadPaymentFileErrorMsg) {
      toast.error(uploadPaymentFileErrorMsg);
      if (uploadPaymentFileErrors.file) {
        validation.setErrors(uploadPaymentFileErrors);
      }
      dispatch(resetUploadPaymentFile());
    }
  }, [uploadPaymentFileErrorMsg]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay className="fixed inset bg-black/40 backdrop-blur-[2px]" />
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          "rounded-4xl p-0 max-h-[85dvh] h-max overflow-y-hidden overflow-x-hidden flex flex-col"
        )}
      >
        {uploadingPaymentFile && <Loader />}
        <DialogHeader className="p-4 min-[420px]:p-8 !pb-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DialogTitle className="text-xl">Upload Payment File</DialogTitle>
            <DialogDescription>
              Upload your customer records and start automating your billing.
            </DialogDescription>
            <InfoBlock
              variant={"warning"}
              className="mt-2 cursor-pointer shadow"
            >
              Make sure your file includes:{" "}
              <span className="font-semibold">
                name, email, lastPayment, and paymentInterval.
              </span>{" "}
              Tap to learn more.
            </InfoBlock>
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-y-auto flex-1 no-scrollbar relative overflow-hidden pb-8"
          >
            <div className="px-4 min-[420px]:px-8">
              <FormGroup
                type="text"
                groupLabel="Tag"
                placeholder="e.g. APEX Plan Customers - 2025"
                size="md"
                name="tag"
                validation={validation}
                containerClassName={"gap-2 mt-4"}
                info="Tags are use to quick search for files in the future."
              />
              <FormGroup
                type="file-input"
                groupLabel="Upload Product File"
                size="md"
                name="file"
                validation={validation}
                containerClassName={"gap-2 mt-4"}
                placeholder="A short description/title"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv, application/vnd.ms-excel"
                handleFileChange={onSelectFile}
                removeSelectedFile={removeSelectedFile}
                fileTypes={[FileTypes.XLSX, FileTypes.CSV, FileTypes.XLS]}
                info="Ensure your file is in the correct format and includes the required columns for best results."
              />
            </div>
          </motion.div>
          <div className="flex gap-4 justify-end border-t border-gray-200 p-4 min-[420px]:p-8">
            <Button
              className="w-full cursor-pointer bg-brand rounded-2xl"
              type="submit"
              disabled={uploadingPaymentFile}
            >
              {uploadingPaymentFile ? (
                <>
                  Uploading... <Spinner />
                </>
              ) : (
                <>
                  Upload <Paperclip />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
