export default function PromotionalBanner() {
  return (
    <div
      className="rounded-xl flex flex-col opacity-100 px-3 py-2.5 h-[94px]"
      style={{
        background: `linear-gradient(233.67deg, rgba(48, 7, 255, 0.29) -2.43%, rgba(209, 40, 150, 0.271346) 58.32%, rgba(255, 86, 35, 0.25) 98.83%), linear-gradient(0deg, #1D2125, #1D2125)`,
      }}
    >
      <h3 className="text-white font-semibold text-[12px] leading-[146%] tracking-[0.01em]">
        Model v6 Pro is here!
      </h3>
      <p className="text-[#FFFFFFA3] font-normal text-[12px] leading-[146%] tracking-[0.01em] mt-0.5">
        Pushing boundaries to the world&apos;s best AI music model
      </p>
    </div>
  );
}
