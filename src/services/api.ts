import { Act, Actor, Play } from "../interfaces";

const API_URL_PG: string = import.meta.env.VITE_API_URL_PG;

// PLAY
export const fetchPGPlayData = async (): Promise<Play[]> => {
  const response = await fetch(`${API_URL_PG}/play`);
  const data: Play[] = await response.json();

  return data;
};

export const fetchPGPlayById = async (id: string): Promise<Play> => {
  const response = await fetch(`${API_URL_PG}/play/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch play");
  }
  return response.json();
};

export const postPGPlay = async (
  play: Omit<Play, "id" | "acts" | "roles">,
): Promise<Play> => {
  const response = await fetch(`${API_URL_PG}/play`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(play),
  });
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }
  const createdPlay: Play = await response.json();
  return createdPlay;
};

// ACT
export const fetchPGActById = async (id: string): Promise<Act> => {
  const response = await fetch(`${API_URL_PG}/act/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch act");
  }
  return response.json();
};

export const postPGAct = async (act: { title: string; playId: string }) => {
  const response = await fetch(`${API_URL_PG}/act/play/${act.playId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: act.title }),
  });
  if (!response.ok) {
    throw new Error("Something went wrong when posting act");
  }
  return response.json();
};

// SCENE
export const postPGScene = async (scene: { name: string; actId: string }) => {
  const response = await fetch(`${API_URL_PG}/scene/act/${scene.actId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: scene.name }),
  });
  if (!response.ok) {
    throw new Error("Something went wrong when posting scene");
  }
  return response.json();
};

// ROLE
export const postPGRole = async (role: { name: string; playId: string }) => {
  const response = await fetch(`${API_URL_PG}/role/play/${role.playId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: role.name }),
  });
  if (!response.ok) {
    throw new Error("Something went wrong when posting role");
  }
  return response.json();
};

// ACTORS
export const fetchPGActors = async (): Promise<Actor[]> => {
  const response = await fetch(`${API_URL_PG}/actor`);
  const data: Actor[] = await response.json();

  return data;
};

export const postPGActor = async (actorData: {
  name: string;
}): Promise<Actor> => {
  const res = await fetch(`${API_URL_PG}/actor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(actorData),
  });
  if (!res.ok) {
    throw new Error("Kunde inte lägga till actor");
  }
  return res.json();
};
