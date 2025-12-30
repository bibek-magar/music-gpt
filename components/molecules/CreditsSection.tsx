import Image from "next/image";

interface CreditsSectionProps {
  current: number;
  total: number;
  onTopUp: () => void;
}

export default function CreditsSection({
  current,
  total,
  onTopUp,
}: CreditsSectionProps) {
  const normalizedTotal = total <= 0 ? 1 : total;
  const formattedCurrent = new Intl.NumberFormat().format(Math.max(0, current));
  const formattedTotal = new Intl.NumberFormat().format(normalizedTotal);

  return (
    <section className="mb-4">
      <div className="flex h-[50px] items-center justify-between rounded-[12px] bg-shades-primary-250 px-4">
        <div className="flex items-center gap-2">
          <span className="text-14 font-semibold text-shades-primary-5000">
            {formattedCurrent}/{formattedTotal} credits
          </span>
          <Image
            src="/icons/profile-header/i.svg"
            alt="Credit info"
            width={16}
            height={16}
            className="opacity-80"
          />
        </div>
        <button
          onClick={onTopUp}
          className="flex items-center gap-2 text-[14px] font-medium text-shades-primary-1000"
        >
          <span className="leading-none">Top Up</span>
          <Image
            src="/icons/profile-header/chevrolt-right.svg"
            alt="Open top up"
            width={16}
            height={16}
            className="opacity-80 w-4 h-4"
          />
        </button>
      </div>
    </section>
  );
}
