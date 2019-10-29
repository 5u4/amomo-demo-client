import React, { useState } from "react";
import { SetAccessToken } from "./components/auth/SetAccessToken";
import { AppMenu } from "./components/control/AppMenu";
import { Posts } from "./components/post/Posts";

export const App: React.FC = () => {
  const [authCompleted, setAuthCompeleted] = useState(false);

  return authCompleted ? (
    <>
      <AppMenu />
      <Posts />
    </>
  ) : (
    <SetAccessToken setAuthCompeleted={setAuthCompeleted} />
  );
};
