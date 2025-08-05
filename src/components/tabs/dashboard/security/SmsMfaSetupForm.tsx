import { Button, FormGroup } from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/hooks";
import { enableSMSMfa } from "@/store";
import { useFormik } from "formik";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader, Spinner } from "@/components/progress";
import * as yup from "yup";

export const SmsMfaSetupForm = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const { dispatch, getState } = useStore();
  const { enablingMfaMethod, mfaMethodEnabled, enableMfaMethodErrors } =
    getState("Auth");

  const handleOpenChange = (val: boolean) => {
    onOpenChange(val);
    if (!val) {
      validation.resetForm();
      validation.setErrors({});
    }
  };

  const initialValues = {
    phoneNumber: "",
  };

  const validationSchema = yup.object({
    phoneNumber: yup
      .string()
      .required("Please provide phone number")
      .matches(/^\+?[0-9\s\-().]{7,20}$/, "Invalid phone number"),
  });

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(enableSMSMfa(values));
    },
  });

  useEffect(() => {
    if (mfaMethodEnabled) {
      handleOpenChange(false);
    }
  }, [mfaMethodEnabled]);

  useEffect(() => {
    if (enableMfaMethodErrors) {
      validation.setErrors(enableMfaMethodErrors);
    }
  }, [enableMfaMethodErrors]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay className="fixed inset bg-black/40 backdrop-blur-[2px]" />
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-4xl p-0"
      >
        {enablingMfaMethod && <Loader />}

        <DialogHeader className="p-4 min-[420px]:p-8 !pb-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DialogTitle className="text-xl">Change your password</DialogTitle>
            <DialogDescription>
              Provide basic details about your business.
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-y-auto flex-1 no-scrollbar relative overflow-hidden pb-8"
          >
            <div className="px-4 min-[420px]:px-8">
              <FormGroup
                name="phoneNumber"
                type="phone"
                validation={validation}
                groupLabel="Phone number"
                placeholder="Enter your phone number"
                containerClassName="gap-2 mt-4"
              />
            </div>
          </motion.div>
          <div className="flex gap-4 justify-end border-t border-gray-200 p-4 min-[420px]:p-8">
            <Button
              className="w-full cursor-pointer bg-brand rounded-2xl"
              type="submit"
              disabled={enablingMfaMethod}
            >
              {enablingMfaMethod && <Spinner />}
              {enablingMfaMethod ? "Processing..." : "Enable SMS MFA"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
