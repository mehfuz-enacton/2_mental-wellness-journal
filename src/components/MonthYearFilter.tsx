import Button from "./UI/Button";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEARS = Array.from({ length: 10 }, (_, i) => 2023 + i);

type Props = {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onClear: () => void;
  disableClear: boolean;
};

const MonthYearFilter = ({
  month,
  year,
  onMonthChange,
  onYearChange,
  onClear,
  disableClear,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-4 justify-end mb-6">
      <select
        value={month}
        onChange={(e) => onMonthChange(Number(e.target.value))}
        className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-[#2F3E46] cursor-pointer"
      >
        {MONTHS.map((m, i) => (
          <option key={m} value={i}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-[#2F3E46] cursor-pointer"
      >
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <Button onClick={onClear} disabled={disableClear}>
        Clear Filter
      </Button>
    </div>
  );
};

export default MonthYearFilter;
