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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useStore } from "@/hooks";

interface DeleteKnowledgeBaseDialogProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  cancelDeleteOperation: () => void;
  confirmDeleteOperation: () => void;
}

export const DeleteKnowledgeBaseDialog = ({
  isOpen,
  onOpenChange,
  cancelDeleteOperation,
  confirmDeleteOperation,
}: DeleteKnowledgeBaseDialogProps) => {
  const { getState } = useStore();
  const { deletingKnowledgeBase } = getState("KnowledgeBase");

  console.log(deletingKnowledgeBase);
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        {deletingKnowledgeBase && <Loader />}
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            knowledge base and deactivate every bot that are connect to it only.
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
