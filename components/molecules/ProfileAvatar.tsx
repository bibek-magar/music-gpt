"use client";

import { useId, useState } from "react";

interface ProfileAvatarProps {
  initial: string;
  badgeCount?: number;
  size?: number; // overall size
  className?: string;
  showBadge?: boolean;
}

export default function ProfileAvatar({
  initial,
  badgeCount,
  size = 60,
  className = "",
  showBadge = true,
}: ProfileAvatarProps) {
  const [isActive, setIsActive] = useState(false);
  const gradientId = useId();
  const fontSize = Math.round(size * 0.4);
  const ringPadding = isActive ? size * 0.04 : size * 0.12;
  const strokeWidth = Math.max(1.5, size * 0.035);
  const radius = (size - strokeWidth - ringPadding * 2) / 2;

  return (
    <div
      className={`relative shrink-0 rounded-[24px] overflow-hidden bg-[#101216] transition-transform duration-200 ${className}`}
      style={{
        width: size,
        height: size,
      }}
      aria-label="Profile avatar"
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
    >
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1={size * 0.8}
            y1={size * 0.85}
            x2={size * 0.3}
            y2={size * 0.3}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C800FF" />
            <stop offset="0.305" stopColor="#FF2C9B" />
            <stop offset="0.7" stopColor="#FF7B00" />
            <stop offset="0.885" stopColor="#FF8504" />
            <stop offset="1" stopColor="#FFD363" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill={`url(#${gradientId})`}
          fillOpacity={0.08}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth * 0.35}
          stroke="white"
          strokeWidth={strokeWidth * 0.6}
          opacity={0.9}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth * 0.35}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth * 0.6}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-text-primary font-medium leading-none text-center z-10"
        style={{ fontSize, lineHeight: 1 }}
      >
        {initial}
      </span>

      {typeof badgeCount === "number" && showBadge && (
        <svg
          className="absolute top-0.5 right-0.5 w-4 h-4 z-20"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="8" fill="#6BFFAC" />
          <text
            x="8"
            y="10.5"
            textAnchor="middle"
            fill="#0B1B12"
            fontSize="9"
            fontWeight="600"
            fontFamily="inherit"
          >
            {badgeCount}
          </text>
        </svg>
      )}
    </div>
  );
}
