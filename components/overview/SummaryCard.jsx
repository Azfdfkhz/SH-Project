export default function SummaryCard({
  icon,
  title,
  value,
  description,
  variant = "blue",
}) {
  const variants = {
    green: {
      border: "border-[#65b77a]",
      iconBg: "bg-[#c9f7d9]",
      cardBg: "bg-[#F3FCF7]",
    },
    blue: {
      border: "border-[#9dbce8]",
      iconBg: "bg-[#b9d5fa]",
      cardBg: "bg-white",
    },
  };

  const style = variants[variant];

  return (
    <div
      className={`
        flex h-[82px] w-[196px]
        items-center gap-3
        rounded-[9px]
        border
        ${style.border}
        ${style.cardBg}
        px-3
      `}
    >
      {/* Icon */}
      <div
        className={`
          flex h-[40px] w-[40px]
          shrink-0 items-center justify-center
          rounded-[7px]
          ${style.iconBg}
        `}
      >
        {icon}
      </div>

      {/* Content */}
      <div>
        <p className="text-[12px] font-medium text-[#8a8a8a]">
          {title}
        </p>

        <p className="mt-[1px] text-[22px] font-bold leading-tight text-black">
          {value}
        </p>

        {description && (
          <p className="mt-[2px] text-[9px] text-[#999]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}