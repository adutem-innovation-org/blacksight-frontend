import { useStore } from "@/hooks";
import { useMemo } from "react";

export const Insights = () => {
  const { getState } = useStore();
  const { analyticsData } = getState("Reminder");

  const channelPreference = useMemo(() => {
    const byChannel = analyticsData?.byChannel;

    if (!byChannel || typeof byChannel !== "object") {
      return { name: "Unknown", percentage: 0 };
    }

    const channels = Object.entries(byChannel).filter(
      ([, value]) => typeof value === "number" && value > 0
    );

    if (channels.length === 0) {
      return { name: "Unknown", percentage: 0 };
    }

    // Find channel with highest value
    const [topChannelName, topChannelValue] = channels.reduce((max, current) =>
      current[1] > max[1] ? current : max
    );

    // Calculate total
    const total = channels.reduce((sum, [, value]) => sum + value, 0);

    return {
      name: topChannelName,
      percentage: total > 0 ? (topChannelValue / total) * 100 : 0,
    };
  }, [analyticsData?.byChannel]);

  return (
    <div className="bg-white p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Key Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <div className="bg-blue-50 p-4 rounded-lg flex flex-col gap-1">
          <div className="font-semibold text-blue-800">Dominant Type</div>
          <div className="text-blue-600">
            Instant notifications make up {analyticsData?.byType?.instant ?? 0}%
            of all notifications
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg flex flex-col gap-1">
          <div className="font-semibold text-green-800">Channel Preference</div>
          <div className="text-green-600">
            {channelPreference?.name === "Unknown"
              ? "No channel preference"
              : `${channelPreference?.name.toLocaleUpperCase()} is the primary channel (${channelPreference?.percentage.toFixed(
                  2
                )}% of
            notifications)`}
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg flex flex-col gap-1">
          <div className="font-semibold text-purple-800">System Health</div>
          <div className="text-purple-600">
            Perfect success rate with {analyticsData?.failed} failures
          </div>
        </div>
      </div>
    </div>
  );
};
