import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button, FormGroup } from "@/components/form";
import { useStore } from "@/hooks";
import { Loader } from "@/components/progress";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  createAdmin,
  getAdminAnalytics,
  getAdmins,
  resetCreateAdmin,
  resetSuspendUser,
} from "@/store";
import { CreateAdminBody } from "@/interfaces";
import { useFormik } from "formik";
import { createAdminSchema } from "@/schemas";

interface CreateAdminFormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export const CreateAdminForm = ({
  isOpen,
  onOpenChange,
}: CreateAdminFormProps) => {
  const { dispatch, getState } = useStore();
  const {
    creatingAdmin,
    adminCreated,
    createAdminErrorMessage,
    createAdminErrors,
  } = getState("Auth");

  const initialValues: CreateAdminBody = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: createAdminSchema,
    onSubmit: (values) => {
      dispatch(createAdmin(values));
    },
  });

  useEffect(() => {
    if (adminCreated) {
      toast.success("Admin created");
      // Reset create admin state
      dispatch(resetCreateAdmin());
      // Reset form
      validation.resetForm();
      // Close dialog
      onOpenChange(false);
      // Fetch latest user analytics
      dispatch(getAdminAnalytics());
      // Fetch admin data again
      dispatch(getAdmins());
    }
  }, [adminCreated]);

  useEffect(() => {
    if (createAdminErrorMessage) {
      toast.error(createAdminErrorMessage);
      if (createAdminErrors) {
        validation.setErrors(createAdminErrors);
      }
      dispatch(resetCreateAdmin());
    }
  }, [createAdminErrorMessage]);

  const handleOpenChange = (value: boolean) => {
    validation.resetForm();
    onOpenChange(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {creatingAdmin && <Loader />}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <DialogHeader>
            <DialogTitle>Create new admin</DialogTitle>
            <DialogDescription>
              Employed a new staff? Give them administative access by setting up
              an account for them.
            </DialogDescription>
          </DialogHeader>

          <FormGroup
            type="text"
            groupLabel="First name"
            placeholder="Enter admin first name"
            size="lg"
            name="firstName"
            validation={validation}
            containerClassName="gap-2 mt-4"
          />
          <FormGroup
            type="text"
            groupLabel="Last name"
            placeholder="Enter admin last name"
            size="lg"
            name="lastName"
            validation={validation}
            containerClassName="gap-2 mt-4"
          />
          <FormGroup
            type="text"
            groupLabel="Email"
            placeholder="Enter admin email"
            size="lg"
            name="email"
            validation={validation}
            containerClassName="gap-2 mt-4"
          />
          <FormGroup
            type="password"
            groupLabel="Password"
            placeholder="Enter admin password"
            size="lg"
            name="password"
            validation={validation}
            containerClassName="gap-2 mt-4"
          />

          <DialogFooter>
            <Button
              className="w-full cursor-pointer mt-10"
              type="submit"
              disabled={creatingAdmin}
            >
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
