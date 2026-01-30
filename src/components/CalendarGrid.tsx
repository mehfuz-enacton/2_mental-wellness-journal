import CalendarDay from "./CalendarDay";
import type { JournalEntry } from "../types/journal";
import type { CalendarDayType } from "../types/Calendar";

type Props = {
  days: CalendarDayType[];
  journals: JournalEntry[];
  moods: Record<string, string>;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
};

const CalendarGrid = ({
  days,
  journals,
  moods,
  selectedDate,
  onSelectDate,
}: Props) => {
  return (
    <div className="grid grid-cols-7 gap-2 sm:gap-4">
      {days.map((day, index) => (
        <CalendarDay
          key={index}
          day={day}
          mood={day ? moods[day.date] : undefined}
          hasJournal={day ? journals.some((j) => j.date === day.date) : false}
          isSelected={day?.date === selectedDate}
          onSelect={() => day && onSelectDate(day.date)}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
