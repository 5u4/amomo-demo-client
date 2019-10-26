import ApolloClient from "apollo-boost";

let accessToken: string | undefined;

export const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_BASE_URL,
  credentials: "include",
  request: operation => {
    if (!accessToken) {
      return;
    }

    operation.setContext({
      headers: {
        Authorization: accessToken,
      },
    });
  },
});

export const setAccessToken = (token: string) => {
  accessToken = token;
};
