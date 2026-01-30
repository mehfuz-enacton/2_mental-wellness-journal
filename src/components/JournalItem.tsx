import Button from "./UI/Button";
import type { JournalEntry } from "../types/journal";

type Props = {
  entry: JournalEntry;
  onEdit?: () => void;
  onDelete: () => void;
};

const JournalItem = ({ entry, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[#6B8E7F]">
          {entry.category.emoji} {entry.category.label} • {entry.time}
        </span>
      </div>

      <p className="text-[#2F3E46] mb-4">{entry.text}</p>

      <div className="flex justify-end gap-3">
        {onEdit && (
          <Button className="px-4 py-1 text-sm" onClick={onEdit}>
            Edit
          </Button>
        )}
        <Button
          className="px-4 py-1 text-sm bg-red-500 hover:bg-red-700"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default JournalItem;
