import { Draft } from "immer";
import { Cases } from "../../hooks/createImmerReducer";

export interface IAuthState {
  id?: string;
  username?: string;
  email?: string;
  token?: string;
}

export interface IAuthPayload {
  id?: string;
  username?: string;
  email?: string;
  token?: string;
}

export type AuthAction = "SET_USER" | "SET_TOKEN";

export type ActionFunction = (
  d: Draft<IAuthState>,
  payload: IAuthPayload
) => void;

export type AuthCases = Cases<IAuthState> &
  { [_ in AuthAction]: ActionFunction };
