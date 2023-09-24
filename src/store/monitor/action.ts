/**
 * 1. Get List Project.
 * 2. Get List Farm.
 * 3. Get List Monitor.
 * 4. Mutation CreateOrUpdateProject.
 *
 * Manage monitor pages:
 * 1. No Project: Create Project.
 * 2. List Project: Create Project, Edit Project, Remove Project.
 * 3. List Farm + List Monitor.
 * Type, Name, Host, Port, Status, Last Run, actions
 *
 * JSONString?
 */

import {
  AccountQueryUnionType,
  ProjectDeleteInput,
  ProjectInput,
} from "@/graphql/generated";
import {
  CREATE_OR_UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_USER_INFO_INVITATION,
  GET_USER_INFO_MONITOR,
  SET_USER_INFO_INVITATION,
  SET_USER_INFO_MONITOR,
} from "./actionTypes";

export const getUserInfoMonitor = (): any => ({
  type: GET_USER_INFO_MONITOR,
});

export const setUserInfoMonitor = (data: AccountQueryUnionType): any => ({
  type: SET_USER_INFO_MONITOR,
  payload: data,
});

export const getUserInfoInvitation = (): any => ({
  type: GET_USER_INFO_INVITATION,
});

export const setUserInfoInvitation = (data: AccountQueryUnionType): any => ({
  type: SET_USER_INFO_INVITATION,
  payload: data,
});

export const createOrUpdateProject = (data: ProjectInput): any => ({
  type: CREATE_OR_UPDATE_PROJECT,
  payload: data,
});

export const deleteProject = (data: ProjectDeleteInput): any => ({
  type: DELETE_PROJECT,
  payload: data,
});
