import { useState } from "react";

interface Props {
  onSubmit: (actorData: { name: string }) => Promise<void>; // ändrad till async
  onSubmitted?: () => void;
}

export const ActorForm = ({ onSubmit, onSubmitted }: Props) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function clearForm() {
    setName("");
  }

  async function handleSubmit() {
    if (!name.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({ name });
      onSubmitted?.();
      clearForm();
    } catch (error) {
      console.error("Kunde inte spara scenis:", error);
      return <p>Något gick fel, prova igen</p>;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="h-fit flex flex-col gap-5 p-6 rounded-3xl border-2 border-secondary-grey shadow-lg"
      onSubmit={(ev) => {
        ev.preventDefault();
        handleSubmit();
      }}
    >
      <h1 className="text-2xl font-bold">Lägg in ny scenis</h1>
      <div>
        <h3 className="font-semibold p-2">Namn</h3>
        <input
          type="text"
          placeholder="Namn Namnsson"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          className="w-full border p-3 rounded-lg font-medium outline-0"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white rounded-3xl px-6 py-3 self-end hover:bg-teal-600 hover:cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? "Sparar..." : "Spara scenis"}
      </button>
    </form>
  );
};
