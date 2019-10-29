import React, { useEffect } from "react";
import { useMeQuery } from "../../graphql/auth";
import { useAuthDispatch } from "../../store/auth";

interface IProps {
  setAuthCompeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SetAccessToken: React.FC<IProps> = ({ setAuthCompeleted }) => {
  const dispatch = useAuthDispatch();
  const { data, error, loading } = useMeQuery();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error || !data || !data.me || !data.me.token) {
      setAuthCompeleted && setAuthCompeleted(true);
      return;
    }

    const { id, email, username, token } = data.me;
    dispatch({ type: "SET_USER", payload: { id, username, email } });
    dispatch({ type: "SET_TOKEN", payload: { token } });
    setAuthCompeleted && setAuthCompeleted(true);
  }, [data, dispatch, setAuthCompeleted, loading, error]);

  return <></>;
};
