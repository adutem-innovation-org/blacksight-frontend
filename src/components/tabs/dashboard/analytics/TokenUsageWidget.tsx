import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks";
import ReactApexChart from "react-apexcharts";
import { CustomDropdownItem } from "@/components/popups";
import { UserAnalytics } from "@/interfaces";

type TokenUsage = {
  botName: string;
  categories: string[]; // e.g. ["Query", "Response"]
  series: number[]; // e.g. [43.2, 56.8]
};

type Props = {
  data: TokenUsage[];
};

const TokenUsageChart = ({ data }: Props) => {
  const { getState } = useStore();
  const { sidebarState } = getState("Layout");

  useEffect(() => {
    let tmo = setTimeout(() => window.dispatchEvent(new Event("resize")), 0);
    return () => clearTimeout(tmo);
  }, [sidebarState]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = data[selectedIndex];
  const clonedSeries = JSON.parse(JSON.stringify(selected.series));

  return (
    // <div className="border rounded-2xl p-4 shadow bg-white dark:bg-gray-950 space-y-4">
    //</div>
    <React.Fragment>
      <div className="flex justify-between items-center">
        <p className="text-2xl text-[#0090FF] font-semibold font-urbanist">
          Token Usage
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{selected.botName}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {data.map((bot, i) => (
              <CustomDropdownItem
                key={bot.botName}
                placeholder={bot.botName}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1">
        <ReactApexChart
          key={selected.botName}
          type="pie"
          height={"100%"}
          width={"100%"}
          series={clonedSeries}
          options={{
            chart: {
              type: "pie",
              height: "100%",
              foreColor: "#999",
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
            colors: ["#10B981", "#3B82F6"], // Tailwind: emerald & blue
            stroke: {
              curve: "smooth",
              width: 3,
            },
            dataLabels: {
              enabled: false,
            },
            series: clonedSeries,
            labels: selected.categories,
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
            grid: {
              padding: {
                left: -5,
                right: 5,
              },
            },
            tooltip: {
              y: {
                formatter: (val: number) => `${val.toFixed(1)}%`,
              },
            },
            legend: {
              position: "bottom",
              horizontalAlign: "center",
            },
            fill: {
              type: "solid",
              opacity: 0.7,
            },
          }}
        />
      </div>
    </React.Fragment>
  );
};

type TokenUsageWidgetProps = {
  analytics: UserAnalytics;
};

export const TokenUsageWidget = ({ analytics }: TokenUsageWidgetProps) => {
  return (
    <>
      {analytics && analytics.tokenUsage.length > 0 ? (
        <TokenUsageChart data={analytics.tokenUsage} />
      ) : (
        <div className="w-full h-full font-urbanist font-semibold text-gray-900 italics flex flex-col">
          <p className="text-2xl text-[#0090FF] font-semibold font-urbanist">
            Token Usage
          </p>
          <div className="flex-1 flex justify-center items-center text-center italic">
            No data available
          </div>
        </div>
      )}
    </>
  );
};
