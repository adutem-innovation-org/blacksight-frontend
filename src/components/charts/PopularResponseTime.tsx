import popularBookingTimeData from "@/data/popular-booking-time.json";
import {
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Scatter,
} from "recharts";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const hours = [9, 10, 11];

export const PopularBookingTimeChart = () => {
  return (
    <ResponsiveContainer width="100%" height={"100%"} className={"-ml-5"}>
      <ScatterChart>
        <XAxis
          type="category"
          dataKey="day"
          name="Day"
          className="font-urbanist text-sm font-medium"
          stroke="#8884d8"
          tick={{
            fontSize: 12,
            color: "#0000ff",
            stroke: "#8884d8",
          }}
        />
        <YAxis
          type="number"
          dataKey="hour"
          name="Hour"
          className="font-urbanist text-sm font-medium"
          stroke="#8884d8"
          tick={{ fontSize: 12, color: "#0000ff", stroke: "#8884d8" }}
        />
        <ZAxis
          type="number"
          dataKey="value"
          range={[20, 400]}
          name="Requests"
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter
          name="Appointments"
          data={popularBookingTimeData}
          fill="#8884d8"
          shape="circle"
          className="cursor-pointer"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
