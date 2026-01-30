import { MOODS } from "../constants/mood";
import type { CalendarDayType } from "../types/Calendar";

type Props = {
  day: CalendarDayType;
  mood?: string;
  hasJournal: boolean;
  isSelected: boolean;
  onSelect: () => void;
};

const CalendarDay = ({
  day,
  mood,
  hasJournal,
  isSelected,
  onSelect,
}: Props) => {
  if (!day) return <div />;

  const emoji = MOODS.find((m) => m.type === mood)?.emoji;

  return (
    <button
      onClick={onSelect}
      className={`relative h-20 sm:h-24 rounded-2xl bg-white
        flex flex-col items-center justify-between p-3 cursor-pointer
        transition-all duration-200
        hover:shadow-md hover:-translate-y-0.5
        ${isSelected ? "ring-2 ring-[#6B8E7F]" : "ring-1 ring-transparent"}
        ${day.isToday ? "border border-[#6B8E7F]" : "border border-gray-200"}
      `}
    >
      {/* Date */}
      <span className="text-sm font-semibold text-[#2F3E46]">{day.day}</span>

      {/* Emoji */}
      <span className="text-xl sm:text-2xl">{emoji || "—"}</span>

      {/* Journal dot */}
      {hasJournal ? (
        <span className="w-2 h-2 bg-[#6B8E7F] rounded-full" />
      ) : (
        <span className="w-2 h-2" />
      )}
    </button>
  );
};

export default CalendarDay;
