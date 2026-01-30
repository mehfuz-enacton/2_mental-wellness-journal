import { useState } from "react";
import { getMonthCalendar } from "../utils/calendar";
import CalendarWeekHeader from "../components/CalendarWeekHeader";
import CalendarGrid from "../components/CalendarGrid";
import JournalList from "../components/JournalList";
import ConfirmModal from "../components/UI/ConfirmModal";
import type { JournalEntry } from "../types/journal";
import { formatDateDDMMYYYY } from "../utils/formatDate";
import MonthYearFilter from "../components/MonthYearFilter";

const JOURNAL_KEY = "journal-entries";
const MOOD_KEY = "daily-moods";

const Calendar = () => {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const days = getMonthCalendar(year, month);
  const [journals, setJournals] = useState<JournalEntry[]>(() => {
    const j = localStorage.getItem(JOURNAL_KEY);
    return j ? JSON.parse(j) : [];
  });

  const [moods] = useState<Record<string, string>>(() => {
    const m = localStorage.getItem(MOOD_KEY);
    return m ? JSON.parse(m) : {};
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleClearFilter = () => {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    setSelectedDate(null);
  };

  // const [journals, setJournals] = useState<JournalEntry[]>([]);
  // const [moods, setMoods] = useState<Record<string, string>>({});
  // useEffect(() => {
  //   const j = localStorage.getItem(JOURNAL_KEY);
  //   const m = localStorage.getItem(MOOD_KEY);

  //   if (j) setJournals(JSON.parse(j));
  //   if (m) setMoods(JSON.parse(m));
  // }, []);

  const handleDeleteConfirm = () => {
    if (!deleteId) return;

    const updated = journals.filter((j) => j.id !== deleteId);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
    setJournals(updated);
    setDeleteId(null);
  };

  const selectedJournals = journals.filter((j) => j.date === selectedDate);

  return (
    <main className="min-h-screen bg-[#F6F7F3] px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-[#2F3E46] mb-1">
          Monthly Overview
        </h2>
        <p className="text-gray-600 mb-6">
          Your moods and journals across this month
        </p>

        <MonthYearFilter
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
          onClear={handleClearFilter}
          disableClear={
            month === today.getMonth() && year === today.getFullYear()
          }
        />

        {/* Calendar */}
        <CalendarWeekHeader />
        <CalendarGrid
          days={days}
          journals={journals}
          moods={moods}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Journal List */}
        {selectedDate && (
          <section className="mt-10">
            <h3 className="text-lg font-semibold text-[#2F3E46] mb-4">
              Journals on {formatDateDDMMYYYY(selectedDate)}
            </h3>

            <JournalList
              entries={selectedJournals}
              onDelete={(id) => setDeleteId(id)}
            />
          </section>
        )}
      </div>

      {deleteId && (
        <ConfirmModal
          title="Delete Journal Entry"
          message="Are you sure you want to delete this journal?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </main>
  );
};

export default Calendar;
