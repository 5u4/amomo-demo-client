import { useState } from "react";
import { getPostGuessState } from "../store/storage/postState";

type TPostGuessState = "untouched" | "correct" | "incorrect";

const getInitialPostGuessState = (
  id: string,
  answer?: string | null
): TPostGuessState => {
  if (answer === null || answer === undefined) {
    return getPostGuessState(id) ? "correct" : "untouched";
  }

  return answer ? "correct" : "untouched";
};

export const usePostGuessState = (id: string, answer?: string | null) =>
  useState<TPostGuessState>(getInitialPostGuessState(id, answer));
