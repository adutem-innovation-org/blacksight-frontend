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
import { UpdateBusinessBasicInfoBody } from "@/interfaces";
import { basicInfoSchema } from "@/schemas";
import {
  getProfile,
  resetUpdateBusinessBasicInfo,
  updateBusinessBasicInfo,
} from "@/store";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface FormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export const BasicInfoForm = ({ isOpen, onOpenChange }: FormProps) => {
  const { dispatch, getState } = useStore();

  const {
    updatingBusinessBasicInfo,
    businessBasicInfoUpdated,
    updateBusinessBasicInfoErrors,
    updateBusinessBasicInfoErrorMessage,
  } = getState("Auth");

  const { user } = useProfile();

  /**
   * ================================
   * ✅ Form setup
   * ================================
   */
  const initialValues: UpdateBusinessBasicInfoBody = {
    name: user?.businessInfo?.name ?? "",
    website: user?.businessInfo?.website ?? "",
    address: user?.businessInfo?.address ?? "",
    industry: user?.businessInfo?.industry ?? "",
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: basicInfoSchema,
    onSubmit: (values) => {
      dispatch(updateBusinessBasicInfo(values));
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
    if (businessBasicInfoUpdated) {
      toast.success("Business info successfuly updated");
      dispatch(getProfile());
      dispatch(resetUpdateBusinessBasicInfo());
      onOpenChange(false);
    }
  }, [businessBasicInfoUpdated]);

  useEffect(() => {
    if (updateBusinessBasicInfoErrorMessage) {
      toast.error(updateBusinessBasicInfoErrorMessage);
      if (Object.keys(updateBusinessBasicInfoErrors).length > 0) {
        validation.setErrors(updateBusinessBasicInfoErrors);
      }
      dispatch(resetUpdateBusinessBasicInfo());
    }
  }, [updateBusinessBasicInfoErrorMessage]);

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
        {updatingBusinessBasicInfo && <Loader />}
        <DialogHeader>
          <DialogTitle>Tell us about your business</DialogTitle>
          <DialogDescription>
            Provide basic details about your business.
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
              groupLabel="Business name"
              placeholder="Enter your business name"
              size="md"
              name="name"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <FormGroup
              type="text"
              groupLabel="Website"
              placeholder="Provide link to your webiste"
              size="md"
              name="website"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <FormGroup
              type="text"
              groupLabel="Address"
              placeholder="Provide your business address"
              size="md"
              name="address"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <FormGroup
              type="text"
              groupLabel="Service Type"
              placeholder="What sector does your business operate in?"
              size="md"
              name="industry"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <Button
              className="w-full cursor-pointer mt-10"
              type="submit"
              disabled={updatingBusinessBasicInfo}
            >
              Update Info
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
