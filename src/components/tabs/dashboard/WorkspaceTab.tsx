import { DashboardContent } from "@/components/design";
import { Loader } from "@/components/progress";
import { useStore } from "@/hooks";
import { getAdminAnalytics, getAdmins } from "@/store";
import { useEffect, useState } from "react";
import adminAnalyticsData from "@/data/admin-auth.analytics.json";
import { AnalyticsCard } from "@/components/cards";
import { EmptyRecordsTemplate } from "@/components/templates";
import { PaginatedUserData } from "@/interfaces";
import { AdminsTable, CreateAdminForm } from "./workspace";

const Header = () => {
  const { getState } = useStore();

  const {
    fetchingAdminAnalytics,
    fetchAdminAnalyticsErrorMessage,
    adminAnalytics,
  } = getState("Auth");

  return (
    <header className="flex items-center justify-between">
      {fetchAdminAnalyticsErrorMessage ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          An error occured. Please try again.
        </div>
      ) : fetchingAdminAnalytics ? (
        <div className="relative h-30 flex-1">
          <Loader />
        </div>
      ) : !adminAnalytics ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          No data available at the moment
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5 flex-1">
          {adminAnalyticsData.map(({ id, ...data }) => {
            let percentage;
            let count = adminAnalytics![id];
            let totalCount = adminAnalytics!["totalAdmins"];
            if (id !== "totalAdmins")
              percentage = Math.round((count / (totalCount || 1)) * 100);
            return (
              <AnalyticsCard
                {...data}
                count={adminAnalytics![id]}
                percentage={percentage}
              />
            );
          })}
        </div>
      )}
    </header>
  );
};

export const WorkspaceTab = () => {
  const { getState, dispatch } = useStore();
  const { admins, fetchingAllAdmins, adminAnalytics, fetchingAdminAnalytics } =
    getState("Auth");

  // Create knowledge base
  const [createFormOpen, setCreateFormOpen] = useState(() => false);
  const openCreateForm = () => setCreateFormOpen(true);

  const viewUser = (data: PaginatedUserData) => {};

  useEffect(() => {
    if (!adminAnalytics && !fetchingAdminAnalytics) {
      dispatch(getAdminAnalytics());
    }

    if (!admins && !fetchingAllAdmins) {
      dispatch(getAdmins());
    }
  }, []);

  if (fetchingAllAdmins) return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <Header />

        {!admins || admins.length === 0 ? (
          <EmptyRecordsTemplate
            title="No admin record."
            showCta={false}
            description="Looks like you are yet to create an admin."
          />
        ) : (
          <AdminsTable viewUser={viewUser} createAdmin={openCreateForm} />
        )}

        <CreateAdminForm
          isOpen={createFormOpen}
          onOpenChange={setCreateFormOpen}
        />
      </div>
    </DashboardContent>
  );
};
