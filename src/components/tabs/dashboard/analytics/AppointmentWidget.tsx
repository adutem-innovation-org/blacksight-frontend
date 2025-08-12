import { Button } from "@/components/form";
import { AppointmentTable } from "../appointment";
import { useStore } from "@/hooks";
import { EmptyRecordsTemplate } from "@/components/templates";
import notificationIcon from "@/assets/images/schedule.png";
import { changeTab } from "@/store";
import { DashboardTabsEnum, SideBarStateEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const AppointmentWidget = () => {
  const { getState, dispatch } = useStore();
  const { appointments } = getState("Appointment");
  const { sidebarState } = getState("Layout");
  const navigate = useNavigate();

  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  const goToAppointments = () => {
    navigate("/appointments");
  };
  return (
    <div
      className={cn(
        "rounded-sm bg-white col-span-1 xl:col-span-2 flex flex-col",
        {
          "lg:col-span-2": isCollapsed,
        }
      )}
    >
      <div className="border-b p-4 px-6 flex justify-between items-center">
        <h3 className="font-sfpro-medium text-xl">Appointments</h3>
        {appointments && appointments.length > 0 && (
          <Button
            size={"sm"}
            className="rounded-sm bg-brand hover:bg-primary transition-colors duration-500 cursor-pointer h-8"
            onClick={goToAppointments}
          >
            View all
          </Button>
        )}
      </div>

      {!appointments || appointments.length === 0 ? (
        <EmptyRecordsTemplate
          imageSrc={notificationIcon}
          title="No Appointment Available"
          showCta={false}
          description="You currently have no appointment scheduled."
        />
      ) : (
        <AppointmentTable
          hideRefreshButton
          gridContainerClassName={"!grid-rows-[60px_1fr_60px]"}
          asWidget
        />
      )}
    </div>
  );
};
