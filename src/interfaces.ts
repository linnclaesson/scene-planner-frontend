export interface Play {
  id: string;
  title: string;
  semester: string;
  acts: Act[];
  roles: Role[];
  rehearsals: Rehearsal[];
}

export interface Role {
  id: string;
  name: string;
}

export interface Act {
  id: string;
  title: string;
  scenes: Scene[];
}

export interface Scene {
  id: string;
  name: string;
  sceneRoleAssignments: FullSceneRoleAssignment[];
}

export interface Actor {
  id: string;
  name: string;
}

export interface Rehearsal {
  id: string;
  date: string;
  scenes: Scene[];
}

export interface SceneRoleAssignment {
  actorId: string;
  roleId: string;
  sceneId: string;
}

export interface FullSceneRoleAssignment {
  id: {
    actorId: number;
    roleId: number;
    sceneId: number;
  };
  actor: Actor;
  role: Role;
}
