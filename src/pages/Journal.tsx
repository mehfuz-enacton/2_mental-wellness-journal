import { useState } from "react";
import JournalForm from "../components/JournalForm";
import JournalList from "../components/JournalList";
import type { JournalEntry } from "../types/journal";
import ConfirmModal from "../components/UI/ConfirmModal";

const STORAGE_KEY = "journal-entries";

const Journal = () => {
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  // const [entries, setEntries] = useState<JournalEntry[]>([]);
  // useEffect(() => {
  //   const saved = localStorage.getItem(STORAGE_KEY);
  //   if (saved) setEntries(JSON.parse(saved));
  // }, []);

  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const saveToStorage = (data: JournalEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setEntries(data);
  };

  const handleSave = (entry: JournalEntry) => {
    let updated;

    if (editingEntry) {
      updated = entries.map((e) => (e.id === entry.id ? entry : e));
      setEditingEntry(null);
    } else {
      updated = [entry, ...entries];
    }

    saveToStorage(updated);
  };

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    saveToStorage(entries.filter((e) => e.id !== deleteId));
    setDeleteId(null);
  };

  const todaysEntries = entries.filter((e) => e.date === today);

  return (
    <main className="min-h-screen bg-[#F6F7F3] px-4 py-15">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <JournalForm
          onSave={handleSave}
          editingEntry={editingEntry}
          key={editingEntry?.id ?? "new"}
        />

        <section>
          <h3 className="text-lg font-semibold text-[#2F3E46] mb-4">
            Today’s Entries
          </h3>
          <JournalList
            entries={todaysEntries}
            onEdit={setEditingEntry}
            onDelete={(id) => setDeleteId(id)}
          />
        </section>
      </div>
      {deleteId && (
        <ConfirmModal
          title="Delete Journal Entry"
          message="Are you sure you want to delete this entry? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </main>
  );
};

export default Journal;
