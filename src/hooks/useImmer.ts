// https://github.com/immerjs/use-immer/blob/master/src/index.ts
import produce, { Draft } from "immer";
import { useCallback, useState } from "react";

export function useImmer<S = any>(
  initialValue: S | (() => S)
): [S, (f: (draft: Draft<S>) => void | S) => void];

export function useImmer(initialValue: any) {
  const [val, updateValue] = useState(initialValue);
  return [
    val,
    useCallback(updater => {
      updateValue(produce(updater));
    }, []),
  ];
}
