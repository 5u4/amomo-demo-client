import { setAccessToken } from "../../graphql/client";
import { ActionFunction, AuthCases } from "./types";

const setUser: ActionFunction = (draft, payload) => {
  if (payload.id) {
    draft.id = payload.id;
  }
  if (payload.username) {
    draft.username = payload.username;
  }
  if (payload.email) {
    draft.email = payload.email;
  }
};

const setToken: ActionFunction = (draft, payload) => {
  if (!payload.token) {
    return;
  }
  draft.token = payload.token;
  setAccessToken(payload.token);
};

export const authCases: AuthCases = {
  SET_USER: setUser,
  SET_TOKEN: setToken,
};
