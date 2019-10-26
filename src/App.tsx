import React from "react";
import { SetAccessToken } from "./components/auth/SetAccessToken";

export const App: React.FC = () => {
  return (
    <>
      <SetAccessToken />
      <div className="content"></div>
    </>
  );
};
