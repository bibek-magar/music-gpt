export default function PromotionalBanner() {
  return (
    <div
      className="rounded-[16px] flex flex-col px-4 py-3"
      style={{
        background:
          "linear-gradient(233.67deg, rgba(48, 7, 255, 0.29) -2.43%, rgba(209, 40, 150, 0.271346) 58.32%, rgba(255, 86, 35, 0.25) 98.83%), linear-gradient(0deg, var(--Shades-Primary-200, #1D2125), var(--Shades-Primary-200, #1D2125))",
      }}
    >
      <h3 className="text-white font-semibold text-[12px] mb-1">
        Model v6 Pro is here!
      </h3>
      <p className="text-text-secondary font-normal text-[12px]">
        Pushing boundaries to the world&apos;s best AI music model
      </p>
    </div>
  );
}
