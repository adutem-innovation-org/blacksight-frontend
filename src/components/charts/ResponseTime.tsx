import responseTimeData from "@/data/response-time.json";
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  CartesianGrid,
  YAxis,
  Line,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import styled from "styled-components";

export const ResponseTimeChart = () => (
  <ResponsiveContainer width="100%" height={"100%"} className={"-ml-2 mr-4"}>
    <AreaChart data={responseTimeData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="day"
        className="font-urbanist text-sm font-semibold"
        stroke="#34D399"
      />
      <YAxis className="font-urbanist text-sm font-semibold" stroke="#34D399" />
      <Tooltip />
      {/* <Legend /> */}
      <Area
        type="monotone"
        dataKey="responseTime"
        stroke="#34D399"
        fill="#34D399"
        className="cursor-pointer stroke-brand"
      />
    </AreaChart>
  </ResponsiveContainer>
);
