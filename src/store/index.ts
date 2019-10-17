import { combineReducers, createStore } from "redux";
import { artboardReducer } from "./artboard";

const rootReducer = combineReducers({
  artboard: artboardReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, {});
