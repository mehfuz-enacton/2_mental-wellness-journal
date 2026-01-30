import type { MoodType } from "../types/mood";
import { useState } from "react";
import { getCurrentWeek, getToday } from "../utils/date";
import { MOODS } from "../constants/mood";

const STORAGE_KEY = "daily-moods";

const Mood = () => {
  const today = getToday();
  const week = getCurrentWeek();

  const [moods, setMoods] = useState<Record<string, MoodType>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedMood, setSelectedMood] = useState<MoodType | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    return parsed[today] ?? null;
  });

  // const [moods, setMoods] = useState<Record<string, MoodType>>({});
  // const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  // Load saved moods
  // useEffect(() => {
  //   const saved = localStorage.getItem(STORAGE_KEY);
  //   if (saved) {
  //     setMoods(JSON.parse(saved));
  //     setSelectedMood(JSON.parse(saved)[today] || null);
  //   }
  // }, [today]);

  const handleSelectMood = (mood: MoodType) => {
    const updated = {
      ...moods,
      [today]: mood,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setMoods(updated);
    setSelectedMood(mood);
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-[#F6F7F3] to-[#EEF2EE] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#2F3E46] mb-2 text-center">
          How are you feeling today?
        </h2>
        <p className="text-gray-600 mb-15 text-center">
          Select the emoji that best represents your mood
        </p>

        {/* Mood Selector */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 justify-items-center">
          {MOODS.map((mood) => {
            const isActive = selectedMood === mood.type;

            return (
              <button
                key={mood.type}
                onClick={() => handleSelectMood(mood.type)}
                title={mood.label}
                className={`text-4xl transition
                  ${
                    isActive
                      ? "scale-125"
                      : "opacity-70 hover:scale-110 hover:opacity-100"
                  }`}
              >
                {mood.emoji}
              </button>
            );
          })}
        </div>

        {/* Week Timeline */}
        <div className="mb-12 mt-12">
          <div className="flex gap-4 overflow-x-auto pt-2 pb-2 sm:grid sm:grid-cols-7 sm:gap-4 sm:overflow-visible no-scrollbar">
            {week.map((day) => {
              const mood = moods[day.date];
              const emoji = MOODS.find((m) => m.type === mood)?.emoji;

              return (
                <div
                  key={day.date}
                  className={`min-w-30 sm:min-w-0 rounded-2xl p-4 text-center transition-all duration-300
            ${
              day.isToday
                ? "bg-white shadow-lg ring-1 ring-[#6B8E7F]/40"
                : "bg-white shadow-sm hover:shadow-md"
            }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      day.isToday ? "text-[#2F3E46]" : "text-gray-500"
                    }`}
                  >
                    {day.label}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    {day.date.slice(8)}
                  </p>

                  <div
                    className={`w-11 h-11 mx-auto rounded-full flex items-center justify-center text-2xl
              ${
                emoji
                  ? "bg-linear-to-br from-[#E2E5DE] to-[#D3DBD4]"
                  : "bg-gray-100 text-gray-400"
              }`}
                  >
                    {emoji || "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Mood Text */}
        {selectedMood && (
          <p className="mt-8 text-center text-[#2F3E46]">
            You’re feeling{" "}
            <span className="font-semibold">
              {MOODS.find((m) => m.type === selectedMood)?.label}
            </span>{" "}
            today
          </p>
        )}
      </div>
    </main>
  );
};

export default Mood;
