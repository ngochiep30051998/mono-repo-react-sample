import { IResponse } from '../interfaces/common.interface';
import {
  IRole,
  IReqGetRoles,
  IReqCreateRole,
  IReqAssignRole,
} from '../interfaces/roles.interface';

export type RoleState = {
  error: unknown;
  isLoading: boolean;
  roles: IRole[];
};
export type RoleAction = {
  getRoles: (req: IReqGetRoles) => Promise<void>;
  createRole: (req: IReqCreateRole) => Promise<IResponse<unknown>>;
  assignRole: (req: IReqAssignRole) => Promise<IResponse<unknown>>;
  resetRoleStore: () => void;
};
export type RoleStore = RoleState & RoleAction;
