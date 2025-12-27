"use client";

import Image from "next/image";

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
    <div className="w-50 h-screen bg-[#1A1A1A] px-6 py-8 flex flex-col font-[family-name:var(--font-inter)]">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <Image src="/icons/logo.svg" alt="MusicGPT" width={32} height={32} />
        <span className="text-white font-medium text-[16.46px] leading-[23.77px] tracking-normal">
          MusicGPT
        </span>
      </div>

      {/* Search */}
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

      {/* Main Navigation */}
      <nav className="mb-12 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 py-2.5 px-4 rounded-full transition-all duration-200 cursor-pointer ${
              item.active ? "bg-[#FFFFFF17]" : "hover:bg-[#FFFFFF0A]"
            }`}
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={20}
              height={20}
              className={item.active ? "opacity-100" : "opacity-70"}
            />
            <span
              className={`font-medium text-sm leading-tight tracking-wide ${
                item.active ? "text-white" : "text-white/70"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Library Section */}
      <div className="flex-1">
        <h3 className="text-white/40 mb-4 px-4 text-xs tracking-wider font-semibold">
          Library
        </h3>
        <nav className="space-y-2">
          {libraryItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 py-2.5 px-4 rounded-full hover:bg-[#FFFFFF0A] transition-all duration-200 cursor-pointer"
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                className="opacity-70"
              />
              <span className="text-white/70 font-medium text-sm leading-tight tracking-wide">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
