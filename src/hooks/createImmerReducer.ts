import produce, { Draft } from "immer";
import { Reducer } from "redux";

type Action = any;
type Payload = any;

export interface IAction<T = any, U = any> {
  type: T;
  payload?: U;
}

export type Cases<T> = {
  [_ in Action]: (d: Draft<T>, payload: Payload) => void;
};

export const createImmerReducer: <T, U extends IAction, V extends Cases<T>>(
  cases: V,
  initialState: T
) => Reducer<T, U> = (cases, initialState) => (state = initialState, action) =>
  produce(state, draft => {
    if (cases[action.type]) {
      cases[action.type](draft, action.payload);
    }
  });
