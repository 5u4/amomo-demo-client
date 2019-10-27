import React from "react";
import { SetAccessToken } from "./components/auth/SetAccessToken";
import { AppMenu } from "./components/control/AppMenu";
import { Posts } from "./components/post/Posts";

export const App: React.FC = () => {
  return (
    <>
      <AppMenu />
      <Posts />
      <SetAccessToken />
    </>
  );
};
