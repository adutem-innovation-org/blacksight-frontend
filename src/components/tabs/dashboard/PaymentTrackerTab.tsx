import { DashboardContent } from "@/components/design";
import React, { useEffect, useState } from "react";
import {
  InstantFileReminderForm,
  PaymentFilesTable,
  PaymentTrackerTabHeader,
  ScheduleFileReminderForm,
  StartTracking,
  UploadPaymentFileForm,
} from "./payment-tracker";
import { useStore } from "@/hooks";
import { Loader } from "@/components/progress";
import {
  deletePaymentFile,
  getAllPaymentFiles,
  getPaymentFileBCPs,
  resetDeletePaymentFile,
} from "@/store";
import { IPaymentFile } from "@/interfaces";
import { resetDocumentElement } from "@/helpers";
import toast from "react-hot-toast";
import { ConfirmationDialog } from "@/components/popups";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const PaymentTrackerTab = () => {
  const [uploadFormOpen, setUploadFormOpen] = React.useState(false);
  const [instantReminderFormOpen, setInstantReminderFormOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<IPaymentFile | null>(null);
  const [scheduleReminderFormOpen, setScheduleReminderFormOpen] =
    useState(false);

  const { dispatch, getState } = useStore();
  const navigate = useNavigate();
  const {
    fetchingPaymentFiles,
    paymentFiles,

    // Delete payment file state
    deletingPaymentFile,
    paymentFileDeleted,
    deletePaymentFileError,
  } = getState("PaymentTracker");

  const openScheduleReminderForm = (data: IPaymentFile) => {
    setCurrentFile(data);
    setScheduleReminderFormOpen(true);
  };

  const closeScheduleReminderForm = (val: boolean) => {
    setScheduleReminderFormOpen(val);
    setCurrentFile(null);
    resetDocumentElement();
  };

  const openUploadForm = () => setUploadFormOpen(true);
  const openInstantReminderForm = (data: IPaymentFile) => {
    setCurrentFile(data);
    setInstantReminderFormOpen(true);
  };

  const closeInstantReminderForm = (val: boolean) => {
    setInstantReminderFormOpen(val);
    setCurrentFile(null);
    resetDocumentElement();
  };

  // Delete payment file
  const [deleteModalOpen, setDeleteModalOpen] = useState(() => false);
  const [paymentFileToDelete, setPaymentFileToDelete] =
    useState<IPaymentFile | null>(null);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // Delete events
  const triggerDeletePaymentFile = (data: IPaymentFile) => {
    setPaymentFileToDelete(data);
    openDeleteModal();
  };

  const endDeleteOperation = () => {
    closeDeleteModal();
    setPaymentFileToDelete(null);
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

  const confirmDeleteOperation = () => {
    if (paymentFileToDelete) {
      dispatch(deletePaymentFile(paymentFileToDelete._id));
    }
  };

  // BCPs
  const openFileBCPs = (data: IPaymentFile) => {
    return navigate(`/tools/payment-tracker/bcps`, {
      state: { paymentFileId: data._id },
    });
  };

  useEffect(() => {
    if (!paymentFiles && !fetchingPaymentFiles) {
      dispatch(getAllPaymentFiles());
    }
  }, []);

  // Delete Products source effects
  useEffect(() => {
    if (paymentFileDeleted) {
      toast.success("File deleted.");
      // Get all payment files
      dispatch(getAllPaymentFiles());
      // Reset store state
      dispatch(resetDeletePaymentFile());
      // Close model, reset states and add pointer event to document element
      endDeleteOperation();
    }
  }, [paymentFileDeleted]);

  useEffect(() => {
    if (deletePaymentFileError) {
      toast.error(deletePaymentFileError);
      dispatch(resetDeletePaymentFile());
    }
  }, [deletePaymentFileError]);

  if (fetchingPaymentFiles) return <Loader />;

  return (
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1 flex flex-col overflow-auto items-center h-full">
          <div
            className={cn(
              "w-full max-w-[1440px] mt-4 md:mt-8 flex flex-col gap-6 flex-1"
            )}
          >
            <PaymentTrackerTabHeader />
            {paymentFiles && paymentFiles.length === 0 && (
              <StartTracking startTracking={openUploadForm} />
            )}
            {paymentFiles && paymentFiles.length > 0 && (
              <PaymentFilesTable
                triggerDeletePaymentFile={triggerDeletePaymentFile}
                openUploadForm={openUploadForm}
                openFileBCPs={openFileBCPs}
                openInstantReminderForm={openInstantReminderForm}
                openScheduleReminderForm={openScheduleReminderForm}
              />
            )}
          </div>

          <UploadPaymentFileForm
            isOpen={uploadFormOpen}
            onOpenChange={setUploadFormOpen}
          />

          <InstantFileReminderForm
            isOpen={instantReminderFormOpen}
            onOpenChange={closeInstantReminderForm}
            currentFile={currentFile}
          />

          <ScheduleFileReminderForm
            isOpen={scheduleReminderFormOpen}
            onOpenChange={closeScheduleReminderForm}
            currentFile={currentFile}
          />

          <ConfirmationDialog
            isOpen={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            cancelOperation={endDeleteOperation}
            confirmOperation={confirmDeleteOperation}
            loading={deletingPaymentFile}
            confirmCtaText="Delete"
            description="This action cannot be undone. This will permanently delete your customer records, and stop all associated reminders."
          />
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
