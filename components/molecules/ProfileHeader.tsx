import Image from "next/image";
import ProfileAvatar from "./ProfileAvatar";

interface ProfileHeaderProps {
  username: string;
  handle: string;
  initial: string;
}

export default function ProfileHeader({
  username,
  handle,
  initial,
}: ProfileHeaderProps) {
  return (
    <header className="flex items-center gap-3 mb-4">
      <ProfileAvatar
        initial={initial}
        badgeCount={2}
        size={60}
        showBadge={false}
      />
      <div className="flex-1">
        <h2 className="text-text-primary text-[16px] font-semibold">
          {username}
        </h2>
        <p className="text-text-muted text-[14px]">@{handle}</p>
      </div>
      <button className="w-8 h-8 hover:opacity-80 transition-opacity cursor-pointer">
        <Image
          src="/icons/profile-header/settings.svg"
          alt="Settings"
          width={24}
          height={24}
          className="w-full h-full"
          color="red"
        />
      </button>
    </header>
  );
}
