import { Link } from "react-router-dom";
import { fetchPGPlayData } from "../services/api";
import { Play } from "../interfaces";
import { useState, useEffect } from "react";

export const AllProductionsPage = () => {
  const [response, setResponse] = useState<Play[]>([]);

  useEffect(() => {
    const getPlays = async () => {
      const data = await fetchPGPlayData();
      setResponse(data);
    };
    getPlays();
  }, []);

  return (
    <section className="bg-neutral-50 h-full p-20 px-30 flex flex-col items-center">
      <div className="flex flex-col w-2/3 justify-around">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold pb-5">Alla uppsättningar</h1>
          <div className="content-center">
            <Link
              to="/form"
              className="bg-black text-white rounded-3xl px-6 py-3 self-end hover:bg-teal-600 hover:cursor-pointer"
            >
              Lägg in nytt spex
            </Link>
          </div>
        </div>
        <div>
          {response.length > 0 ? (
            response.map((play, index) => (
              <span key={index}>
                <Link
                  to={"/playPage/" + play.id}
                  className="flex justify-between text-lg p-5 my-5 font-semibold hover:cursor-pointer hover:bg-teal-500 border rounded-2xl py-5"
                >
                  {play.title} - {play.semester}
                </Link>
              </span>
            ))
          ) : (
            <div>Inga uppsättningar hittades</div>
          )}
        </div>
      </div>
    </section>
  );
};
