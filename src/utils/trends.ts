import type { JournalEntry } from "../types/journal";
import { MOODS } from "../constants/mood";
import type { MoodType } from "../types/mood";

/* Filter by month & year */
export function filterByMonthYear(
  journals: JournalEntry[],
  month: number,
  year: number,
) {
  return journals.filter((j) => {
    const d = new Date(j.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // If Sunday, go back 6 days, else go to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/* Get the Sunday of the week for a given date */
function getWeekEnd(date: Date): Date {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

function getWeekOfMonth(date: Date): number {
  const d = new Date(date);
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
  const firstMonday = getWeekStart(firstDay);
  
  const weekStart = getWeekStart(d);
  
  // Calculate difference in weeks
  const diffTime = weekStart.getTime() - firstMonday.getTime();
  const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
  
  return diffWeeks + 1;
}

/* Week-wise journal count */
export function groupByWeek(entries: JournalEntry[]) {
  const weeks: Record<
    string,
    {
      count: number;
      startDate: Date;
      endDate: Date;
      weekNumber: number;
    }
  > = {};

  entries.forEach((entry) => {
    const date = new Date(entry.date);
    const weekStart = getWeekStart(date);
    const weekEnd = getWeekEnd(date);

    // Calculate week number within the month
    const key = weekStart.toISOString().split("T")[0];

    if (!weeks[key]) {
      // Calculate which week of the month this is (1-indexed)
       const weekNumber = getWeekOfMonth(date);

      weeks[key] = {
        count: 0,
        startDate: weekStart,
        endDate: weekEnd,
        weekNumber: weekNumber,
      };
    }

    weeks[key].count += 1;
  });

  return Object.entries(weeks)
    .map(([, data]) => ({
      week: `Week ${data.weekNumber}`,
      count: data.count,
      startDate: data.startDate.toISOString().split("T")[0],
      endDate: data.endDate.toISOString().split("T")[0],
      sortKey: data.startDate.getTime(), // For sorting
    }))
    .sort((a, b) => a.sortKey - b.sortKey);
}

export function countMonthlyMoods(
  moods: Record<string, MoodType>,
  month: number,
  year: number,
) {
  // initialize all mood types with 0
  const counts: Record<MoodType, number> = {
    happy: 0,
    calm: 0,
    sad: 0,
    stress: 0,
    angry: 0,
    neutral: 0,
  };

  Object.entries(moods).forEach(([dateStr, moodType]) => {
    const date = new Date(dateStr);

    if (date.getMonth() === month && date.getFullYear() === year) {
      counts[moodType] += 1;
    }
  });

  // map to chart-friendly structure
  return MOODS.map((m) => ({
    emoji: m.emoji,
    label: m.label,
    count: counts[m.type],
  }));
}
