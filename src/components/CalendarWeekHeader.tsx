import { WEEK_DAYS } from "../utils/calendar";

const CalendarWeekHeader = () => {
  return (
    <div className="grid grid-cols-7 mb-3 text-center text-sm font-medium text-gray-500">
      {WEEK_DAYS.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
};

export default CalendarWeekHeader;
