import React, { useEffect } from "react";
import { useMeQuery } from "../../graphql/auth";
import { useAuthDispatch } from "../../store/auth";

export const SetAccessToken: React.FC = () => {
  const dispatch = useAuthDispatch();
  const { data } = useMeQuery();

  useEffect(() => {
    if (!data || !data.me || !data.me.token) {
      return;
    }

    const { id, email, username, token } = data.me;
    dispatch({ type: "SET_USER", payload: { id, username, email } });
    dispatch({ type: "SET_TOKEN", payload: { token } });
  }, [data, dispatch]);

  return <></>;
};
