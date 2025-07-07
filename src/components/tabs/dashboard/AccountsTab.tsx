import { DashboardContent } from "@/components/design";
import { Loader } from "@/components/progress";
import { useStore } from "@/hooks";
import { getAdminUserAnalytics, getUsers } from "@/store";
import { useEffect } from "react";
import userAnalyticsData from "@/data/admin-user.anlytics.json";
import { AnalyticsCard } from "@/components/cards";
import { EmptyRecordsTemplate } from "@/components/templates";
import { UsersTable } from "./accounts";
import { PaginatedUserData } from "@/interfaces";

const Header = () => {
  const { getState } = useStore();

  const {
    fetchingUserAnalytics,
    fetchUserAnalyticsErrorMessage,
    userAnalytics,
  } = getState("Auth");

  return (
    <header className="flex items-center justify-between">
      {fetchUserAnalyticsErrorMessage ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          An error occured. Please try again.
        </div>
      ) : fetchingUserAnalytics ? (
        <div className="relative h-30 flex-1">
          <Loader />
        </div>
      ) : !userAnalytics ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          No data available at the moment
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5 flex-1">
          {userAnalyticsData.map(({ id, ...data }) => {
            let percentage;
            let count = userAnalytics![id];
            let totalCount = userAnalytics!["totalUsers"];
            if (id !== "totalUsers")
              percentage = Math.round((count / (totalCount || 1)) * 100);
            return (
              <AnalyticsCard
                {...data}
                count={userAnalytics![id]}
                percentage={percentage}
              />
            );
          })}
        </div>
      )}
    </header>
  );
};

export const UsersTab = () => {
  const { getState, dispatch } = useStore();
  const { users, fetchingAllUsers, userAnalytics, fetchingUserAnalytics } =
    getState("Auth");

  const viewUser = (data: PaginatedUserData) => {};

  useEffect(() => {
    if (!userAnalytics && !fetchingUserAnalytics) {
      dispatch(getAdminUserAnalytics());
    }

    if (!users && !fetchingAllUsers) {
      dispatch(getUsers());
    }
  }, []);

  if (fetchingAllUsers) return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <Header />

        {!users || users.length === 0 ? (
          <EmptyRecordsTemplate
            title="No user record."
            showCta={false}
            description="Looks like users are yet to onboard on this platform."
          />
        ) : (
          <UsersTable viewUser={viewUser} />
        )}
      </div>
    </DashboardContent>
  );
};
