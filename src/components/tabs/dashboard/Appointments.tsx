import { AnalyticsCard } from "@/components/cards";
import { DashboardContent } from "@/components/design";
import { Loader } from "@/components/progress";
import appointmentAnalyticsData from "@/data/appointment.analytics.json";
import { Appointment } from "@/interfaces";
import { useEffect, useState } from "react";
import { useStore } from "@/hooks";
import {
  deleteAppointment,
  getAllAppointments,
  getAppointmentAnalytics,
  resetDeleteAppointment,
  resetGetAppointmentAnalytics,
  resetUpdateAppointmentStatus,
  updateAppointmentStatus,
} from "@/store";
import { EmptyRecordsTemplate } from "@/components/templates";
import notificationIcon from "@/assets/images/schedule.png";
import { AppointmentTable, CancelAppointmentForm } from "./appointment";
import { resetDocumentElement } from "@/helpers";
import toast from "react-hot-toast";
import { ConfirmationDialog } from "@/components/popups";
import { AppointmentStatus } from "@/enums";

const Header = () => {
  const { getState } = useStore();
  const {
    fetchingAppointmentAnalytics,
    appointmentAnalytics,
    fetchAppointmentAnalyticsError,
  } = getState("Appointment");

  if (!appointmentAnalytics && !fetchingAppointmentAnalytics) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        No data available at the moment
      </div>
    );
  }

  if (fetchAppointmentAnalyticsError) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        An error occured. Please try again.
      </div>
    );
  }

  return (
    <header className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-5">
      {appointmentAnalyticsData.map(({ id, ...data }) => {
        let percentage;
        let count = appointmentAnalytics![id];
        let totalCount = appointmentAnalytics!["totalAppointments"];
        if (id !== "totalAppointments")
          percentage = Math.round((count / (totalCount || 1)) * 100);
        return (
          <AnalyticsCard
            {...data}
            count={appointmentAnalytics![id]}
            percentage={percentage}
          />
        );
      })}
    </header>
  );
};

