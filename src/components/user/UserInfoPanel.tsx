import { Card, Divider, Drawer, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useUserPostsLazyQuery } from "../../graphql/post";
import { User } from "../../graphql/types";
import { Avatar } from "../avatar/Avatar";

interface IProps {
  isUserInfoPanelOpen: boolean;
  setUserInfoPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  viewingUserData: User | undefined;
}

const DEFAULT_DRAWER_MAX_WIDTH = 480;

export const UserInfoPanel: React.FC<IProps> = ({
  isUserInfoPanelOpen,
  setUserInfoPanelOpen,
  viewingUserData,
}) => {
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(
    undefined
  );
  const [getUserPosts, { data }] = useUserPostsLazyQuery();

  useEffect(() => {
    if (!isUserInfoPanelOpen || !viewingUserData) {
      return;
    }

    getUserPosts({
      variables: { filter: { postedByUserId: viewingUserData.id } },
    });
    setCurrentUserId(viewingUserData.id);
  }, [getUserPosts, isUserInfoPanelOpen, viewingUserData, currentUserId]);

  const avatarSize = 76;

  const drawerContent = viewingUserData && (
    <div className="flex flex-col items-center justify-center">
      <Card bordered={false} style={{ width: avatarSize, height: avatarSize }}>
        <Avatar
          size={avatarSize}
          layout={viewingUserData.avatar.layout}
          body={viewingUserData.avatar.body}
          mouth={viewingUserData.avatar.mouth}
          eyes={viewingUserData.avatar.eyes}
        />
      </Card>
      <Typography.Text strong>{viewingUserData.username}</Typography.Text>
      <Divider />
      {data &&
        data.posts &&
        data.posts.map(post => (
          <Card
            key={post.id}
            className="post-card"
            bodyStyle={{ padding: 0 }}
            cover={
              <img
                src={process.env.REACT_APP_SERVER_BASE_URL + post.dataUrl}
                alt="Post"
                draggable={false}
              />
            }
          ></Card>
        ))}
    </div>
  );

  return (
    <Drawer
      width={Math.min(DEFAULT_DRAWER_MAX_WIDTH, window.innerWidth)}
      onClose={() => setUserInfoPanelOpen(false)}
      visible={isUserInfoPanelOpen}
    >
      {drawerContent}
    </Drawer>
  );
};
