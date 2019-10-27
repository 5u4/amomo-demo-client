import React from "react";
import { usePostsQuery } from "../../graphql/post";
import { Post } from "./Post";

export const Posts: React.FC = () => {
  const { data } = usePostsQuery();

  if (!data) {
    return <></>;
  }

  return (
    <ul className="posts-container">
      {data.posts.map(post => (
        <li key={post.id}>
          <Post dataUrl={post.dataUrl} />
        </li>
      ))}
    </ul>
  );
};
