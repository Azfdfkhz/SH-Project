import { UserRound, Phone, Hash, CalendarDays } from "lucide-react";

const icons = {
  user: UserRound,
  phone: Phone,
  hash: Hash,
  calendar: CalendarDays,
};

export default function FormInput({
  label,
  placeholder,
  type = "text",
  icon,
  value = "",
  onChange,
}) {
  const Icon = icons[icon];

  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold text-[#374151]">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="
            h-[38px]
            w-full
            rounded-[8px]
            border
            border-[#d6dbe1]
            bg-white
            px-3
            pr-10
            text-[11px]
            text-[#374151]
            placeholder:text-[#9ba5b5]
            outline-none
            transition
            focus:border-[#2364bd]
          "
        />

        {Icon && (
          <Icon
            size={15}
            strokeWidth={2}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-[#9ba5b2]
            "
          />
        )}
      </div>
    </div>
  );
}
