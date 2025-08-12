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
import { addressInfoSchema } from "@/schemas";
import { getProfile, resetUpdateAddress, updateAddress } from "@/store";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface FormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export const AddressInfoForm = ({ isOpen, onOpenChange }: FormProps) => {
  const { user } = useProfile();
  const { dispatch, getState } = useStore();

  const {
    updatingAddress,
    addressUpdated,
    updateAddressErrors,
    updateAddressErrorMessage,
  } = getState("Auth");

  /**
   * ================================
   * ✅ Form setup
   * ================================
   */
  const initialValues: {
    country: string;
    state: string;
    city: string;
    zipCode: string;
  } = {
    country: user?.addressInfo?.country || "",
    state: user?.addressInfo?.state || "",
    city: user?.addressInfo?.city || "",
    zipCode: user?.addressInfo?.zipCode || "",
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: addressInfoSchema,
    onSubmit: (values) => {
      dispatch(updateAddress(values));
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
    if (addressUpdated) {
      toast.success("Address info updated");
      dispatch(getProfile());
      dispatch(resetUpdateAddress());
      onOpenChange(false);
    }
  }, [addressUpdated]);

  useEffect(() => {
    if (updateAddressErrorMessage) {
      toast.error(updateAddressErrorMessage);
      if (Object.keys(updateAddressErrors).length > 0) {
        validation.setErrors(updateAddressErrors);
      }
      dispatch(resetUpdateAddress());
    }
  }, [updateAddressErrorMessage]);

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
        {updatingAddress && <Loader />}
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
              groupLabel="Country"
              placeholder="Enter your country"
              size="md"
              name="country"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <FormGroup
              type="text"
              groupLabel="State"
              placeholder="Enter your state"
              size="md"
              name="state"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <FormGroup
              type="text"
              groupLabel="City"
              placeholder="Enter your city"
              size="md"
              name="city"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />
            <FormGroup
              type="text"
              groupLabel="Postal/Zip Code"
              placeholder="Enter your postal/zip code"
              size="md"
              name="zipCode"
              validation={validation}
              containerClassName="gap-2 mt-4"
            />

            <Button className="w-full cursor-pointer mt-10" type="submit">
              Update Address
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
