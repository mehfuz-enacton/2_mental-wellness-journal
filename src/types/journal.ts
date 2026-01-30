export type Category = {
  label: string;
  emoji: string;
};

export type JournalEntry = {
  id: string;
  text: string;
  category: Category;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
};
