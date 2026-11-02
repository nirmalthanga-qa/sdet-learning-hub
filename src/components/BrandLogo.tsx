export default function BrandLogo() {
  const road =
    "M64 12 C41 16 15 27 24 40 C31 50 58 49 61 61 C65 75 35 84 15 88";

  return (
    <span className="inline-flex items-center gap-3">
      <svg
        viewBox="0 0 80 100"
        fill="none"
        aria-hidden="true"
        className="h-14 w-11 shrink-0 sm:h-16 sm:w-13"
      >
        <path
          d={road}
          stroke="#4D2A00"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <path
          d={road}
          stroke="#FFF8F0"
          strokeWidth="2.2"
          strokeDasharray="5 7"
          strokeLinecap="round"
        />

        <circle
          cx="64"
          cy="12"
          r="8"
          fill="#7B9165"
          stroke="#FFF8F0"
          strokeWidth="3"
        />

        <circle
          cx="15"
          cy="88"
          r="8"
          fill="#D3A46F"
          stroke="#FFF8F0"
          strokeWidth="3"
        />
      </svg>

      <span className="block text-accent">
        <span className="block text-[30px] font-extrabold leading-none tracking-[-0.045em] sm:text-[36px]">
          SDET
        </span>

        <span className="mt-1 block text-sm font-normal leading-tight tracking-[0.035em] sm:text-base">
          Learning Hub
        </span>
      </span>
    </span>
  );
}
