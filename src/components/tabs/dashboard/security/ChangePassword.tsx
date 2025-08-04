import { Button, FormGroup } from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProfile, useStore } from "@/hooks";
import { passwordUpdateSchema } from "@/schemas";
import { changePassword, resetChangePassword, setupPassword } from "@/store";
import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader, Spinner } from "@/components/progress";

export const ChangePasswordSection = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { dispatch, getState } = useStore();

  const {
    changingPassword,
    passwordChanged,
    changePasswordErrorMessage,
    changePasswordErrors,
  } = getState("Auth");
  const { user } = useProfile();

  const onOpenFormChange = (val: boolean) => {
    if (!val) {
      validation.resetForm();
      dispatch(resetChangePassword());
    }
    setFormOpen(val);
  };

  const hasOldPassword = useMemo(() => user && user.passwordChangedAt, [user]);

  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: passwordUpdateSchema(!!user?.passwordChangedAt),
    onSubmit: (values) => {
      const { password, oldPassword } = values;
      if (hasOldPassword)
        return dispatch(changePassword({ password, oldPassword }));
      return dispatch(setupPassword({ password }));
    },
  });

  useEffect(() => {
    if (passwordChanged) {
      toast.success("Password changed successfully");
      validation.resetForm();
      dispatch(resetChangePassword());
      onOpenFormChange(false);
    }
  }, [passwordChanged]);

  useEffect(() => {
    if (changePasswordErrorMessage) {
      toast.error(changePasswordErrorMessage);
      if (Object.keys(changePasswordErrors ?? {}).length !== 0) {
        validation.setErrors(changePasswordErrors);
      }
      dispatch(resetChangePassword());
    }
  }, [changePasswordErrorMessage]);

  const openForm = () => setFormOpen(true);

  return (
    <div className="py-4 px-6 bg-gray-50 rounded-2xl">
      <div className="flex justify-between items-center">
        {/* Left content */}
        <div>
          <h2 className="text-xl md:text-2xl font-medium tracking-tighter text-gray-600">
            Change your password
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Set a secure to protect your account at all times.
          </p>
        </div>

        <Button
          className="rounded-lg !text-sm py-0"
          size={"sm"}
          type="button"
          onClick={openForm}
        >
          Edit
          <Pencil />
        </Button>
      </div>

      {/* Chnage password form */}
      <ChangePasswordForm
        validation={validation}
        isOpen={formOpen}
        onOpenChange={onOpenFormChange}
        hasOldPassword={!!hasOldPassword}
        changingPassword={changingPassword}
      />
    </div>
  );
};

const ChangePasswordForm = ({
  validation,
  isOpen,
  onOpenChange,
  hasOldPassword,
  changingPassword,
}: {
  validation: any;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  hasOldPassword: boolean;
  changingPassword: boolean;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset bg-black/40 backdrop-blur-[2px]" />
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-4xl p-0"
      >
        {changingPassword && <Loader />}

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
              {hasOldPassword && (
                <FormGroup
                  name="oldPassword"
                  type="password"
                  validation={validation}
                  groupLabel="Current password"
                  placeholder="Enter your current password"
                  containerClassName="gap-2 mt-4"
                />
              )}
              <FormGroup
                name="password"
                type="password"
                validation={validation}
                groupLabel="New password"
                placeholder="Enter your desired password"
                containerClassName="gap-2 mt-4"
              />
              <FormGroup
                name="confirmPassword"
                type="password"
                validation={validation}
                groupLabel="Confirm new password"
                placeholder="Enter your new password again"
                containerClassName="gap-2 mt-4"
              />
            </div>
          </motion.div>
          <div className="flex gap-4 justify-end border-t border-gray-200 p-4 min-[420px]:p-8">
            <Button
              className="w-full cursor-pointer bg-brand rounded-2xl"
              type="submit"
              disabled={changingPassword}
            >
              {changingPassword && <Spinner />}
              {changingPassword
                ? "Updating..."
                : hasOldPassword
                ? "Update password"
                : "Setup password"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
