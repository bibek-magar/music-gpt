import Image from "next/image";

export default function SidebarFooter() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-x-2 gap-y-1 text-text-tertiary text-[12px] tracking-01 font-normal">
        <button className="hover:text-white/70 transition-colors cursor-pointer">
          Pricing
        </button>
        <button className="hover:text-white/70 transition-colors cursor-pointer">
          Affiliate
        </button>
        <button className="hover:text-white/70 transition-colors cursor-pointer">
          API
        </button>
        <button className="hover:text-white/70 transition-colors cursor-pointer">
          About
        </button>
        <button className="hover:text-white/70 transition-colors cursor-pointer">
          Terms
        </button>
        <button className="hover:text-white/70 transition-colors cursor-pointer">
          Privacy
        </button>
        <button className="flex items-center gap-0.5 text-text-tertiary hover:text-white/70 transition-colors cursor-pointer">
          <Image
            src="/icons/us.svg"
            alt="US Flag"
            width={10}
            height={10}
            className="w-3 h-3"
          />
          <span className="text-[12px] tracking-01 font-normal">EN</span>
          <Image
            src="/icons/expand.svg"
            alt="Expand"
            width={16}
            height={16}
            className="w-3 h-3"
          />
        </button>
      </div>
    </div>
  );
}
