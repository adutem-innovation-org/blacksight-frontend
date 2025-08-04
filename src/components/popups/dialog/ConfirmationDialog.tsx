import { Loader } from "@/components/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmationDialog {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  cancelOperation: () => void;
  confirmOperation: () => void;
  loading: boolean;
  title?: string;
  description?: string;
  cancelCtaText?: string;
  confirmCtaText?: string;
}

export const ConfirmationDialog = ({
  isOpen,
  onOpenChange,
  cancelOperation,
  confirmOperation,
  loading,
  title,
  description,
  cancelCtaText = "Cancel",
  confirmCtaText = "Continue",
}: ConfirmationDialog) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogOverlay className="fixed inset bg-black/10 backdrop-blur-[2px]" />
      <AlertDialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-4xl backdrop-blur-md"
      >
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
            className="cursor-pointer rounded-lg"
          >
            {cancelCtaText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              confirmOperation();
            }}
            className="cursor-pointer bg-brand hover:bg-brand/70 rounded-lg"
          >
            {confirmCtaText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
