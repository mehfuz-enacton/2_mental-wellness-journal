export type MoodType =
  | "happy"
  | "calm"
  | "sad"
  | "stress"
  | "angry"
  | "neutral";

export interface MoodEntry {
  date: string; // YYYY-MM-DD
  mood: MoodType;
}
