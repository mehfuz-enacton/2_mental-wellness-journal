import { useMemo, useState } from "react";
import type { JournalEntry } from "../types/journal";
import { filterByMonthYear, groupByWeek } from "../utils/trends";
import { countMonthlyMoods } from "../utils/trends";
import type { MoodType } from "../types/mood";

import JournalLineChart from "../components/trends/JournalLineChart";
import EmojiBarChart from "../components/trends/EmojiBarChart";
import JournalInsightCard from "../components/trends/JournalInsightCard";
import EmojiInsightCard from "../components/trends/EmojiInsightCard";
import MonthYearFilter from "../components/MonthYearFilter";

const JOURNAL_KEY = "journal-entries";
const MOOD_KEY = "daily-moods";

const Trends = () => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  // ✅ Load journals safely
  const journals: JournalEntry[] = useMemo(() => {
    const stored = localStorage.getItem(JOURNAL_KEY);
    return stored ? JSON.parse(stored) : [];
  }, []);

  // Load moods (date -> emoji)
  const moods: Record<string, MoodType> = useMemo(() => {
    const stored = localStorage.getItem(MOOD_KEY);
    return stored ? JSON.parse(stored) : {};
  }, []);

  // ✅ Filtered journals
  const filtered = useMemo(() => {
    return filterByMonthYear(journals, month, year);
  }, [journals, month, year]);

  // ✅ Weekly journal count
  const journalData = useMemo(() => {
    return groupByWeek(filtered);
  }, [filtered]);

  console.log("journalData",journalData)

  const emojiData = useMemo(() => {
    return countMonthlyMoods(moods, month, year);
  }, [moods, month, year]);

  const handleClearFilter = () => {
    setMonth(now.getMonth());
    setYear(now.getFullYear());
  };

  return (
    <main className="min-h-screen bg-[#F6F7F3] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-[#2F3E46] mb-4">
          Trends & Insights
        </h1>

        <MonthYearFilter
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
          onClear={handleClearFilter}
          disableClear={month === now.getMonth() && year === now.getFullYear()}
        />

        {/* Journal section */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <JournalLineChart data={journalData} />
          <JournalInsightCard data={journalData} />
        </div>

        {/* Emoji section */}
        <div className="grid md:grid-cols-2 gap-6">
          <EmojiInsightCard data={emojiData} />
          <EmojiBarChart data={emojiData} />
        </div>
      </div>
    </main>
  );
};

export default Trends;
