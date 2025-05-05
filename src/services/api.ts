import { Play } from "../interfaces";

const API_URL_PG: string = import.meta.env.VITE_API_URL_PG;
//const API_URL_MONGO: string = import.meta.env.VITE_API_URL_MONGO;

export const fetchPGPlayData = async (): Promise<Play[]> => {
  const response = await fetch(`${API_URL_PG}/play`);
  const data: Play[] = await response.json();

  return data;
};
