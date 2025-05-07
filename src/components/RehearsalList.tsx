import { useState } from "react";
import { Rehearsal, Scene } from "../interfaces";
import {
  addSceneToPGRehearsal,
  removeSceneFromPGRehearsal,
} from "../services/api";

interface Props {
  rehearsals: Rehearsal[];
  scenes: Scene[];
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

export const RehearsalList = ({
  rehearsals,
  scenes,
  onDelete,
  onUpdate,
}: Props) => {
  const [selectedScenes, setSelectedScenes] = useState<Record<string, string>>(
    {},
  );

  const handleAddScene = async (rehearsalId: string) => {
    const sceneId = selectedScenes[rehearsalId];
    if (!sceneId) {
      return;
    }

    try {
      await addSceneToPGRehearsal(rehearsalId, sceneId);
      onUpdate();
    } catch (err) {
      console.error("Kunde inte lägga till scen", err);
    }
  };

  const handleRemoveScene = async (rehearsalId: string, sceneId: string) => {
    try {
      await removeSceneFromPGRehearsal(rehearsalId, sceneId);
      onUpdate();
    } catch (err) {
      console.error("Kunde inte ta bort scen", err);
    }
  };

  if (rehearsals.length === 0) {
    return <p className="text-gray-500">Inga repetitioner ännu.</p>;
  }

  return (
    <ul className="space-y-4">
      {rehearsals.map((rehearsal) => (
        <li
          key={rehearsal.id}
          className="border p-4 rounded-xl shadow-sm bg-neutral-50"
        >
          <div className="flex justify-between">
            <div className="flex justify-between items-center">
              <span className="font-semibold pr-5">
                Rep {new Date(rehearsal.date).toLocaleDateString("sv-SE")}
              </span>
              <button
                onClick={() => onDelete(rehearsal.id)}
                className="bg-orange-200 py-1 px-3 rounded-2xl hover:bg-red-300 hover:cursor-pointer"
              >
                Ta bort rep
              </button>
            </div>

            {/* Lägg till scen-formulär */}
            <div className="flex gap-2 items-center">
              <select
                className="border rounded px-2 py-1 text-sm"
                value={selectedScenes[rehearsal.id] || ""}
                onChange={(e) =>
                  setSelectedScenes((prev) => ({
                    ...prev,
                    [rehearsal.id]: e.target.value,
                  }))
                }
              >
                <option value="">Välj scen</option>
                {scenes.map((scene) => (
                  <option key={scene.id} value={scene.id}>
                    {scene.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleAddScene(rehearsal.id)}
                className="bg-black text-white rounded-3xl px-3 py-1 self-end hover:bg-teal-600 hover:cursor-pointer disabled:opacity-50"
              >
                Lägg till scen
              </button>
            </div>
          </div>

          {/* Lista scener */}
          <div className="flex flex-wrap gap-4 mt-2">
            {rehearsal.scenes.map((scene) => (
              <div key={scene.id} className="flex items-center">
                <span className="font-semibold bg-blue-300 px-3 py-1 rounded m-1">
                  {scene.name}
                </span>
                <button
                  onClick={() => handleRemoveScene(rehearsal.id, scene.id)}
                  className="text-red-600 font-semibold bg-orange-200 rounded py-1 px-3 hover:bg-red-300 hover:cursor-pointer"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};
