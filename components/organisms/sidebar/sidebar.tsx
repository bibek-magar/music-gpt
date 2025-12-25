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
    <div className="w-[200px] h-full bg-[#FFFFFF08] p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <Image src="/logo.svg" alt="MusicGPT" width={32} height={32} />
        <span
          className="text-white font-medium"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "16.46px",
            lineHeight: "23.77px",
            fontWeight: 500,
            letterSpacing: "0%",
          }}
        >
          MusicGPT
        </span>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search ⌘K"
          className="w-full bg-[#FFFFFF0D] text-white/60 px-3 py-2 rounded-lg text-sm pl-10"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "14px",
            lineHeight: "31px",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        />
        <Image
          src="/icons/search.svg"
          alt="Search"
          width={20}
          height={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
        />
      </div>

      {/* Main Navigation */}
      <nav className="mb-8 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <Image src={item.icon} alt={item.label} width={20} height={20} />
            <span
              className="text-white"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "14px",
                lineHeight: "31px",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Library Section */}
      <div className="flex-1">
        <h3
          className="text-white/40 mb-3 px-3"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "14px",
            lineHeight: "31px",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          Library
        </h3>
        <nav className="space-y-1">
          {libraryItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Image src={item.icon} alt={item.label} width={20} height={20} />
              <span
                className="text-white"
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "14px",
                  lineHeight: "31px",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
