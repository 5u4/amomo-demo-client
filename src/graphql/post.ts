import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Mutation, MutationAnswerArgs, Query, QueryPostsArgs } from "./types";

const POSTS_QUERY = gql`
  query($pagination: PaginationInput) {
    posts(pagination: $pagination) {
      id
      dataUrl
      postedBy {
        username
        avatar {
          layout
          body
          mouth
          eyes
        }
      }
      solved
      createdAt
    }
  }
`;
const ANSWER_MUTATION = gql`
  mutation($input: AnswerInput!) {
    answer(input: $input)
  }
`;

export const usePostsQuery = (variables?: QueryPostsArgs) =>
  useQuery<Query, QueryPostsArgs>(POSTS_QUERY, { variables });
export const useAnswerMutation = (variables?: MutationAnswerArgs) =>
  useMutation<Mutation, MutationAnswerArgs>(ANSWER_MUTATION, { variables });
