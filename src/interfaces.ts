export interface Play {
  id: string;
  title: string;
  semester: string;
  acts: Act[];
  roles: Role[];
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
  activeRoles: SceneRoleAssignment[];
}

export interface Actor {
  id: string;
  name: string;
}

export interface Rehearsal {
  id: string;
  date: Date;
  scenes: Scene[];
}

export interface SceneRoleAssignment {
  actorId: string;
  roleId: string;
  sceneId: string;
}
