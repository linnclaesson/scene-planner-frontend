import { useEffect, useState } from "react";
import { fetchPGActors, postPGActor } from "../services/api";
import { Actor } from "../interfaces";
import { ActorForm } from "../components/ActorForm";

export const ActorPage = () => {
  const [actors, setActors] = useState<Actor[]>([]);

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    const data = await fetchPGActors();
    setActors(data);
  };

  const handleAddActor = async (actorData: { name: string }) => {
    try {
      await postPGActor(actorData);
      fetchActors();
    } catch (error) {
      console.error("Fel vid tillägg av actor:", error);
    }
  };

  return (
    <section className="bg-neutral-50 min-h-screen p-20 flex justify-around">
      <div className="w-1/2">
        <ActorForm onSubmit={handleAddActor} />
      </div>
      <div className="w-1/3">
        <h2 className="text-2xl font-bold mb-4">Scenisar</h2>
        {actors.length === 0 ? (
          <p>Inga scenisar inlagda ännu.</p>
        ) : (
          actors.map((actor) => (
            <div key={actor.id} className="mb-4">
              <h3 className="font-semibold bg-purple-300 px-3 py-1 rounded my-1">
                {actor.name}
              </h3>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
