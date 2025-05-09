import {
  Act,
  Actor,
  Play,
  Rehearsal,
  SceneRoleAssignment,
} from "../interfaces";

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

export const getScenesByPlayId = async (playId: string) => {
  const response = await fetch(`${API_URL_PG}/scene/play/${playId}`);
  if (!response.ok) {
    throw new Error("Something went wrong when fetching scenes by playId");
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

// SCENE ROLE ASSIGNMENTS
export const postPGSceneRoleAssignment = async (
  assignment: SceneRoleAssignment,
): Promise<SceneRoleAssignment> => {
  const response = await fetch(`${API_URL_PG}/assignments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assignment),
  });

  if (!response.ok) {
    throw new Error("Kunde inte lägga till scene-role-assignment");
  }

  return response.json();
};

// REHEARSAL
export const fetchPGRehearsalsByPlayId = async (
  playId: string,
): Promise<Rehearsal[]> => {
  const res = await fetch(`${API_URL_PG}/rehearsal/play/${playId}`);
  if (!res.ok) {
    throw new Error("Kunde inte hämta rep för denna pjäs");
  }
  return res.json();
};

export const postPGRehearsal = async (
  playId: string,
  rehearsalData: { date: string },
): Promise<Rehearsal> => {
  const res = await fetch(`${API_URL_PG}/rehearsal/play/${playId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rehearsalData),
  });
  if (!res.ok) {
    throw new Error("Kunde inte skapa repetition");
  }
  return res.json();
};

export const deletePGRehearsal = async (rehearsalId: string): Promise<void> => {
  const res = await fetch(`${API_URL_PG}/rehearsal/delete/${rehearsalId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Kunde inte ta bort repetition");
  }
};

export const addSceneToPGRehearsal = async (
  rehearsalId: string,
  sceneId: string,
): Promise<Rehearsal> => {
  const res = await fetch(
    `${API_URL_PG}/rehearsal/${rehearsalId}/scene/${sceneId}`,
    {
      method: "PUT",
    },
  );
  if (!res.ok) {
    throw new Error("Kunde inte lägga till scen till repetition");
  }
  return res.json();
};

export const removeSceneFromPGRehearsal = async (
  rehearsalId: string,
  sceneId: string,
): Promise<void> => {
  const res = await fetch(
    `${API_URL_PG}/rehearsal/${rehearsalId}/scene/${sceneId}`,
    {
      method: "DELETE",
    },
  );
  if (!res.ok) {
    throw new Error("Kunde inte ta bort scen från repetition");
  }
};
