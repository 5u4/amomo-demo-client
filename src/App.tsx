import React from "react";
import { Provider } from "react-redux";
import { Artboard } from "./components/artboard/Artboard";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { SetAccessToken } from "./components/auth/SetAccessToken";
import { AvatarBuilder } from "./components/avatar/AvatarBuilder";
import { store } from "./store";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SetAccessToken />
      <Artboard />
      <Login />
      <Register />
      <AvatarBuilder />
    </Provider>
  );
};
