"use client";

import Image from "next/image";
import PromotionalBanner from "@/components/molecules/PromotionalBanner";
import SidebarFooter from "@/components/molecules/SidebarFooter";

interface NavButtonProps {
  icon: string;
  label: string;
  active?: boolean;
}

function NavButton({ icon, label, active = false }: NavButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 h-[37px] px-4 rounded-full transition-all duration-200 cursor-pointer ${
        active ? "bg-[#FFFFFF17]" : "hover:bg-[#FFFFFF0A]"
      }`}
    >
      <Image
        src={icon}
        alt={label}
        width={20}
        height={20}
        className={active ? "opacity-100" : "opacity-70"}
      />
      <span
        className={`font-medium text-sm leading-tight tracking-wide ${
          active ? "text-white" : "text-white/70"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

const navItems = [
  { icon: "/icons/home.svg", label: "Home", active: false },
  { icon: "/icons/create.svg", label: "Create", active: true },
  { icon: "/icons/explore.svg", label: "Explore", active: false },
];

const libraryItems = [
  { icon: "/icons/profile.svg", label: "Profile" },
  { icon: "/icons/liked.svg", label: "Liked" },
  { icon: "/icons/playlist.svg", label: "New playlist" },
];

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 w-50 h-screen bg-[#1A1A1A] px-4 pt-5 pb-4 flex flex-col font-[family-name:var(--font-inter)] overflow-y-auto z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <Image src="/icons/logo.svg" alt="MusicGPT" width={32} height={32} />
        <span className="text-white font-medium text-[16.46px] leading-[23.77px] tracking-normal">
          MusicGPT
        </span>
      </div>

      <button className="mb-8 w-[146px] h-[37px] bg-transparent rounded-[30px] border border-[#FFFFFF29] flex items-center justify-between px-4 py-[3px] opacity-100 hover:border-white/40 hover:bg-[#FFFFFF0A] transition-colors cursor-pointer group">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/search.svg"
            alt="Search"
            width={18}
            height={18}
            className="opacity-50"
          />
          <span className="text-white/50 text-sm font-normal group-hover:text-white/70 transition-colors">
            Search
          </span>
        </div>
        <span className="text-white/30 text-xs font-medium">⌘K</span>
      </button>

      <nav className="mb-8 space-y-[3px]">
        {navItems.map((item) => (
          <NavButton
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.active}
          />
        ))}
      </nav>

      {/* Library Section */}
      <div className="mb-8">
        <h3 className="text-white/40 mb-4 px-4 text-[14px] leading-[31px] tracking-[0.02em] font-medium">
          Library
        </h3>
        <nav className="space-y-[3px]">
          {libraryItems.map((item) => (
            <NavButton key={item.label} icon={item.icon} label={item.label} />
          ))}
        </nav>
      </div>

      <div className="flex-1" />

      <div className="mb-4">
        <PromotionalBanner />
      </div>

      <SidebarFooter />
    </div>
  );
}
