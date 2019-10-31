import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Query, QueryRandomTopicsArgs } from "./types";

const RANDOM_TOPICS_QUERY = gql`
  query {
    randomTopics {
      id
      name
    }
  }
`;

export const useRandomTopicsQuery = () =>
  useQuery<Query, QueryRandomTopicsArgs>(RANDOM_TOPICS_QUERY);
