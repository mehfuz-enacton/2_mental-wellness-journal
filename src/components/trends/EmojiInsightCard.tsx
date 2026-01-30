type EmojiData = {
  emoji: string;
  label: string;
  count: number;
};

type Props = {
  data: EmojiData[];
};

const EmojiInsightCard = ({ data }: Props) => {
  const top = [...data].sort((a, b) => b.count - a.count)[0];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-[#2F3E46] mb-3">
        Mood Insights
      </h3>

      {top.count === 0 ? (
        <p className="text-gray-600">
          No moods recorded for this period.
        </p>
      ) : (
        <p className="text-gray-700 leading-relaxed">
          You mostly felt{" "}
          <span className="font-semibold">
            {top.label} {top.emoji}
          </span>{" "}
          this month, appearing on{" "}
          <span className="font-semibold">{top.count}</span> days.
        </p>
      )}
    </div>
  );
};

export default EmojiInsightCard;
