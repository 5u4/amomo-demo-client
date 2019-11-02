import React from "react";
import { useLogoutMutation } from "../../graphql/auth";
import { useAuthDispatch } from "../../store/auth";

export const Logout: React.FC = () => {
  const dispatch = useAuthDispatch();
  const [logout] = useLogoutMutation();

  const onClick = () => {
    dispatch({ type: "LOGOUT" });
    logout().then(() => window.location.reload());
  };

  return (
    /* eslint-disable-next-line */
    <a onClick={onClick}>
      <span className="menu-dropdown">Logout</span>
    </a>
  );
};
