import { useState } from "react";
import { Play } from "../interfaces";
import { fetchPGPlayData } from "../services/api";

export const ScenePlanner = () => {
  const [response, setResponse] = useState<Play[]>([]);

  const getPlays = async (): Promise<void> => {
    const data = await fetchPGPlayData();
    setResponse(data);
  };

  return (
    <section className="bg-neutral-50 h-full">
      <button
        onClick={getPlays}
        className="bg-teal-400 p-5 hover:cursor-pointer"
      >
        Hämta uppsättningar
      </button>
      <div>
        {response.length > 0 ? (
          response.map((play) => (
            <div key={play.id}>
              Id: {play.id}, Uppsättning: {play.title}, {play.semester}
            </div>
          ))
        ) : (
          <div>Inga uppsättningar hittades</div>
        )}
      </div>
    </section>
  );
};
