import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
  ownerAc,
  memberAc,
} from "better-auth/plugins/organization/access";
import { forbidden } from "next/navigation";

const statement = {
  ...defaultStatements,
  project: ["create", "update", "delete"],
  task: ["create", "update", "delete", "assign"],
  comment: ["create", "delete"],
  billing: ["manage"],
} as const;

export const ac = createAccessControl(statement);

const viewer = ac.newRole({ project: [], task: [], comment: [] });

export const member = ac.newRole({
  ...memberAc.statements,
  project: ["create", "update"],
  task: ["create", "update", "assign"],
  comment: ["create"],
});

export const admin = ac.newRole({
  ...adminAc.statements,
  project: ["create", "update", "delete"],
  task: ["create", "update", "delete", "assign"],
  comment: ["create", "delete"],
});

export const owner = ac.newRole({
  ...ownerAc.statements,
  project: ["create", "update", "delete"],
  task: ["create", "update", "delete", "assign"],
  comment: ["create", "delete"],
  billing: ["manage"],
});

export const roles = { owner, admin, member, viewer };
export type WorkspaceRole = keyof typeof roles;

type Permissions = {
  [K in keyof typeof statement]?: (typeof statement)[K][number][];
};

export function can(role: string, permissions: Permissions): boolean {
  return role.split(",").some((r) => {
    const def = roles[r.trim() as WorkspaceRole];
    return def ? def.authorize(permissions as never).success : false;
  });
}

export function assertCan(role: string, permissions: Permissions) {
  if (!can(role, permissions)) forbidden();
}
