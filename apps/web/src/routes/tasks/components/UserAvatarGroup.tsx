// src/components/UserAvatarGroup.tsx

import React from "react";
import UserAvatar from "./UserAvatar";

interface UserAvatarGroupProps {
  users: { id: number; userName: string }[];
  size?: number;
}

const UserAvatarGroup: React.FC<UserAvatarGroupProps> = ({ users, size }) => {
  return (
    <div className="flex items-center gap-2">
      {users.map((u) => (
        <UserAvatar key={u.id} name={u.userName} size={size} />
      ))}
    </div>
  );
};

export default UserAvatarGroup;
