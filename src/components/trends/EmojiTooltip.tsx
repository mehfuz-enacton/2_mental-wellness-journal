type EmojiPayload = {
  emoji: string;
  label: string;
  count: number;
};

type EmojiTooltipProps = {
  active?: boolean;
  payload?: {
    payload: EmojiPayload;
  }[];
};

const EmojiTooltip = ({
  active,
  payload,
}: EmojiTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload as EmojiPayload;

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-md">
      <p className="font-semibold text-[#2F3E46]">
        {data.emoji} {data.label}
      </p>
      <p className="text-sm text-gray-600">
        Days: <span className="font-medium">{data.count}</span>
      </p>
    </div>
  );
};

export default EmojiTooltip;
