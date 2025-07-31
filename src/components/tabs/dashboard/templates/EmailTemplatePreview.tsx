import { Dialog, DialogContent } from "@/components/ui/dialog";

interface EmailTemplatePreviewProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  preview: string;
}

export const EmailTemplatePreview = ({
  isOpen,
  onOpenChange,
  preview,
}: EmailTemplatePreviewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="h-[85dvh] overflow-y-auto overflow-x-hidden !w-[90dvw] !max-w-[700px] px-2 sm:px-6"
      >
        <div
          className="w-full h-full py-8 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      </DialogContent>
    </Dialog>
  );
};
