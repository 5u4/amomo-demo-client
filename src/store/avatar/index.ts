import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "..";
import { createImmerReducer, IAction } from "../../hooks/createImmerReducer";
import { avatarCases } from "./reducer";
import { avatarState } from "./state";
import {
  AvatarAction,
  AvatarCases,
  IAvatarPayload,
  IAvatarState,
} from "./types";

export const avatarReducer = createImmerReducer<AvatarCases, IAvatarState>(
  avatarCases,
  avatarState
);

export const useAvatarSelector = () =>
  useSelector<AppState, IAvatarState>(s => s.avatar);

export const useAvatarDispatch = () =>
  useDispatch<Dispatch<IAction<AvatarAction, IAvatarPayload>>>();
