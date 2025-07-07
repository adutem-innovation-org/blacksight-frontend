// import responseTimeData from "@/data/response-time.json";
// import {
//   LineChart,
//   ResponsiveContainer,
//   XAxis,
//   CartesianGrid,
//   YAxis,
//   Line,
//   Tooltip,
//   AreaChart,
//   Area,
// } from "recharts";
// import styled from "styled-components";

// export const ResponseTimeChart = () => (
//   <ResponsiveContainer width="100%" height={"100%"} className={"-ml-2 mr-4"}>
//     <AreaChart data={responseTimeData}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis
//         dataKey="day"
//         className="font-urbanist text-sm font-semibold"
//         stroke="#34D399"
//       />
//       <YAxis className="font-urbanist text-sm font-semibold" stroke="#34D399" />
//       <Tooltip />
//       {/* <Legend /> */}
//       <Area
//         type="monotone"
//         dataKey="responseTime"
//         stroke="#34D399"
//         fill="#34D399"
//         className="cursor-pointer stroke-brand"
//       />
//     </AreaChart>
//   </ResponsiveContainer>
// );
import { useStore } from "@/hooks";
import { UserAnalytics } from "@/interfaces";
import { useEffect } from "react";
import Chart from "react-apexcharts";

type ChartData = {
  series: any[];
  categories: any[];
};

const ResponseTimeChart = ({ series, categories }: ChartData) => {
  const clonedSeries = JSON.parse(JSON.stringify(series));
  const { getState } = useStore();
  const { sidebarState } = getState("Layout");

  useEffect(() => {
    let tmo = setTimeout(() => window.dispatchEvent(new Event("resize")), 0);
    return () => clearTimeout(tmo);
  }, [sidebarState]);

  return (
    <Chart
      series={clonedSeries}
      type="area"
      height={"100%"}
      width={"100%"}
      options={{
        chart: {
          type: "area",
          height: "100%",
          foreColor: "#999",
          stacked: true,
          redrawOnParentResize: true,
          redrawOnWindowResize: true,
          dropShadow: {
            enabled: true,
            enabledOnSeries: [0],
            top: -2,
            left: 2,
            blur: 5,
            opacity: 0.06,
          },
        },
        colors: ["#00E396", "#0090FF", "#feb019", "#ff4560", "#775dd0"],
        stroke: {
          curve: "smooth",
          width: 3,
        },
        dataLabels: {
          enabled: false,
        },
        series: clonedSeries,
        markers: {
          size: 0,
          strokeColors: "#fff",
          strokeWidth: 3,
          strokeOpacity: 1,
          fillOpacity: 1,
          hover: {
            size: 6,
          },
        },
        xaxis: {
          type: "category",
          categories,
          labels: {
            rotate: -45,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            offsetX: 14,
            offsetY: -5,
          },
          tooltip: {
            enabled: true,
          },
        },
        grid: {
          padding: {
            left: -5,
            right: 5,
          },
        },
        tooltip: {
          y: {
            formatter: (val: number) => `${val}s`,
          },
          x: {
            format: "dd MMM yyyy",
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
        fill: {
          type: "solid",
          opacity: 0.7,
        },
      }}
    />
  );
};

type ResponseTimeWidgetProps = {
  analytics: UserAnalytics;
};

export const ResponseTimeWidget = ({ analytics }: ResponseTimeWidgetProps) => {
  return (
    <div className="bg-white p-6 flex flex-col gap-4 rounded-sm">
      <div>
        <p className="text-2xl text-[#34D399] font-semibold font-urbanist">
          Response time
        </p>
      </div>
      {/* <div className="h-full rounded-xl flex items-end justify-start pt-5"> */}
      <div className="h-full rounded-xl pt-5">
        {analytics && analytics?.responseTime.series.length > 0 ? (
          <ResponseTimeChart
            series={analytics?.responseTime.series}
            categories={analytics?.responseTime.categories}
          />
        ) : (
          <div className="w-full h-full font-urbanist font-semibold text-gray-900 italics flex justify-center items-center text-center italic">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};
