import React from "react";
import { useLogoutMutation } from "../../graphql/auth";
import { useAuthDispatch } from "../../store/auth";

export const Logout: React.FC = () => {
  const dispatch = useAuthDispatch();
  const [logout] = useLogoutMutation();

  const onClick = () => {
    dispatch({ type: "LOGOUT" });
    logout();
  };

  return (
    <div className="menu-dropdown" onClick={onClick}>
      Logout
    </div>
  );
};
