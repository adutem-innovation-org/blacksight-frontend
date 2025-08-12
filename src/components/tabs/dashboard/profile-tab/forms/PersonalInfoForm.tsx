import { Button, FormGroup } from "@/components/form";
import { Loader } from "@/components/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProfile, useStore } from "@/hooks";
import { personalInfoSchema } from "@/schemas";
import { getProfile, resetUpdateProfile, updateProfile } from "@/store";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface FormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export const PersonalInfoForm = ({ isOpen, onOpenChange }: FormProps) => {
  const { dispatch, getState } = useStore();

  const {
    updatingProfile,
    profileUpdated,
    updateProfileErrors,
    updateProfileErrorMessage,
  } = getState("Auth");

  const { user } = useProfile();

  /**
   * ================================
   * ✅ Form setup
   * ================================
   */
  const initialValues: { firstName: string; lastName: string; phone: string } =
    {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      phone: user?.phone ?? "",
    };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: personalInfoSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values));
    },
  });

  /**
   * ==================================
   * ✅ Form setup end
   * ==================================
   */

  /**
   * ===========
   * ✅ Form api feedback effects
   * ========
   */

  useEffect(() => {
    if (profileUpdated) {
      toast.success("Profile info updated");
      dispatch(getProfile());
      dispatch(resetUpdateProfile());
      onOpenChange(false);
    }
  }, [profileUpdated]);

  useEffect(() => {
    if (updateProfileErrorMessage) {
      toast.error(updateProfileErrorMessage);
      if (Object.keys(updateProfileErrors).length > 0) {
        validation.setErrors(updateProfileErrors);
      }
      dispatch(resetUpdateProfile());
    }
  }, [updateProfileErrorMessage]);

  /**
   * =============
   * ✅ Form api feedback effects end
   * ============
   */

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {updatingProfile && <Loader />}
        <DialogHeader>
          <DialogTitle>Edit personal info</DialogTitle>
          <DialogDescription>
            Update your profile information to reflect your latest credentials.
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
              groupLabel="First name"
              placeholder="Enter your first name"
              size="md"
              name="firstName"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <FormGroup
              type="text"
              groupLabel="Last name"
              placeholder="Enter your last name"
              size="md"
              name="lastName"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <FormGroup
              type="phone"
              groupLabel="Phone"
              placeholder="Enter your contact number"
              size="md"
              name="phone"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />

            <Button
              className="w-full cursor-pointer mt-10"
              type="submit"
              disabled={updatingProfile}
            >
              Update profile
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
