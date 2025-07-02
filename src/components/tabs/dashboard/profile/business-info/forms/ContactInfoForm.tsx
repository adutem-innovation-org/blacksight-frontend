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
import { contactInfoSchema } from "@/schemas";
import { UpdateBusinessContactInfoBody } from "@/interfaces";
import {
  getProfile,
  resetUpdateBusinessContactInfo,
  updateBusinessContactInfo,
} from "@/store";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface FormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export const ContactInfoForm = ({ isOpen, onOpenChange }: FormProps) => {
  const { dispatch, getState } = useStore();

  const {
    updatingBusinessContactInfo,
    businessContactInfoUpdated,
    updateBusinessContactInfoErrors,
    updateBusinessContactInfoErrorMessage,
  } = getState("Auth");

  const { user } = useProfile();

  /**
   * ================================
   * ✅ Form setup
   * ================================
   */
  const initialValues: UpdateBusinessContactInfoBody = {
    contactName: user?.businessInfo?.contactName ?? "",
    contactEmail: user?.businessInfo?.contactEmail ?? "",
    contactTel: user?.businessInfo?.contactTel ?? "",
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: contactInfoSchema,
    onSubmit: (values) => {
      dispatch(updateBusinessContactInfo(values));
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
    if (businessContactInfoUpdated) {
      toast.success("Business contact info updated");
      dispatch(getProfile());
      dispatch(resetUpdateBusinessContactInfo());
      onOpenChange(false);
    }
  }, [businessContactInfoUpdated]);

  useEffect(() => {
    if (updateBusinessContactInfoErrorMessage) {
      toast.error(updateBusinessContactInfoErrorMessage);
      if (Object.keys(updateBusinessContactInfoErrors).length > 0) {
        validation.setErrors(updateBusinessContactInfoErrors);
      }
      dispatch(resetUpdateBusinessContactInfo());
    }
  }, [updateBusinessContactInfoErrorMessage]);

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
        {updatingBusinessContactInfo && <Loader />}
        <DialogHeader>
          <DialogTitle>How can we reach you?</DialogTitle>
          <DialogDescription>
            Enter your contact details to verify and communicate with you.
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
              groupLabel="Name"
              placeholder="Enter your contact name"
              size="md"
              name="contactName"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <FormGroup
              type="text"
              groupLabel="Email"
              placeholder="example@business.com"
              size="md"
              name="contactEmail"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <FormGroup
              type="phone"
              groupLabel="Phone Number"
              placeholder="Provide your contact phone number"
              size="md"
              name="contactTel"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <Button
              className="w-full cursor-pointer mt-10"
              type="submit"
              disabled={updatingBusinessContactInfo}
            >
              Update Info
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
