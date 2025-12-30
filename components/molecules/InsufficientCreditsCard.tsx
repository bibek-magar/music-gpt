import { AlertIcon } from "../atoms/ProfileIcons";
import Image from "next/image";

interface InsufficientCreditsCardProps {
  balance: number;
  onTopUp: () => void;
  onClose: () => void;
  message?: string;
}

export default function InsufficientCreditsCard({
  balance,
  onTopUp,
  onClose,
}: InsufficientCreditsCardProps) {
  return (
    <article className="relative rounded-2xl p-4 bg-[#D89C3A14] border border-white/10 backdrop-blur">
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full bg-bg-primary/60 hover:bg-bg-primary/80 transition-colors"
        aria-label="Close"
      >
        <Image src="/icons/cross.svg" alt="Close" width={24} height={24} />
      </button>

      <div className="flex items-center gap-3">
        <div className="flex items-start gap-2 flex-1">
          <div className="flex-1">
            <div className="flex items-center content-center gap-2">
              <AlertIcon className="shrink-0 text-[#D89C3A] w-5 h-5" />
              <h3 className="text-[#D89C3A] font-medium text-14">
                Insufficient credits
              </h3>
            </div>
            <p className="text-white text-12">
              Your credit balance : {balance}
            </p>
          </div>
        </div>
        <button
          onClick={onTopUp}
          className="px-4 py-2 rounded-[10px] border border-white/20 text-white text-14 font-medium hover:bg-white/10 transition-colors"
        >
          Top Up
        </button>
      </div>
    </article>
  );
}
