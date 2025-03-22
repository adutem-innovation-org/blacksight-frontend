import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import bookingVolumeData from "@/data/booking-volume.json";

export const BookingVolumeChart = () => {
  return (
    <ResponsiveContainer width="100%" height={"100%"} className={"-ml-5"}>
      <BarChart data={bookingVolumeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          className="font-urbanist text-sm font-semibold"
          stroke="#1c398e"
        />
        <YAxis
          className="font-urbanist text-sm font-semibold"
          stroke="#1c398e"
        />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="bookings" className="cursor-pointer fill-brand" />
      </BarChart>
    </ResponsiveContainer>
  );
};