export const AppointmentsTab = () => {
  const { dispatch, getState } = useStore();
  const { fetchingAllAppointments, appointments } = getState("Appointment");
  const {
    fetchingAppointmentAnalytics,
    appointmentAnalyticsFetched,
    appointmentAnalytics,

    // Update status
    appointmentStatusUpdated,
    updateAppointmentStatusErrorMsg,

    // Delete appointment
    deletingAppointment,
    appointmentDeleted,
    deleteAppointmentError,
  } = getState("Appointment");

  // Appointment to send reminder to
  const [appointmentToRemind, setAppointmentToRemind] =
    useState<Appointment | null>(null);
  const [instantReminderFormOpen, setInstantReminderFormOpen] = useState(false);
  const [scheduleReminderFormOpen, setScheduleReminderFormOpen] =
    useState(false);

  /** =======================
   * Reminder
   * ===========================
   */
  const openScheduleReminderForm = (appointment: Appointment) => {
    setAppointmentToRemind(appointment);
    setScheduleReminderFormOpen(true);
  };

  const closeScheduleReminderForm = (val: boolean) => {
    setScheduleReminderFormOpen(val);
    setAppointmentToRemind(null);
    resetDocumentElement();
  };

  const openInstantReminderForm = (appointment: Appointment) => {
    setAppointmentToRemind(appointment);
    setInstantReminderFormOpen(true);
  };

  const closeInstantReminderForm = (val: boolean) => {
    setInstantReminderFormOpen(val);
    setAppointmentToRemind(null);
    resetDocumentElement();
  };

  /**
   * ======================
   * REMINDER
   * ==================
   */

  /**
   * ========================
   * UPDATE STATUS
   * ======================
   */
  const [newStatus, setNewStatus] = useState<AppointmentStatus | null>(null);
  const [appointmentToUpdate, setAppointmentToUpdate] =
    useState<Appointment | null>();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const openUpdateDialog = () => setUpdateDialogOpen(true);
  const closeUpdateDialog = () => setUpdateDialogOpen(false);

  const triggerUpdateStatus = (
    appointment: Appointment,
    status: AppointmentStatus
  ) => {
    setAppointmentToUpdate(appointment);
    setNewStatus(status);
    openUpdateDialog();
  };

  const endUpdateOperation = () => {
    closeUpdateDialog();
    setAppointmentToUpdate(null);
    setNewStatus(null);
    resetDocumentElement();
  };

  const confirmUpdateOperation = () => {
    if (appointmentToUpdate && newStatus) {
      dispatch(
        updateAppointmentStatus({
          id: appointmentToUpdate._id,
          data: {
            status: newStatus,
          },
        })
      );
    }
  };

  // Update ticket status
  useEffect(() => {
    if (appointmentStatusUpdated) {
      toast.success("Updated");
      // Get latest analytics
      dispatch(getAppointmentAnalytics());
      dispatch(resetUpdateAppointmentStatus());
      // Close dialog, reset states and restore pointer event to document element
      endUpdateOperation();
    }
  }, [appointmentStatusUpdated]);

  useEffect(() => {
    if (updateAppointmentStatusErrorMsg) {
      toast.error(updateAppointmentStatusErrorMsg);
      // Reset states
      dispatch(resetUpdateAppointmentStatus());
    }
  }, [updateAppointmentStatusErrorMsg]);
  /**
   * ========================
   * UPDATE STATUS ENDS
   * ======================
   */

  /**
   * ==================
   * DELETE APPOINTMENT
   * ======================
   */
  // Delete appointment
  const [deleteModalOpen, setDeleteModalOpen] = useState(() => false);
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<Appointment | null>(null);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // Delete events
  const triggerDeleteAppointment = (data: Appointment) => {
    setAppointmentToDelete(data);
    openDeleteModal();
  };

  const endDeleteOperation = () => {
    closeDeleteModal();
    setAppointmentToDelete(null);
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

  const confirmDeleteOperation = () => {
    if (appointmentToDelete) {
      dispatch(deleteAppointment(appointmentToDelete._id));
    }
  };

  useEffect(() => {
    if (appointmentDeleted) {
      toast.success("Deleted.");
      // Reset store state
      dispatch(resetDeleteAppointment());
      // Close model, reset states and add pointer event to document element
      endDeleteOperation();
    }
  }, [appointmentDeleted]);

  useEffect(() => {
    if (deleteAppointmentError) {
      toast.error(deleteAppointmentError);
      dispatch(resetDeleteAppointment());
    }
  }, [deleteAppointmentError]);
  /**
   * ==========================
   * DELETE APPOINTMENT END
   * ============================
   */

  useEffect(() => {
    if (!appointmentAnalytics && !fetchingAppointmentAnalytics) {
      dispatch(getAppointmentAnalytics());
    }
  }, []);

  // Get appointments
  useEffect(() => {
    if (!appointments && !fetchingAllAppointments) {
      dispatch(getAllAppointments());
    }
  }, []);

  useEffect(() => {
    if (appointmentAnalyticsFetched) {
      dispatch(resetGetAppointmentAnalytics());
    }
  }, [appointmentAnalyticsFetched]);

  if (fetchingAppointmentAnalytics || fetchingAllAppointments)
    return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <Header />

        {!appointments || appointments.length === 0 ? (
          <EmptyRecordsTemplate
            imageSrc={notificationIcon}
            title="No Appointment Available"
            showCta={false}
            description="You currently have no appointment scheduled."
          />
        ) : (
          <AppointmentTable
            triggerUpdateStatus={triggerUpdateStatus}
            triggerDeleteAppointment={triggerDeleteAppointment}
            openInstantReminderForm={openInstantReminderForm}
            openScheduleReminderForm={openScheduleReminderForm}
          />
        )}

        <ConfirmationDialog
          isOpen={deleteModalOpen}
          onOpenChange={endDeleteOperation}
          cancelOperation={endDeleteOperation}
          confirmOperation={confirmDeleteOperation}
          loading={deletingAppointment}
          title="Delete Appointment"
          description="This action cannot be undone. Are you sure you want to delete this appointment?"
          cancelCtaText="Cancel"
          confirmCtaText="Delete"
        />

        <CancelAppointmentForm
          newStatus={newStatus}
          isOpen={updateDialogOpen}
          appointmentId={appointmentToUpdate?._id}
          onOpenChange={endUpdateOperation}
        />
        {/* 
        <InstantAppointmentReminderForm
          isOpen={instantReminderFormOpen}
          onOpenChange={closeInstantReminderForm}
        />

        <ScheduleAppointmentReminderForm
          isOpen={scheduleReminderFormOpen}
          onOpenChange={closeScheduleReminderForm}
        /> */}
      </div>
    </DashboardContent>
  );
};
