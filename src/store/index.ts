import { combineReducers, createStore } from "redux";
import { artboardReducer } from "./artboard";
import { authReducer } from "./auth";
import { avatarReducer } from "./avatar";

const rootReducer = combineReducers({
  artboard: artboardReducer,
  auth: authReducer,
  avatar: avatarReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
