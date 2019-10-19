import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { createImmerReducer, IAction } from "../../hooks/createImmerReducer";
import { authCases } from "./reducer";
import { authState } from "./state";
import { AuthAction, AuthCases, IAuthPayload, IAuthState } from "./types";

export const authReducer = createImmerReducer<AuthCases, IAuthState>(
  authCases,
  authState
);

export const useAuthDispatch = () =>
  useDispatch<Dispatch<IAction<AuthAction, IAuthPayload>>>();
