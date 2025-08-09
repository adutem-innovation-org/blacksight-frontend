import { Button, FormikValidation } from "@/components/form";
import { InfoBlock } from "@/components/InfoBlock";
import { Loader, Spinner } from "@/components/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { info } from "console";
import { motion } from "framer-motion";
import { LucideProps } from "lucide-react";

interface FormDialogProps extends React.PropsWithChildren {
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
  loading: boolean;
  title: string;
  description: string;
  infoBlock?: any;
  validation: FormikValidation & { handleSubmit: () => void };
  loadingCtaText: string;
  ctaText: string;
  CtaIcon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  ctaDisabled?: boolean;
}

export const FormDialog = ({
  isOpen,
  onOpenChange,
  loading,
  title,
  description,
  infoBlock,
  validation,
  children,
  loadingCtaText,
  ctaText,
  CtaIcon,
  ctaDisabled,
}: FormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset bg-black/40 backdrop-blur-[2px]" />
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          "rounded-4xl p-0 max-h-[85dvh] h-max overflow-y-hidden overflow-x-hidden flex flex-col"
        )}
      >
        {loading && <Loader />}
        <DialogHeader className="p-4 min-[420px]:p-8 !pb-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            {infoBlock && (
              <InfoBlock
                variant={"warning"}
                className="mt-2 cursor-pointer shadow"
              >
                {infoBlock}
              </InfoBlock>
            )}
          </motion.div>
        </DialogHeader>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          className="flex flex-col flex-1 overflow-hidden relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-y-auto flex-1 no-scrollbar relative overflow-hidden pb-8"
          >
            <div className="px-4 min-[420px]:px-8">{children}</div>
          </motion.div>

          {/* Footer   */}
          <div className="flex gap-4 justify-end border-t border-gray-200 p-4 min-[420px]:p-8">
            <Button
              className="w-full cursor-pointer bg-brand rounded-2xl"
              type="submit"
              disabled={loading || ctaDisabled}
            >
              {loading ? (
                <>
                  {loadingCtaText}. <Spinner />
                </>
              ) : (
                <>
                  {ctaText} {CtaIcon && <CtaIcon />}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
