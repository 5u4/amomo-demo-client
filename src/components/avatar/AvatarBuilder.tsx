import React from "react";
import { useAvatarSelector } from "../../store/avatar";
import { Avatar } from "./Avatar";
import { AvatarSelect } from "./AvatarSelect";

export const AvatarBuilder: React.FC = () => {
  const avatar = useAvatarSelector();

  return (
    <div>
      <Avatar
        body={avatar.body}
        layout={avatar.layout}
        mouth={avatar.mouth}
        eyes={avatar.eyes}
      />
      <AvatarSelect piece="body" />
      <AvatarSelect piece="mouth" />
      <AvatarSelect piece="eyes" />
    </div>
  );
};
