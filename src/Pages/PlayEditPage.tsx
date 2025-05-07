import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Play } from "../interfaces";
import { fetchPGPlayById } from "../services/api";
import { ActForm } from "../components/ActForm";
import { SceneForm } from "../components/SceneForm";
import { RoleForm } from "../components/RoleForm";

export const PlayEditPage = () => {
  const { playId } = useParams();
  const [play, setPlay] = useState<Play | null>(null);

  useEffect(() => {
    if (playId) {
      fetchPGPlayById(playId).then(setPlay).catch(console.error);
    }
  }, [playId]);

  if (!play) {
    return <p className="p-6">Laddar spexdata...</p>;
  }

  const refreshPlay = () => {
    if (playId) {
      fetchPGPlayById(playId).then(setPlay).catch(console.error);
    }
  };

  return (
    <section className="bg-neutral-50 min-h-screen p-20 flex justify-around">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-6">Redigera spex: {play.title}</h1>

        <div className="space-y-12">
          {/* === Akter === */}
          <section className="p-6 border rounded-2xl shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">1. Lägg till akter</h2>
            <ActForm playId={play.id} onSubmitted={refreshPlay} />
          </section>

          {/* === Roller === */}
          <section className="p-6 border rounded-2xl shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">2. Lägg till roller</h2>
            <RoleForm playId={play.id} onSubmitted={refreshPlay} />
          </section>

          {/* === Scener === */}
          <section className="p-6 border rounded-2xl shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">
              3. Lägg till scener per akt
            </h2>
            {play.acts.map((act) => (
              <div key={act.id} className="mb-6">
                <h3 className="text-lg font-medium mb-2">Akt: {act.title}</h3>
                <SceneForm actId={act.id} onSubmitted={refreshPlay} />
              </div>
            ))}
          </section>

          {/* === Lägg till rollfördelningar === */}
          <section className="p-6 border rounded-2xl shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">4. Rollfördelningar</h2>
            <p className="mb-4">
              När du lagt till akter, scener och roller kan vi koppla vem som
              ska spela vad i vilken scen.
            </p>
            <p className="font-bold">
              !OBS! Detta kräver att alla aktuella scenisar finns inlagda under
              <Link to="/scenisar" className="hover:text-teal-500">
                {" "}
                scenisar
              </Link>
            </p>
            <Link
              to={"/assignments/" + play.id}
              className="flex justify-between text-lg p-5 my-5 font-semibold hover:cursor-pointer hover:bg-teal-500 border rounded-2xl py-5"
            >
              Gå till rollfördelaren →
            </Link>
          </section>

          {/* === Gå till scenplanneraren === */}
          <section className="p-6 border rounded-2xl shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">5. Scenplanneraren</h2>
            <p className="mb-4">
              När alla steg ovan är avklarade är det dags att planera scener!
            </p>
            <Link
              to={"/scenplannerare/" + play.id}
              className="flex justify-between text-lg p-5 my-5 font-semibold hover:cursor-pointer hover:bg-teal-500 border rounded-2xl py-5"
            >
              Gå till scenplaneraren →
            </Link>
          </section>
        </div>
      </div>
      <div className="w-1/3">
        <h2 className="text-2xl font-bold mb-4">{play.title}</h2>

        {play.acts.length === 0 ? (
          <p>Inga akter ännu.</p>
        ) : (
          play.acts.map((act) => (
            <div key={act.id} className="mb-4">
              <h3 className="font-semibold">{act.title}</h3>
              {act.scenes.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {act.scenes.map((scene) => (
                    <li key={scene.id}>{scene.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 ml-2">Inga scener ännu.</p>
              )}
            </div>
          ))
        )}

        <div className="mt-10">
          <h3 className="text-lg font-semibold">Roller</h3>
          <ul className="mt-2">
            {play.roles.map((role) => (
              <li key={role.id} className="bg-red-200 px-3 py-1 rounded my-1">
                {role.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
