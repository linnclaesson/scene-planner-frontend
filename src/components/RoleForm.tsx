import { useState } from "react";
import { postPGRole } from "../services/api";

interface Props {
  playId: string;
  onSubmitted?: () => void;
}

export const RoleForm = ({ playId, onSubmitted }: Props) => {
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }

    try {
      await postPGRole({ name, playId });
      setName("");
      onSubmitted?.();
    } catch (err) {
      console.error("Kunde inte skapa roll", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end">
      <div className="flex flex-col flex-1">
        <label className="font-medium mb-1">Rollens namn</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Pappa, Rektor, Pirat"
          required
          className="border p-3 rounded-lg outline-0"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-teal-500 hover:cursor-pointer"
      >
        Lägg till roll
      </button>
    </form>
  );
};
