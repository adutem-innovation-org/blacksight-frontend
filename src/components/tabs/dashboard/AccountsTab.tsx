import { DashboardContent } from "@/components/design";
import { Loader } from "@/components/progress";
import { useStore } from "@/hooks";
import {
  getAdminUserAnalytics,
  getUsers,
  liftUserSuspension,
  resetLiftUserSuspension,
  suspendUser,
} from "@/store";
import { useEffect, useState } from "react";
import userAnalyticsData from "@/data/admin-user.anlytics.json";
import { AnalyticsCard } from "@/components/cards";
import { EmptyRecordsTemplate } from "@/components/templates";
import { SuspendUserForm, UsersTable } from "./accounts";
import { PaginatedUserData } from "@/interfaces";
import { useFormik } from "formik";
import { accountSuspensionSchema } from "@/schemas";
import { resetDocumentElement } from "@/helpers";
import toast from "react-hot-toast";

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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-5 flex-1">
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
  const {
    users,
    fetchingAllUsers,
    userAnalytics,
    fetchingUserAnalytics,
    // Lifting suspension
    liftingUserSuspension,
    userSuspensionLifted,
    liftUserSuspensionErrorMessage,
  } = getState("Auth");

  const viewUser = (data: PaginatedUserData) => {};

  // Suspend user
  const [suspendUserDialogOpen, setSuspendUserDialogOpen] = useState(
    () => false
  );
  const initialValues = {
    userId: "",
    reason: "",
  };

  // Validation
  const validation = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: accountSuspensionSchema,
    onSubmit: (values) => {
      dispatch(
        suspendUser({ userId: values.userId, data: { reason: values.reason } })
      );
    },
  });

  // Suspend user
  const onSuspendUser = (userId: string) => {
    validation.setFieldValue("userId", userId);
    openSuspendUserDialog();
  };

  const openSuspendUserDialog = () => setSuspendUserDialogOpen(true);

  // Lift user suspension
  const onLiftUserSuspension = (userId: string) => {
    dispatch(liftUserSuspension(userId));
  };

  const onSuspendDialogOpenStateChange = (value: boolean) => {
    if (!value) {
      validation.resetForm();
    }
    setSuspendUserDialogOpen(value);
    resetDocumentElement();
  };

  useEffect(() => {
    if (!userAnalytics && !fetchingUserAnalytics) {
      dispatch(getAdminUserAnalytics());
    }

    if (!users && !fetchingAllUsers) {
      dispatch(getUsers());
    }
  }, []);

  // Lift user suspension events
  useEffect(() => {
    if (userSuspensionLifted) {
      toast.success("User suspension lifted");
      // Get lastest user analytics
      dispatch(getAdminUserAnalytics());
      // Reset lift suspension state
      dispatch(resetLiftUserSuspension());
    }
  }, [userSuspensionLifted]);

  useEffect(() => {
    if (liftUserSuspensionErrorMessage) {
      toast.error(liftUserSuspensionErrorMessage);
      dispatch(resetLiftUserSuspension());
    }
  }, [liftUserSuspensionErrorMessage]);

  if (fetchingAllUsers) return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <Header />

        {liftingUserSuspension && <Loader text1="Lifting user suspension" />}

        {!users || users.length === 0 ? (
          <EmptyRecordsTemplate
            title="No user record."
            showCta={false}
            description="Looks like users are yet to onboard on this platform."
          />
        ) : (
          <UsersTable
            viewUser={viewUser}
            liftUserSuspension={onLiftUserSuspension}
            suspendUser={onSuspendUser}
          />
        )}

        <SuspendUserForm
          isOpen={suspendUserDialogOpen}
          onOpenChange={onSuspendDialogOpenStateChange}
          validation={validation}
        />
      </div>
    </DashboardContent>
  );
};
