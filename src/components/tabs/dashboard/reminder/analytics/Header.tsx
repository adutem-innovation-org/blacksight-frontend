import { ProgressRing } from "@/components/progress";
import { useStore } from "@/hooks";

export const ReminderAnalyticsTabHeader = () => {
  const { getState } = useStore();
  const { analyticsData } = getState("Reminder");

  return (
    <div className="bg-white rounded-sm border-gray-200 py-5 px-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold tracking-tighter text-[#0f0f10] mb-2">
          Reminder System Analytics
        </h1>
        <div className="flex flex-col sm:flex-row space-x-6 text-sm text-gray-600">
          <span>
            Success Rate:{" "}
            <strong className="text-green-600">
              {analyticsData?.successRate}%
            </strong>
          </span>
          <span>
            Recent Activity:{" "}
            <strong>{analyticsData?.recentActivity.sent}</strong> sent in{" "}
            {analyticsData?.recentActivity.period}
          </span>
        </div>
      </div>

      {/* Progress ring */}
      <div className="hidden sm:block">
        <ProgressRing
          percentage={analyticsData?.successRate ?? 0}
          color="#34D399"
        />
      </div>
    </div>
  );
};
