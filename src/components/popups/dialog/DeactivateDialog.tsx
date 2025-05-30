import { Loader } from "@/components/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeactivateDialogProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  cancelOperation: () => void;
  confirmOperation: () => void;
  loading: boolean;
  title?: string;
  description?: string;
}

export const DeactivateDialog = ({
  isOpen,
  onOpenChange,
  cancelOperation,
  confirmOperation,
  loading,
  title,
  description,
}: DeactivateDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        {loading && <Loader />}
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "Are you sure?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ||
              "This is a risky action. It could cause this service or other services associated to it, not to behave as expected."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.preventDefault();
              cancelOperation();
            }}
            className="cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-brand hover:bg-brand/70"
            onClick={(e) => {
              e.preventDefault();
              confirmOperation();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
