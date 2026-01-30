import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EmojiTooltip from "./EmojiTooltip";

type Props = {
  data: { emoji: string; label: string; count: number }[];
};

const EmojiBarChart = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-[#2F3E46] mb-4">
        Mood Distribution
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="emoji" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<EmojiTooltip />} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmojiBarChart;
