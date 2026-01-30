type Props = {
  data: { count: number }[];
};

const JournalInsightCard = ({ data }: Props) => {
  if (data.length < 2) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-[#6B8E7F]">
          Not enough data yet
        </p>
      </div>
    );
  }

  const last = data[data.length - 1].count;
  const prev = data[data.length - 2].count;

  let insight = "You maintained a steady journaling habit 🌿";

  if (last > prev) insight = "You're journaling more consistently 📈";
  if (last < prev) insight = "Your journaling slowed down recently 💙";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[#2F3E46] mb-2">
        Journal Insight
      </h3>
      <p className="text-[#2F3E46]">{insight}</p>
    </div>
  );
};

export default JournalInsightCard;
