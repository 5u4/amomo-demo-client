import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Query, QueryPostsArgs } from "./types";

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
      createdAt
    }
  }
`;

export const usePostsQuery = (variables?: QueryPostsArgs) =>
  useQuery<Query, QueryPostsArgs>(POSTS_QUERY, { variables });
