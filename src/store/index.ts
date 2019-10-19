import { combineReducers, createStore } from "redux";
import { artboardReducer } from "./artboard";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
  artboard: artboardReducer,
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
