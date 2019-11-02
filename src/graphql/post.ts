import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Mutation,
  MutationAnswerArgs,
  MutationCreatePostArgs,
  Query,
  QueryPostsArgs,
} from "./types";

const POSTS_QUERY = gql`
  query($pagination: PaginationInput, $filter: PostFilterInput) {
    posts(pagination: $pagination, filter: $filter) {
      id
      dataUrl
      postedBy {
        id
        username
        avatar {
          layout
          body
          mouth
          eyes
        }
      }
      answer
      createdAt
    }
  }
`;
const ANSWER_MUTATION = gql`
  mutation($input: AnswerInput!) {
    answer(input: $input)
  }
`;
const CREATE_POST_MUTATION = gql`
  mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      dataUrl
      postedBy {
        id
        username
      }
      createdAt
    }
  }
`;
// TODO: Merge query with posts query
const USER_POSTS_QUERY = gql`
  query($pagination: PaginationInput, $filter: PostFilterInput) {
    posts(pagination: $pagination, filter: $filter) {
      id
      dataUrl
      answer
      createdAt
    }
  }
`;

export const usePostsQuery = (variables?: QueryPostsArgs) =>
  useQuery<Query, QueryPostsArgs>(POSTS_QUERY, { variables });
export const useAnswerMutation = (variables?: MutationAnswerArgs) =>
  useMutation<Mutation, MutationAnswerArgs>(ANSWER_MUTATION, { variables });
export const useCreatePostMutation = (variables?: MutationCreatePostArgs) =>
  useMutation<Mutation, MutationCreatePostArgs>(CREATE_POST_MUTATION, {
    variables,
  });
export const useUserPostsLazyQuery = (variables?: QueryPostsArgs) =>
  useLazyQuery<Query, QueryPostsArgs>(USER_POSTS_QUERY, { variables });
