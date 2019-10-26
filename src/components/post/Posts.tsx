import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { POSTS_QUERY } from "../../graphql/post";
import { Post } from "./Post";

export const Posts: React.FC = () => {
  const { data } = useQuery(POSTS_QUERY);

  if (!data) {
    return <></>;
  }

  return (
    <div className="posts-container">
      {data.posts.map((post: any) => (
        <Post key={post.id} dataUrl={post.dataUrl} />
      ))}
    </div>
  );
};
