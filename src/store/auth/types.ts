import { Draft } from "immer";
import { Cases } from "../../hooks/createImmerReducer";
import { IAvatarState } from "../avatar/types";

export interface IAuthState {
  id?: string;
  username?: string;
  email?: string;
  token?: string;
  avatar?: IAvatarState;
}

export interface IAuthPayload {
  id?: string;
  username?: string;
  email?: string;
  token?: string;
  avatar?: IAvatarState;
}

export type AuthAction =
  | "SET_USER"
  | "SET_TOKEN"
  | "SET_USER_AVATAR"
  | "LOGOUT";

export type ActionFunction = (
  d: Draft<IAuthState>,
  payload: IAuthPayload
) => void;

export type AuthCases = Cases<IAuthState> &
  { [_ in AuthAction]: ActionFunction };
