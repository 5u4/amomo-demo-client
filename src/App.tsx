import React from "react";
import { Provider } from "react-redux";
import { Artboard } from "./components/artboard/Artboard";
import { store } from "./store";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Artboard />
    </Provider>
  );
};
