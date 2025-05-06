import { useState } from "react";

interface Props {
  onSubmit: (playData: { title: string; semester: string }) => void;
}

export const ProductionForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("");

  function clearForm() {
    setTitle("");
    setSemester("");
  }

  function handleSubmit() {
    onSubmit({ title, semester });
    clearForm();
  }

  return (
    <form
      className="mx-auto w-full max-w-md flex flex-col gap-5 p-6 rounded-3xl border-2 border-secondary-grey shadow-lg"
      onSubmit={(ev) => {
        ev.preventDefault();
        handleSubmit();
      }}
    >
      <h1 className="text-2xl font-bold">Skapa nytt spex</h1>
      <div>
        <h3 className="font-semibold p-2">Titel</h3>
        <input
          type="text"
          placeholder="Titel på föreställning"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className="w-full border p-3 rounded-lg font-medium outline-0"
          required
        />
      </div>
      <div>
        <h3 className="font-semibold p-2">Termin</h3>
        <input
          type="text"
          placeholder="Termin (t.ex. VT-25)"
          value={semester}
          onChange={(ev) => setSemester(ev.target.value)}
          className="w-full border p-3 rounded-lg font-medium outline-0"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white rounded-3xl px-6 py-3 self-end hover:bg-teal-600 hover:cursor-pointer"
      >
        Spara spex
      </button>
    </form>
  );
};
