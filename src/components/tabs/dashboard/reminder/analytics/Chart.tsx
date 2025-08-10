import { SideBarStateEnum } from "@/enums";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

export const ReminderAnalyticsChart = () => {
  const { getState } = useStore();
  const { analyticsData } = getState("Reminder");
  const { sidebarState } = getState("Layout");

  const { typeDistributionChart, overviewChart, channelChart, statusChart } =
    useMemo(() => {
      return {
        // Chart configurations
        typeDistributionChart: {
          series: Object.values(analyticsData?.byType ?? {}).filter(
            (val) => val > 0
          ),
          options: {
            chart: {
              type: "donut",
              height: 350,
            },
            labels: Object.keys(analyticsData?.byType ?? {}).filter(
              (key) => ((analyticsData?.byType ?? {}) as any)[key] > 0
            ),
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#3F51B5",
            ],
            legend: {
              position: "bottom",
            },
            title: {
              text: "Reminders by Type",
              align: "left",
              style: {
                fontSize: "18px",
                fontWeight: "bold",
              },
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "60%",
                  labels: {
                    show: true,
                    total: {
                      show: true,
                      label: "Total",
                      formatter: () => analyticsData?.total.toString(),
                    },
                  },
                },
              },
            },
          },
        },
        channelChart: {
          series: [
            {
              name: "Notifications",
              data: Object.values(analyticsData?.byChannel ?? {}),
            },
          ],
          options: {
            chart: {
              type: "bar",
              height: 300,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "50%",
                colors: {
                  ranges: [
                    {
                      from: 0,
                      to: 20,
                      color: "#00E396",
                    },
                  ],
                },
              },
            },
            dataLabels: {
              enabled: true,
            },
            xaxis: {
              categories: Object.keys(analyticsData?.byChannel ?? {}).map(
                (key) => key.toUpperCase()
              ),
            },
            title: {
              text: "Distribution by Channel",
              align: "left",
              style: {
                fontSize: "18px",
                fontWeight: "bold",
              },
            },
            colors: ["#008FFB"],
          },
        },
        statusChart: {
          series: Object.values(analyticsData?.byStatus ?? {}).filter(
            (val) => val > 0
          ),
          options: {
            chart: {
              type: "pie",
              height: 350,
            },
            labels: Object.keys(analyticsData?.byStatus ?? {})
              .filter(
                (key) => ((analyticsData?.byStatus ?? {}) as any)[key] > 0
              )
              .map((key) =>
                key === "null"
                  ? "Unknown"
                  : key.charAt(0).toUpperCase() + key.slice(1)
              ),
            colors: ["#00E396", "#FEB019", "#FF4560"],
            legend: {
              position: "bottom",
            },
            title: {
              text: "Status Distribution",
              align: "left",
              style: {
                fontSize: "18px",
                fontWeight: "bold",
              },
            },
          },
        },
        overviewChart: {
          series: [
            {
              name: "Count",
              data: [
                analyticsData?.total ?? 0,
                analyticsData?.active ?? 0,
                analyticsData?.completed ?? 0,
                analyticsData?.failed ?? 0,
              ],
            },
          ],
          options: {
            chart: {
              type: "bar",
              height: 300,
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: "top",
                },
              },
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: "12px",
                colors: ["#fff"],
              },
            },
            xaxis: {
              categories: ["Total", "Active", "Completed", "Failed"],
            },
            title: {
              text: "System Overview",
              align: "left",
              style: {
                fontSize: "18px",
                fontWeight: "bold",
              },
            },
            colors: ["#775DD0"],
          },
        },
      };
    }, [analyticsData]);

  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 auto-rows-[400px]">
      {/* System Overview */}
      <div
        className={cn("bg-white rounded-sm p-6 lg:col-span-3 xl:col-span-4", {
          "lg:col-span-4": isCollapsed,
        })}
      >
        <ReactApexChart
          options={overviewChart.options as any}
          series={overviewChart.series}
          type="bar"
          height={"100%"}
        />
      </div>

      {/* Type Distribution */}
      <div
        className={cn("bg-white rounded-sm p-6 lg:col-span-3 xl:col-span-2", {
          "lg:col-span-2": isCollapsed,
        })}
      >
        <ReactApexChart
          options={typeDistributionChart.options as any}
          series={typeDistributionChart.series}
          type="donut"
          height={"100%"}
        />
      </div>

      {/* Status Distribution */}
      <div
        className={cn("bg-white rounded-sm p-6 lg:col-span-3 xl:col-span-2", {
          "lg:col-span-2": isCollapsed,
        })}
      >
        <ReactApexChart
          options={statusChart.options as any}
          series={statusChart.series}
          type="pie"
          height={"100%"}
        />
      </div>

      {/* Channel Distribution */}
      <div
        className={cn("bg-white rounded-sm p-6 lg:col-span-3 xl:col-span-4", {
          "lg:col-span-4": isCollapsed,
        })}
      >
        <ReactApexChart
          options={channelChart.options as any}
          series={channelChart.series}
          type="bar"
          height={"100%"}
        />
      </div>
    </div>
  );
};
