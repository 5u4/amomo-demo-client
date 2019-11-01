import React, { useState } from "react";
import { Route } from "wouter";
import { Artboard } from "./components/artboard/Artboard";
import { SetAccessToken } from "./components/auth/SetAccessToken";
import { AppMenu } from "./components/control/AppMenu";
import { DrawButton } from "./components/control/DrawButton";
import { Logo } from "./components/control/Logo";
import { Posts } from "./components/post/Posts";

export const App: React.FC = () => {
  const [authCompleted, setAuthCompeleted] = useState(false);

  return authCompleted ? (
    <>
      <AppMenu />
      <DrawButton />
      <Logo />
      <Route path="/">
        <Posts />
      </Route>
      <Route path="/draw">
        <Artboard />
      </Route>
    </>
  ) : (
    <SetAccessToken setAuthCompeleted={setAuthCompeleted} />
  );
};
