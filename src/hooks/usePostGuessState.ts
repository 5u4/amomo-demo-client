import { useState } from "react";
import { getPostGuessState } from "../store/storage/postState";

type TPostGuessState = "untouched" | "correct" | "incorrect";

export const usePostGuessState = (id: string, solved?: boolean | null) =>
  useState<TPostGuessState>(
    solved !== true
      ? getPostGuessState(id)
        ? "correct"
        : "untouched"
      : "correct"
  );
