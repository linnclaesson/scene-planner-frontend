import { useState } from "react";
import { postPGAct } from "../services/api";

interface Props {
  playId: string;
  onSubmitted?: () => void;
}

export const ActForm = ({ playId, onSubmitted }: Props) => {
  const [title, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    try {
      await postPGAct({ title, playId });
      setName("");
      onSubmitted?.();
    } catch (err) {
      console.error("Kunde inte skapa akt", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end">
      <div className="flex flex-col flex-1">
        <label className="font-medium mb-1">Aktens titel</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Akt 1"
          required
          className="border p-3 rounded-lg outline-0"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-teal-500 hover:cursor-pointer"
      >
        Lägg till akt
      </button>
    </form>
  );
};
