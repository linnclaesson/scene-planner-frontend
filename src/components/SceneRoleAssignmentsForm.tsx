import { useState } from "react";
import { Play, Actor, SceneRoleAssignment } from "../interfaces";
import { postPGSceneRoleAssignment } from "../services/api";

interface Props {
  play: Play;
  actors: Actor[];
  onSubmitted: () => void;
}

export const SceneRoleAssignmentsForm = ({
  play,
  actors,
  onSubmitted,
}: Props) => {
  const [sceneId, setSceneId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [actorId, setActorId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sceneId || !roleId || !actorId) {
      return;
    }

    const newAssignment: SceneRoleAssignment = {
      sceneId,
      roleId,
      actorId,
    };

    try {
      setIsSubmitting(true);
      await postPGSceneRoleAssignment(newAssignment);
      setSceneId("");
      setRoleId("");
      setActorId("");
      onSubmitted();
    } catch (error) {
      console.error("Error creating assignment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Scene */}
      <div>
        <label className="block text-sm font-medium mb-1">Scen</label>
        <select
          value={sceneId}
          onChange={(e) => setSceneId(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Välj scen</option>
          {play.acts.flatMap((act) =>
            act.scenes.map((scene) => (
              <option key={scene.id} value={scene.id}>
                {act.title} – {scene.name}
              </option>
            )),
          )}
        </select>
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium mb-1">Roll</label>
        <select
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Välj roll</option>
          {play.roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {/* Actor */}
      <div>
        <label className="block text-sm font-medium mb-1">Skådespelare</label>
        <select
          value={actorId}
          onChange={(e) => setActorId(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Välj skådespelare</option>
          {actors.map((actor) => (
            <option key={actor.id} value={actor.id}>
              {actor.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-teal-500 hover:cursor-pointer"
        >
          {isSubmitting ? "Sparar..." : "Tilldela roll"}
        </button>
      </div>
    </form>
  );
};
