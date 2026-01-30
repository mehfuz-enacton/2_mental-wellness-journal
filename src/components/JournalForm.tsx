import { useRef, useState } from "react";
import Button from "./UI/Button";
import type { Category, JournalEntry } from "../types/journal";

const categories: Category[] = [
  { label: "Happy", emoji: "😊" },
  { label: "Grateful", emoji: "🤗" },
  { label: "Calm", emoji: "🧘‍♂️" },
  { label: "Anxious", emoji: "😟" },
  { label: "Stressful", emoji: "😣" },
  { label: "Sad", emoji: "😔" },
  { label: "Angry", emoji: "😡" },
];

type Props = {
  onSave: (entry: JournalEntry) => void;
  editingEntry?: JournalEntry | null;
};

const JournalForm = ({ onSave, editingEntry }: Props) => {
  const [text, setText] = useState(editingEntry?.text || "");
  const [category, setCategory] = useState<Category>(
    editingEntry?.category || categories[0],
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) {
      setError(true);
      textareaRef.current?.focus();
      return;
    }

    setError(false);

    const now = new Date();

    const entry: JournalEntry = {
      id: editingEntry?.id || crypto.randomUUID(),
      text,
      category,
      date: now.toISOString().split("T")[0],
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    onSave(entry);
    setText("");
    setCategory(categories[0]);
  };

  // useEffect(() => {
  //   if (editingEntry) {
  //     setText(editingEntry.text);
  //     setCategory(editingEntry.category);
  //   }
  // }, [editingEntry]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[#2F3E46] mb-4">
        Today’s Journal
      </h2>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm border border-gray-300 cursor-pointer
              ${
                category.label === cat.label
                  ? "bg-[#6B8E7F] text-[#F6F7F3]"
                  : "bg-[#F6F7F3] text-[#2F3E46]"
              }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Text Editor */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (error) setError(false);
        }}
        placeholder="Write what’s on your mind…"
        className={`w-full h-32 p-4 rounded-xl border resize-none focus:outline-none ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {/* Button */}
      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit}>
          {editingEntry ? "Update Entry" : "Save Entry"}
        </Button>
      </div>
    </div>
  );
};

export default JournalForm;
