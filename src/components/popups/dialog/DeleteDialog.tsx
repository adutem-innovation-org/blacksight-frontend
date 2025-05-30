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

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  cancelDeleteOperation: () => void;
  confirmDeleteOperation: () => void;
  loading: boolean;
  title?: string;
  description?: string;
}

export const DeleteDialog = ({
  isOpen,
  onOpenChange,
  cancelDeleteOperation,
  confirmDeleteOperation,
  loading,
  title,
  description,
}: DeleteDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        {loading && <Loader />}
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ||
              "This action cannot be undone. This will permanently delete this resource and it's associated data"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.preventDefault();
              cancelDeleteOperation();
            }}
            className="cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-destructive hover:bg-destructive/70"
            onClick={(e) => {
              e.preventDefault();
              confirmDeleteOperation();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
