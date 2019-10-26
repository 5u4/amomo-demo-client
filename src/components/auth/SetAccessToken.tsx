import { useQuery } from "@apollo/react-hooks";
import React, { useEffect } from "react";
import { ME_QUERY } from "../../graphql/auth";
import { useAuthDispatch } from "../../store/auth";

export const SetAccessToken: React.FC = () => {
  const dispatch = useAuthDispatch();
  const { data } = useQuery(ME_QUERY);

  useEffect(() => {
    if (!data || !data.me) {
      return;
    }

    const { id, email, username, token } = data.me;
    dispatch({ type: "SET_USER", payload: { id, username, email } });
    dispatch({ type: "SET_TOKEN", payload: { token } });
  }, [data, dispatch]);

  return <></>;
};
