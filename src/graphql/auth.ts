import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Mutation,
  MutationLoginArgs,
  MutationRegisterArgs,
  Query,
} from "./types";

const ME_QUERY = gql`
  {
    me {
      id
      username
      email
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation($payload: LoginInput!) {
    login(payload: $payload) {
      id
      username
      email
      token
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation($payload: RegisterInput!) {
    register(payload: $payload) {
      id
      email
      username
      token
    }
  }
`;

export const useMeQuery = () => useQuery<Query>(ME_QUERY);
export const useLoginMutation = (variables?: MutationLoginArgs) =>
  useMutation<Mutation, MutationLoginArgs>(LOGIN_MUTATION, { variables });
export const useRegisterMutation = (variables?: MutationRegisterArgs) =>
  useMutation<Mutation, MutationRegisterArgs>(REGISTER_MUTATION, { variables });
