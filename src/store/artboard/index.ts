import { useSelector } from "react-redux";
import { AppState } from "..";
import { createImmerReducer } from "../../hooks/createImmerReducer";
import { artboardCases } from "./reducer";
import { artboardState } from "./state";
import { ArtboardCases, IArtboardState } from "./types";

export const artboardReducer = createImmerReducer<
  ArtboardCases,
  IArtboardState
>(artboardCases, artboardState);

export const useArtboardSelector = () =>
  useSelector<AppState, IArtboardState>(s => s.artboard);
