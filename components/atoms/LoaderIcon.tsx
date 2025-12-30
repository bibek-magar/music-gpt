"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const FRAME_SEQUENCE = ["0", "25", "50", "75", "90", "100"] as const;

interface LoaderIconProps {
  isActive: boolean;
  size?: number;
  interval?: number;
}

export default function LoaderIcon({
  isActive,
  size = 20,
  interval = 120,
}: LoaderIconProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      const reset = requestAnimationFrame(() => setFrameIndex(0));
      return () => cancelAnimationFrame(reset);
    }

    const id = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % FRAME_SEQUENCE.length);
    }, interval);

    return () => clearInterval(id);
  }, [isActive, interval]);

  const currentFrame = useMemo(() => FRAME_SEQUENCE[frameIndex], [frameIndex]);

  return (
    <Image
      src={`/icons/loader/${currentFrame}.svg`}
      alt="Loading"
      width={size}
      height={size}
      className="transition-opacity"
      priority={isActive}
    />
  );
}
