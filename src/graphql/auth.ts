import gql from "graphql-tag";

export const ME_QUERY = gql`
  {
    me {
      id
      username
      email
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(payload: { username: $username, password: $password }) {
      id
      username
      email
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(
      payload: { username: $username, email: $email, password: $password }
    ) {
      id
      email
      username
      token
    }
  }
`;
