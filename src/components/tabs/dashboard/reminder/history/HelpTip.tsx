import { Button } from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
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
              Managing Your Reminders
              <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                <i className="fi fi-sr-alarm-clock flex"></i>
              </span>
            </h1>

            <p className="text-sm leading-relaxed tracking-tight text-muted-foreground">
              Keep track of your reminders and perform quick actions directly
              from your reminders table. Here’s how:
            </p>

            <ul className="list-decimal list-inside text-sm leading-relaxed space-y-1 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  View full details
                </span>{" "}
                by clicking on any reminder. This will open the complete
                information for that reminder.
              </li>

              <li>
                <span className="font-medium text-foreground">
                  Manage a reminder
                </span>{" "}
                using the{" "}
                <span className="font-semibold text-foreground">menu icon</span>{" "}
                in its row. You can:
                <ul className="list-disc list-inside pl-5 mt-1">
                  <li>
                    <strong>Update Reminder:</strong> Edit the reminder details
                    such as date, time, or message.
                  </li>
                  <li>
                    <strong>Delete Reminder:</strong> Permanently remove the
                    reminder from your list.
                  </li>
                  <li>
                    <strong>Activate / Deactivate:</strong> Pause a reminder
                    that’s yet to be processed or reactivate it when needed.
                  </li>
                </ul>
              </li>
            </ul>

            <p className="text-sm text-muted-foreground mt-2">
              ✅ Tip: Deactivating a reminder is safer than deleting it if you
              might need it again later.
            </p>
          </motion.div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
