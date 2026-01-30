import type { MoodType } from "../types/mood";

export const MOODS: { type: MoodType; emoji: string; label: string }[] = [
  { type: "happy", emoji: "😁", label: "Happy" },
  { type: "calm", emoji: "😌", label: "Calm" },
  { type: "sad", emoji: "😢", label: "Sad" },
  { type: "stress", emoji: "😣", label: "Stressed" },
  { type: "angry", emoji: "😠", label: "Angry" },
  { type: "neutral", emoji: "😐", label: "Neutral" },
];
