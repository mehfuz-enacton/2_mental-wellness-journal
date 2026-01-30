import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import JournalTooltip from "./JournalTooltip";

type Props = {
  data: {
    week: string;
    count: number;
    startDate: string;
    endDate: string;
  }[];
};

const JournalLineChart = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[#2F3E46] mb-4">
        Journal Growth
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<JournalTooltip />} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#6B8E7F"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JournalLineChart;
