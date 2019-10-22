import React, { useEffect } from "react";
import { meApi } from "../../api/auth/me";
import { useAuthDispatch } from "../../store/auth";

export const SetAccessToken: React.FC = () => {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    meApi().then(res => {
      const { id, username, email } = res.data.data;
      const { token } = res.data;
      dispatch({ type: "SET_USER", payload: { id, username, email } });
      dispatch({ type: "SET_TOKEN", payload: { token } });
    });
  }, [dispatch]);

  return <></>;
};
