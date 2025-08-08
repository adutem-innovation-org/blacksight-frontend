import { Button } from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "@/components/ui/dialog";
import { HelpCircle, Info } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const HelpfulTip = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex justify-start mt-1">
      <Button
        className="font-dmsans tracking-tight rounded-lg !text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        type="button"
        size={"sm"}
        onClick={() => setOpenModal(true)}
      >
        Helpful Tips!
        <Info />
      </Button>

      <HelpfulTipDialog isOpen={openModal} onOpenChange={setOpenModal} />
    </div>
  );
};

const HelpfulTipDialog = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" />
      <DialogContent className="!w-[90dvw] !max-w-[700px]">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2.5 justify-start text-left"
          >
            <h1 className="text-2xl font-semibold tracking-tighter text-[#0f0f10] flex items-center gap-2 justify-center">
              Managing Your Customers
              <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                <i className="fi fi-sr-users-alt flex"></i>
              </span>
            </h1>

            <p className="text-sm leading-relaxed tracking-tight text-muted-foreground">
              You can easily manage customer records and send reminders directly
              from your uploaded payment file. Here's how:
            </p>

            <ul className="list-decimal list-inside text-sm leading-relaxed space-y-1 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  Update customer details
                </span>{" "}
                using the{" "}
                <span className="font-semibold text-foreground">menu icon</span>{" "}
                on each row. Select <strong>“Update Record.”</strong>
              </li>

              <li>
                <span className="font-medium text-foreground">
                  Remove a customer
                </span>{" "}
                by selecting <strong>“Delete Record”</strong> from the same menu
                icon.
              </li>

              <li>
                <span className="font-medium text-foreground">
                  Send reminders
                </span>{" "}
                instantly or schedule them using{" "}
                <strong>“Create Reminder”</strong> in the menu. You can choose
                between a one-time or recurring reminder.
              </li>

              <li>
                To perform actions on multiple customers:
                <ul className="list-disc list-inside pl-5">
                  <li>
                    <strong>Option 1 (Recommended):</strong> Use checkboxes in
                    the first column to select multiple rows easily.
                  </li>
                  <li>
                    <strong>Option 2:</strong> Double-click a row to enter
                    multi-selection mode.
                  </li>
                </ul>
              </li>
            </ul>

            <p className="text-sm text-muted-foreground mt-2">
              ✅ Tip: The checkbox approach gives clearer visual feedback and is
              more intuitive for bulk actions.
            </p>
          </motion.div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
