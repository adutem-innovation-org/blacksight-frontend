import { Button } from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const HowItWorks = () => {
  const [openModal, setOpenModal] = useState(false);

  const openHowItWorks = () => {
    setOpenModal(true);
  };

  return (
    <div className="flex justify-start mt-1">
      <Button
        className="font-dmsans tracking-tight rounded-lg !text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        type="button"
        size={"sm"}
        onClick={openHowItWorks}
      >
        How it works?
        <HelpCircle />
      </Button>

      <HowItWorksDialog isOpen={openModal} onOpenChange={setOpenModal} />
    </div>
  );
};

const HowItWorksDialog = ({
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
              How it works
              <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                <i className="fi fi-sr-credit-card flex"></i>
              </span>
            </h1>
            <p className="text-sm leading-relaxed tracking-tight text-muted-foreground">
              The payment tracker automates your billing follow-ups by sending{" "}
              <span className="font-medium text-foreground">
                email and SMS reminders
              </span>{" "}
              to customers — before due dates, on due dates, or any time you
              configure. It also handles{" "}
              <span className="font-medium text-foreground">
                automatic calculation of the next payment period
              </span>{" "}
              — no manual effort needed.
            </p>
            <ul className="list-decimal list-inside text-sm leading-relaxed space-y-1 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  Upload your customer records
                </span>{" "}
                via{" "}
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  .xlsx
                </span>{" "}
                or{" "}
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  .csv
                </span>{" "}
                file.
              </li>
              <li>
                Make sure your file includes:
                <span className="font-semibold text-foreground">
                  {" "}
                  name, email, lastPayment,
                </span>{" "}
                and{" "}
                <span className="font-semibold text-foreground">
                  paymentInterval
                </span>
                .
              </li>
              <li>
                Customize your reminder preferences (before due, on due date, or
                custom).
              </li>
              <li>
                The system automatically sends reminders and calculates the{" "}
                <span className="font-medium text-foreground">
                  next payment period
                </span>{" "}
                — so you don't have to.
              </li>
            </ul>
          </motion.div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
