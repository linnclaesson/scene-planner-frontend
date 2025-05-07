import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchPGPlayById,
  getScenesByPlayId,
  fetchPGRehearsalsByPlayId,
  deletePGRehearsal,
} from "../services/api";
import { Play, Scene, Rehearsal, Actor } from "../interfaces";
import { RehearsalForm } from "../components/RehearsalForm";
import { RehearsalList } from "../components/RehearsalList";

export const ScenePlanner = () => {
  const { playId } = useParams();
  const [play, setPlay] = useState<Play | null>(null);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [rehearsals, setRehearsals] = useState<Rehearsal[]>([]);

  const refresh = useCallback(() => {
    if (!playId) {
      return;
    }

    fetchPGPlayById(playId).then(setPlay).catch(console.error);
    getScenesByPlayId(playId).then(setScenes).catch(console.error);
    fetchPGRehearsalsByPlayId(String(playId))
      .then(setRehearsals)
      .catch(console.error);
  }, [playId]);

  const handleDelete = async (rehearsalId: string) => {
    try {
      await deletePGRehearsal(rehearsalId);
      refresh();
    } catch (err) {
      console.error("Kunde inte ta bort repetition", err);
    }
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!play) {
    return <p className="p-6">Laddar spexdata...</p>;
  }

  const sceneCounts: Record<string, number> = {};
  rehearsals.forEach((rep) => {
    rep.scenes.forEach((scene) => {
      sceneCounts[scene.id] = (sceneCounts[scene.id] || 0) + 1;
    });
  });

  const allActorsMap: Record<string, Actor> = {};
  scenes.forEach((scene) => {
    scene.sceneRoleAssignments.forEach((assignment) => {
      allActorsMap[assignment.actor.id] = assignment.actor;
    });
  });
  const allActors = Object.values(allActorsMap);

  const actorCounts: Record<string, number> = {};
  rehearsals.forEach((rep) => {
    rep.scenes.forEach((scene) => {
      const fullScene = scenes.find((s) => s.id === scene.id);
      if (!fullScene) {
        return;
      }

      fullScene.sceneRoleAssignments.forEach((assignment) => {
        const actorId = assignment.actor.id;
        actorCounts[actorId] = (actorCounts[actorId] || 0) + 1;
      });
    });
  });

  const getActorBg = (count: number): string => {
    const level = Math.min(6, Math.floor(count / 3));
    const bgClasses = [
      "bg-purple-100",
      "bg-purple-200",
      "bg-purple-300",
      "bg-purple-400",
      "bg-purple-500",
      "bg-purple-600",
      "bg-purple-700",
    ];
    return bgClasses[level];
  };

  return (
    <section className="bg-neutral-50 min-h-screen p-20">
      <div className="flex justify-between pb-5">
        <div>
          <Link
            to={"/playPage/" + play.id}
            className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-teal-500 hover:cursor-pointer"
          >
            Tillbaka till {play.title}
          </Link>
          <h1 className="text-3xl font-bold pt-30">
            Scenplanerare för: {play.title}
          </h1>
        </div>
        <div>
          <section className="p-6 border rounded-2xl shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">
              Lägg till repetition
            </h2>
            <RehearsalForm playId={play.id} onSubmitted={refresh} />
          </section>
        </div>
      </div>
      <div className="flex gap-10 justify-between">
        <div className="w-1/3 flex gap-5">
          {/* Scener */}
          <div className="flex-1/2">
            <h3 className="font-semibold text-lg mb-2">Scener</h3>
            <ul className="text-sm space-y-1">
              {scenes.map((scene) => (
                <li
                  key={scene.id}
                  className={`flex justify-between p-2 rounded ${
                    (sceneCounts[scene.id] || 0) >= 3
                      ? "bg-green-200"
                      : "bg-amber-100"
                  }`}
                >
                  <span>{scene.name}</span>
                  <span className="text-gray-900 font-semibold">
                    {sceneCounts[scene.id] || 0}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Aktörer */}
          <div className="flex-1/2">
            <h3 className="font-semibold text-lg mb-2">Skådespelare</h3>
            <ul className="text-sm space-y-1">
              {allActors.map((actor) => (
                <li
                  key={actor.id}
                  className={`flex justify-between p-2 rounded ${getActorBg(actorCounts[actor.id] || 0)}`}
                >
                  <span>{actor.name}</span>
                  <span className="text-gray-900 font-semibold">
                    {actorCounts[actor.id] || 0}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="flex-1 col-span-2 p-6 border rounded-2xl shadow-md bg-white">
          <h2 className="text-2xl font-semibold mb-4">Repetitioner</h2>
          <RehearsalList
            rehearsals={rehearsals}
            scenes={scenes}
            onUpdate={refresh}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </section>
  );
};
