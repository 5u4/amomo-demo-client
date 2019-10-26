import gql from "graphql-tag";

export const POSTS_QUERY = gql`
  query($limit: Int, $offset: Int) {
    posts(pagination: { limit: $limit, offset: $offset }) {
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
