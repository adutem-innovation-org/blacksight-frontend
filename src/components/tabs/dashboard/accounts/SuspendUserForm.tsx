import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button, FormGroup, FormikValidation } from "@/components/form";
import { useStore } from "@/hooks";
import { Loader } from "@/components/progress";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getAdminUserAnalytics, resetSuspendUser } from "@/store";

interface SuspendUserFormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  validation: any;
}

export const SuspendUserForm = ({
  isOpen,
  onOpenChange,
  validation,
}: SuspendUserFormProps) => {
  const { dispatch, getState } = useStore();
  const {
    suspendingUser,
    userSuspended,
    suspendUserErrors,
    suspendUserErrorMessage,
  } = getState("Auth");

  useEffect(() => {
    if (userSuspended) {
      toast.success("User account suspended");
      // Reset suspend user state
      dispatch(resetSuspendUser());
      // Reset form
      validation.resetForm();
      // Close dialog
      onOpenChange(false);
      // Fetch lateset user analytics
      dispatch(getAdminUserAnalytics());
    }
  }, [userSuspended]);

  useEffect(() => {
    if (suspendUserErrorMessage) {
      toast.error(suspendUserErrorMessage);
      if (suspendUserErrors) {
        validation.setErrors(suspendUserErrors);
      }
      dispatch(resetSuspendUser());
    }
  }, [suspendUserErrorMessage]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {suspendingUser && <Loader />}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription>
              Please specify the reason why this user is being suspended. This
              will help us to communicate the right reason to them when next
              they want to access the platform.
            </DialogDescription>
          </DialogHeader>
          <FormGroup
            type="textarea"
            groupLabel="Reason"
            placeholder="Why is this user being suspended?"
            size="sm"
            name="reason"
            validation={validation}
            containerClassName="gap-2 mt-4"
          />

          <DialogFooter>
            <Button
              className="w-full cursor-pointer mt-4"
              type="submit"
              disabled={suspendingUser}
            >
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
