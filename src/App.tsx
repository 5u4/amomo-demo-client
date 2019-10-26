import React from "react";
import { SetAccessToken } from "./components/auth/SetAccessToken";
import { Posts } from "./components/post/Posts";

export const App: React.FC = () => {
  return (
    <>
      <SetAccessToken />
      <Posts />
    </>
  );
};
