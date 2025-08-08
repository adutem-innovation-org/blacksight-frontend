import { Button, FormGroup } from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/hooks";
import { updateBCPSchema } from "@/schemas";
import { resetUpdateBCP, updateBCP } from "@/store";
import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader, Spinner } from "@/components/progress";
import { IBCP } from "@/interfaces";
import { PaymentInterval } from "@/enums";

export const UpdateBCPForm = ({
  isOpen,
  onOpenChange,
  bcpToUpdate,
}: {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  bcpToUpdate: IBCP | null;
}) => {
  const { dispatch, getState } = useStore();

  const { updatingBCP, bcpUpdated, updateBCPErrorMsg, updateBCPErrors } =
    getState("PaymentTracker");

  const initialValues = useMemo(
    () => ({
      name: bcpToUpdate?.name ?? "",
      email: bcpToUpdate?.email ?? "",
      phone: bcpToUpdate?.phone ?? "",
      paymentInterval: bcpToUpdate?.paymentInterval,
      lastPayment: bcpToUpdate?.lastPayment,
    }),
    [bcpToUpdate]
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: updateBCPSchema,
    onSubmit: (values) => {
      if (!bcpToUpdate) return;
      dispatch(updateBCP({ data: values, id: bcpToUpdate?._id }));
    },
  });

  useEffect(() => {
    if (bcpUpdated) {
      toast.success("Customer info updated.");
      validation.resetForm();
      dispatch(resetUpdateBCP());
      onOpenChange(false);
    }
  }, [bcpUpdated]);

  useEffect(() => {
    if (updateBCPErrorMsg) {
      toast.error(updateBCPErrorMsg);
      if (Object.keys(updateBCPErrors ?? {}).length !== 0) {
        validation.setErrors(updateBCPErrors);
      }
      dispatch(resetUpdateBCP());
    }
  }, [updateBCPErrorMsg]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset bg-black/40 backdrop-blur-[2px]" />
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-4xl p-0 overflow-hidden max-h-[85dvh] h-max flex flex-col"
      >
        {updatingBCP && <Loader />}

        <DialogHeader className="p-4 min-[420px]:p-8 !pb-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DialogTitle className="text-xl">
              Update customer record
            </DialogTitle>
            <DialogDescription>
              Update your customer info instantly and start sending reminders.
            </DialogDescription>
          </motion.div>
        </DialogHeader>
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
            <div className="px-4 min-[420px]:px-8">
              <FormGroup
                type="text"
                name="name"
                validation={validation}
                size="md"
                groupLabel="Name"
                placeholder="Enter customer name"
                containerClassName="gap-2 mt-4"
              />
              <FormGroup
                type="text"
                name="email"
                validation={validation}
                groupLabel="Email"
                placeholder="Enter customer email"
                containerClassName="gap-2 mt-4"
              />
              <FormGroup
                type="phone"
                name="phone"
                validation={validation}
                groupLabel="Phone"
                placeholder="Enter customer phone number"
                containerClassName="gap-2 mt-4"
              />
              <FormGroup
                type="select"
                name="paymentInterval"
                validation={validation}
                groupLabel="Payment interval"
                placeholder="Select payment interval"
                containerClassName="gap-2 mt-4"
                options={Object.values(PaymentInterval)}
              />
              <FormGroup
                type="date"
                name="lastPayment"
                validation={validation}
                groupLabel="Last payment"
                placeholder="Enter last payment date"
                containerClassName="gap-2 mt-4"
              />
            </div>
          </motion.div>
          <div className="flex gap-4 justify-end border-t border-gray-200 p-4 min-[420px]:p-8 min-h-max">
            <Button
              className="w-full cursor-pointer bg-brand rounded-2xl"
              type="submit"
              disabled={updatingBCP}
            >
              {updatingBCP && <Spinner />}
              {updatingBCP ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
