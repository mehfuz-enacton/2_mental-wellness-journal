import type { MoodType } from "../types/mood";
import { MOODS } from "../constants/mood";

const VALID_MOOD_TYPES = MOODS.map((m) => m.type);

/**
 * Safely read moods from localStorage
 * Converts string → MoodType
 */
export function getStoredMoods(): Record<string, MoodType> {
  const raw = localStorage.getItem("daily-moods");

  if (!raw) return {};

  const parsed = JSON.parse(raw) as Record<string, unknown>;
  const result: Record<string, MoodType> = {};

  Object.entries(parsed).forEach(([date, value]) => {
    if (VALID_MOOD_TYPES.includes(value as MoodType)) {
      result[date] = value as MoodType;
    }
  });

  return result;
}
