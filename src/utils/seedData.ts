import type { JournalEntry, Category } from "../types/journal";
import type { MoodType } from "../types/mood";
import { MOODS } from "../constants/mood";

const JOURNAL_KEY = "journal-entries";
const MOOD_KEY = "daily-moods";

/* Journal categories (separate from moods) */
const CATEGORIES: Category[] = [
  { label: "Happy", emoji: "😊" },
  { label: "Grateful", emoji: "🤗" },
  { label: "Calm", emoji: "🧘‍♂️" },
  { label: "Anxious", emoji: "😟" },
  { label: "Stressful", emoji: "😣" },
  { label: "Sad", emoji: "😔" },
  { label: "Angry", emoji: "😡" },
];

/* Utility */
const randomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/* MAIN SEED FUNCTION */
export function seedLocalStorage(days = 30) {
  const journals: JournalEntry[] = [];
  const moods: Record<string, MoodType> = {};

  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateStr = date.toISOString().split("T")[0];

    /* ---------- MOOD (1 per day, sometimes skipped) ---------- */
    if (Math.random() > 0.15) {
      const mood = randomItem(MOODS).type;
      moods[dateStr] = mood;
    }

    /* ---------- JOURNALS (0–3 per day) ---------- */
    const journalCount = randomInt(0, 3);

    for (let j = 0; j < journalCount; j++) {
      const category = randomItem(CATEGORIES);

      journals.push({
        id: crypto.randomUUID(),
        text: `Sample journal about ${category.label.toLowerCase()}`,
        category,
        date: dateStr,
        time: `${randomInt(9, 22)}:${randomInt(0, 59)
          .toString()
          .padStart(2, "0")}`,
      });
    }
  }

  localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
  localStorage.setItem(MOOD_KEY, JSON.stringify(moods));

  console.log("✅ Seed data created");
  console.log("Journals:", journals.length);
  console.log("Moods:", Object.keys(moods).length);
}
