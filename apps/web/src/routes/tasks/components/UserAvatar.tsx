// src/components/UserAvatar.tsx

import React from "react";

interface UserAvatarProps {
  name: string;
  size?: number; // tamanho opcional
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, size = 32 }) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div
      className="rounded-full bg-indigo-200 text-indigo-700 font-bold flex items-center justify-center"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
      title={name}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
