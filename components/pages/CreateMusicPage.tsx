"use client";

import { useEffect, useState } from "react";
import PromptInput from "../organisms/PromptInput";
import GradientBackground from "../atoms/GradientBackground";
import ProfilePopup from "../organisms/ProfilePopup";
import Sidebar from "../organisms/Sidebar";
import RecentGenerationsPanel from "../organisms/RecentGenerationsPanel";
import { useGenerationSocket } from "@/hooks/useGenerationSocket";
import ProfileAvatar from "../molecules/ProfileAvatar";
import { useGenerationStore } from "@/store/useGenerationStore";

export default function CreateMusicPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  useGenerationSocket();
  const shouldOpenProfile = useGenerationStore(
    (state) => state.shouldOpenProfile
  );
  const acknowledgeProfileIntent = useGenerationStore(
    (state) => state.acknowledgeProfileIntent
  );

  useEffect(() => {
    if (shouldOpenProfile) {
      const frame = requestAnimationFrame(() => {
        setIsProfileOpen(true);
        acknowledgeProfileIntent();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [shouldOpenProfile, acknowledgeProfileIntent]);

  return (
    <main className="flex min-h-screen bg-bg-primary font-sans">
      <Sidebar />

      <section className="flex-1 relative overflow-hidden flex flex-col ml-50">
        <GradientBackground />

        <div
          className="relative z-10 flex-1 flex items-center justify-center px-8"
          style={{ paddingTop: "254px", paddingBottom: "254px" }}
        >
          <div className="w-full max-w-5xl">
            <PromptInput />
          </div>
        </div>

        <RecentGenerationsPanel />
      </section>

      <header className="fixed top-0 right-0 z-50 p-6">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="relative w-[60px] h-[60px] hover:scale-105 transition-transform cursor-pointer"
          aria-label="Open profile menu"
        >
          <ProfileAvatar initial="J" badgeCount={2} size={60} />
        </button>
      </header>

      <ProfilePopup
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </main>
  );
}
