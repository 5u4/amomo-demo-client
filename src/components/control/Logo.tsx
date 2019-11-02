import React from "react";

export const Logo: React.FC = () => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center p-4">
      <img alt="icon" src="/img/logo.png" style={{ width: 150 }} />
    </div>
  );
};
