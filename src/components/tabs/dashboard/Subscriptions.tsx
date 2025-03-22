import { DashboardTableLayoutDiv } from "@/components/design";
import { SubscriptionDetailsDrawer } from "@/components/popups";
import { Loader } from "@/components/progress";
import { SubscriptionTable } from "@/components/tables";
import { Subscription } from "@/interfaces";
import { useEffect, useState } from "react";

import analyticsData from "@/data/transaction-widgets.json";
import { AnalyticsCard } from "@/components/cards";

const analytics = analyticsData;

export const SubscriptionsTab = () => {
  const [isSubscriptionDetailsDrawerOpen, setIsSubscriptionDetailsDrawerOpen] =
    useState(() => false);
  const [subscriptionDetails, setSubscriptionDetails] =
    useState<Subscription | null>(null);
  const [loading, setLoading] = useState(() => true);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      setSubscriptionDetails(null);
    }
    setIsSubscriptionDetailsDrawerOpen(value);
  };

  const viewSubscriptionDetails = (data: Subscription) => {
    setSubscriptionDetails(data);
    setIsSubscriptionDetailsDrawerOpen(true);
  };

  useEffect(() => {
    let loadingTmo = setTimeout(() => {
      setLoading(false);
      clearTimeout(loadingTmo);
    }, 150);
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="w-full h-full elative pt-24 sm:pt-4 p-4 md:p-6 flex flex-col relative">
      <DashboardTableLayoutDiv className="no-scrollbar">
        <div
          className={`grid grid-cols-1 ${
            "custom-grid-md-" + analytics.length
          } gap-6 md:gap-5`}
        >
          {analytics.map((data) => (
            <AnalyticsCard {...data} />
          ))}
        </div>

        <SubscriptionTable viewSubscriptionDetails={viewSubscriptionDetails} />

        <SubscriptionDetailsDrawer
          isOpen={isSubscriptionDetailsDrawerOpen}
          onOpenChange={onOpenChange}
          subscriptionDetails={subscriptionDetails!}
        />
      </DashboardTableLayoutDiv>
    </div>
  );
};
