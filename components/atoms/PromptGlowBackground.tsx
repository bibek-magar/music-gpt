"use client";

import { useId, useMemo } from "react";

type PromptGlowBackgroundProps = {
  images: readonly [string, string, string];
  radiusPx?: number;
  thicknessPx?: number;
  thicknessHorizontalPx?: number;
  durationMs?: number;
  className?: string;
};

export default function PromptGlowBackground({
  images,
  radiusPx = 32,
  thicknessPx = 2,
  thicknessHorizontalPx,
  durationMs = 3600,
  className = "",
}: PromptGlowBackgroundProps) {
  const horizontalThickness = thicknessHorizontalPx ?? thicknessPx;
  const verticalThickness = thicknessPx;
  const reactId = useId();
  const sanitizedId = useMemo(
    () => reactId.replace(/[^a-zA-Z0-9]/g, ""),
    [reactId]
  );

  const baseClass = `pgb-${sanitizedId}`;
  const wrapperClass = `${baseClass}-wrap`;
  const layerClass = `${baseClass}-layer`;
  const keyframeOne = `${baseClass}-one`;
  const keyframeTwo = `${baseClass}-two`;
  const keyframeThree = `${baseClass}-three`;
  const animationDuration = `${durationMs}ms`;

  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        top: -verticalThickness,
        right: -horizontalThickness,
        bottom: -verticalThickness,
        left: -horizontalThickness,
        borderRadius: radiusPx,
        zIndex: 0,
      }}
    >
      <style jsx global>{`
        .${wrapperClass} {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: ${radiusPx}px;
          overflow: hidden;
          mix-blend-mode: screen;
          opacity: 1;
          filter: brightness(1.3) saturate(1.1);
        }

        .${layerClass} {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          animation-duration: ${animationDuration};
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes ${keyframeOne} {
          0% {
            opacity: 1;
          }
          18% {
            opacity: 1;
          }
          34% {
            opacity: 0.4;
          }
          48% {
            opacity: 0.1;
          }
          82% {
            opacity: 0.1;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes ${keyframeTwo} {
          0% {
            opacity: 0.05;
          }
          16% {
            opacity: 0.6;
          }
          33% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          66% {
            opacity: 0.1;
          }
          100% {
            opacity: 0.05;
          }
        }

        @keyframes ${keyframeThree} {
          0% {
            opacity: 0.05;
          }
          34% {
            opacity: 0.1;
          }
          49% {
            opacity: 0.6;
          }
          66% {
            opacity: 1;
          }
          82% {
            opacity: 0.45;
          }
          100% {
            opacity: 0.05;
          }
        }
      `}</style>

      <div className={wrapperClass}>
        <span
          aria-hidden="true"
          className={layerClass}
          style={{
            backgroundImage: `url(${images[0]})`,
            animationName: keyframeOne,
          }}
        />
        <span
          aria-hidden="true"
          className={layerClass}
          style={{
            backgroundImage: `url(${images[1]})`,
            animationName: keyframeTwo,
          }}
        />
        <span
          aria-hidden="true"
          className={layerClass}
          style={{
            backgroundImage: `url(${images[2]})`,
            animationName: keyframeThree,
          }}
        />
      </div>
    </div>
  );
}
