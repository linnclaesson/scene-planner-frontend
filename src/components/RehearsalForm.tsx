import { useState } from "react";
import { postPGRehearsal } from "../services/api";

interface Props {
  playId: string;
  onSubmitted?: () => void;
}

export const RehearsalForm = ({ playId, onSubmitted }: Props) => {
  const [date, setDate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date.trim()) {
      return;
    }

    try {
      await postPGRehearsal(playId, { date });
      setDate("");
      onSubmitted?.();
    } catch (err) {
      console.error("Kunde inte skapa repetition", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end">
      <div className="flex flex-col flex-1">
        <label className="font-medium mb-1">Datum</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border p-3 rounded-lg outline-0"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-teal-500 hover:cursor-pointer"
      >
        Lägg till repetition
      </button>
    </form>
  );
};
