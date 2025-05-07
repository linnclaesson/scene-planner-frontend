import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Play, Actor } from "../interfaces";
import { fetchPGPlayById, fetchPGActors } from "../services/api";
import { SceneRoleAssignmentsForm } from "../components/SceneRoleAssignmentsForm";

export const SceneRoleAssignmentPage = () => {
  const { playId } = useParams();
  const [play, setPlay] = useState<Play | null>(null);
  const [actors, setActors] = useState<Actor[]>([]);

  useEffect(() => {
    if (playId) {
      fetchPGPlayById(playId).then(setPlay).catch(console.error);
      fetchPGActors().then(setActors).catch(console.error);
    }
  }, [playId]);

  const refreshPlay = () => {
    if (playId) {
      fetchPGPlayById(playId).then(setPlay).catch(console.error);
    }
  };

  if (!play) {
    return <p className="p-6">Laddar spexdata...</p>;
  }

  return (
    <section className="bg-neutral-50 min-h-screen px-20 flex justify-around">
      <div className="w-1/2 py-10">
        <Link
          to={"/playPage/" + play.id}
          className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-teal-500 hover:cursor-pointer"
        >
          Tillbaka till {play.title}
        </Link>
        <h1 className="text-3xl font-bold my-6">
          Tilldela roller: {play.title}
        </h1>

        <section className="p-6 border rounded-2xl shadow-md bg-white">
          <h2 className="text-2xl font-semibold mb-4">
            Lägg in vem som spelar vad i vilken scen
          </h2>
          <SceneRoleAssignmentsForm
            play={play}
            actors={actors}
            onSubmitted={refreshPlay}
          />
        </section>
      </div>

      <div className="w-1/3 py-20">
        <h2 className="text-2xl font-bold mb-4">Rollöversikt</h2>
        {play.acts.map((act) => (
          <div key={act.id} className="mb-6">
            <h3 className="text-lg font-semibold">{act.title}</h3>
            {act.scenes.map((scene) => (
              <div key={scene.id} className="ml-4 mb-2">
                <h4 className="font-medium">{scene.name}</h4>
                {scene.sceneRoleAssignments?.length > 0 ? (
                  <ul className="list-disc ml-6 text-sm">
                    {scene.sceneRoleAssignments.map((sra) => (
                      <li
                        key={`${sra.id.sceneId}-${sra.id.roleId}-${sra.id.actorId}`}
                      >
                        {sra.role.name} spelas av {sra.actor.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm ml-2">
                    Inga tilldelningar ännu.
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
