import Image from "next/image";

export default function SidebarFooter() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-x-2 gap-y-1 text-[#FFFFFF80] text-[12px] leading-[146%] tracking-[0.01em] font-normal">
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

        <button className="flex items-center content-center gap-0.5text-[#FFFFFF80] hover:text-white/70 transition-colors cursor-pointer">
          <span className="text-lg">🇺🇸</span>
          <span className="text-[12px] leading-[146%] tracking-[0.01em] font-normal mx-0.5">
            EN
          </span>
          <Image src="/icons/expand.svg" alt="Expand" width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
