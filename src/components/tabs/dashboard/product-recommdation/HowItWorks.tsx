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
      {/* <h2 className="text-3xl font-semibold">How it works</h2>
      <p>
        Our product recommendation engine is powered by a combination of machine
        learning and natural language processing to provide personalized product
        suggestions based on your preferences and purchase history.
      </p> */}
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
            // initial={{ scale: 0 }}
            // animate={{ scale: 1 }}
            // transition={{
            //   type: "spring",
            //   stiffness: 260,
            //   damping: 20,
            //   duration: 0.3,
            // }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2.5 justify-start text-left"
          >
            <h1 className="text-2xl font-semibold tracking-tighter text-[#0f0f10] flex items-center gap-2 justify-center">
              How it works
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                <i className="fi fi-sr-settings flex"></i>
              </span>
            </h1>
            <p className="text-sm leading-relaxed tracking-tight text-muted-foreground">
              Our recommendation engine helps you suggest the right{" "}
              <span className="font-medium text-foreground">
                products, pricing plans,
              </span>{" "}
              and{" "}
              <span className="font-medium text-foreground">
                subscription models
              </span>{" "}
              to users automatically or when they request it — all based on your
              uploaded product data.
            </p>
            <ul className="list-decimal list-inside text-sm leading-relaxed space-y-1 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  Add a product source
                </span>{" "}
                by choosing from multiple input methods.
              </li>
              <li>
                Upload a file{" "}
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  recommend.xlsx
                </span>
              </li>
              <li>Or enter product details directly via text.</li>
              <li>
                Ensure your file includes key product details like:{" "}
                <span className="font-semibold text-foreground">
                  name, description, and price.
                </span>
              </li>
              <li>
                Head to the{" "}
                <span className="font-medium text-foreground">Agent tab</span>{" "}
                and set your source as the{" "}
                <span className="font-medium text-foreground">
                  recommendation source
                </span>
                .
              </li>
              <li>
                That’s it — the bot is now ready to suggest products
                intelligently!
              </li>
            </ul>
          </motion.div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
