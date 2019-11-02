import React, { useState } from "react";
import { usePostsQuery } from "../../graphql/post";
import { User } from "../../graphql/types";
import { UserInfoPanel } from "../user/UserInfoPanel";
import { Post } from "./Post";

export const Posts: React.FC = () => {
  const [isUserInfoPanelOpen, setUserInfoPanelOpen] = useState(false);
  const [viewingUserData, setViewingUserData] = useState<User | undefined>(
    undefined
  );
  const { data } = usePostsQuery();

  if (!data) {
    return <></>;
  }

  return (
    <ul className="posts-container">
      <UserInfoPanel
        viewingUserData={viewingUserData}
        isUserInfoPanelOpen={isUserInfoPanelOpen}
        setUserInfoPanelOpen={setUserInfoPanelOpen}
      />
      {data.posts.map(post => (
        <li key={post.id}>
          <Post
            id={post.id}
            dataUrl={post.dataUrl}
            postedBy={post.postedBy}
            solution={post.answer}
            setUserInfoPanelOpen={setUserInfoPanelOpen}
            setViewingUserData={setViewingUserData}
          />
        </li>
      ))}
    </ul>
  );
};
