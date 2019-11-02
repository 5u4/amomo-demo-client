import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import { usePostsQuery } from "../../graphql/post";
import { User } from "../../graphql/types";
import { UserInfoPanel } from "../user/UserInfoPanel";
import { Post } from "./Post";

const DEFAULT_LOAD_POST_LIMIT = 28;
const FETCH_MORE_WHEN_LAST = 8;

export const Posts: React.FC = () => {
  const [hasMore, setHasMore] = useState(true);
  const [isUserInfoPanelOpen, setUserInfoPanelOpen] = useState(false);
  const [viewingUserData, setViewingUserData] = useState<User | undefined>(
    undefined
  );
  const { data, fetchMore } = usePostsQuery({
    pagination: { limit: DEFAULT_LOAD_POST_LIMIT },
  });

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
      {data.posts.map((post, index) => (
        <li key={post.id}>
          <Post
            id={post.id}
            dataUrl={post.dataUrl}
            postedBy={post.postedBy}
            solution={post.answer}
            setUserInfoPanelOpen={setUserInfoPanelOpen}
            setViewingUserData={setViewingUserData}
          />
          {index === data.posts.length - FETCH_MORE_WHEN_LAST && (
            <Waypoint
              onEnter={() =>
                hasMore &&
                fetchMore({
                  variables: {
                    pagination: { limit: DEFAULT_LOAD_POST_LIMIT },
                    filter: {
                      before: data.posts[data.posts.length - 1].createdAt,
                    },
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (
                      !fetchMoreResult ||
                      fetchMoreResult.posts.length === 0
                    ) {
                      setHasMore(false);
                      return prev;
                    }

                    return {
                      ...data,
                      __typename: "Query",
                      posts: [...data.posts, ...fetchMoreResult.posts],
                    };
                  },
                })
              }
            />
          )}
        </li>
      ))}
    </ul>
  );
};
