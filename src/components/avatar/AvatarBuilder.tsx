import { Card } from "antd";
import React from "react";
import { useAvatarSelector } from "../../store/avatar";
import { Avatar } from "./Avatar";
import { AvatarSelect } from "./AvatarSelect";

export const AvatarBuilder: React.FC = () => {
  const avatar = useAvatarSelector();

  const avatarSize = 64;

  return (
    <div className="flex flex-col flex-wrap items-center justify-center">
      <Card bordered={false} style={{ width: avatarSize, height: avatarSize }}>
        <Avatar
          size={avatarSize}
          body={avatar.body}
          layout={avatar.layout}
          mouth={avatar.mouth}
          eyes={avatar.eyes}
        />
      </Card>
      <AvatarSelect piece="body" />
      <AvatarSelect piece="mouth" />
      <AvatarSelect piece="eyes" />
    </div>
  );
};
