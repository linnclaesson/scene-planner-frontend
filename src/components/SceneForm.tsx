import { useState } from "react";
import { postPGScene } from "../services/api";

interface Props {
  actId: string;
  onSubmitted?: () => void;
}

export const SceneForm = ({ actId, onSubmitted }: Props) => {
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }

    try {
      await postPGScene({ name, actId });
      setName("");
      onSubmitted?.();
    } catch (err) {
      console.error("Kunde inte skapa scen", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end mb-4">
      <div className="flex flex-col flex-1">
        <label className="font-medium mb-1">Scenens namn</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Scen 1 - I skolan"
          required
          className="border p-3 rounded-lg outline-0"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-teal-500 hover:cursor-pointer"
      >
        Lägg till scen
      </button>
    </form>
  );
};
