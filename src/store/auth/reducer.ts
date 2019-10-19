import { server } from "../../api/server";
import { ActionFunction, AuthCases } from "./types";

let authorizationNumber: number;

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
  server.interceptors.request.eject(authorizationNumber);
  authorizationNumber = server.interceptors.request.use(req => {
    req.headers.Authorization = payload.token;
    return req;
  });
};

export const authCases: AuthCases = {
  SET_USER: setUser,
  SET_TOKEN: setToken,
};
