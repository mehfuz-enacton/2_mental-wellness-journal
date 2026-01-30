type JournalTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: {
    value: number;
    payload: {
      week: string;
      count: number;
      startDate: string;
      endDate: string;
    };
  }[];
};

const format = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

const JournalTooltip = ({ active, payload, label }: JournalTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

   const data = payload[0].payload;

  return (
    <div className="bg-white shadow-md rounded-xl px-4 py-3 border border-gray-200">
      <p className="font-semibold text-[#2F3E46]">{label}</p>
      <p className="text-sm text-gray-600">
        {format(data.startDate)} –{" "}
        {format(data.endDate)}
      </p>
      <p className="mt-1 text-[#6B8E7F] font-medium">
        Journals: {data.count}
      </p>
    </div>
  );
};

export default JournalTooltip;
