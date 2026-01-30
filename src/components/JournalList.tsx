import JournalItem from "./JournalItem";
import type { JournalEntry } from "../types/journal";

type Props = {
  entries: JournalEntry[];
  onEdit?: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
};

const JournalList = ({ entries, onEdit, onDelete }: Props) => {
  if (entries.length === 0) {
    return (
      <p className="text-center text-[#6B8E7F]">
        No entries for today 🌿
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry) => (
        <JournalItem
          key={entry.id}
          entry={entry}
          onEdit={onEdit ? () => onEdit(entry):undefined}
          onDelete={() => onDelete(entry.id)}
        />
      ))}
    </div>
  );
};

export default JournalList;
