import { useState } from "react";
import { getPostGuessState } from "../store/storage/postState";

type TPostGuessState = "untouched" | "correct" | "incorrect";

const getInitialPostGuessState = (
  id: string,
  solved?: boolean | null
): TPostGuessState => {
  if (solved === null || solved === undefined) {
    return getPostGuessState(id) ? "correct" : "untouched";
  }

  return solved ? "correct" : "untouched";
};

export const usePostGuessState = (id: string, solved?: boolean | null) =>
  useState<TPostGuessState>(getInitialPostGuessState(id, solved));
