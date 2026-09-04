import { LockKeyhole } from "lucide-react";

export default function ReadonlyInput({
  label,
  value = "Isi otomatis FE",
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1.5">
        <label className="text-[11px] font-semibold text-[#374151]">
          {label}
        </label>

        <span className="rounded-[3px] bg-[#e5e7eb] px-1.5 py-[1px] text-[8px] font-bold text-[#6b7280]">
          READONLY
        </span>
      </div>

      <div className="relative">
        <input
          type="text"
          value={value}
          readOnly
          className="
            h-[38px]
            w-full
            rounded-[8px]
            border
            border-[#e1e4e8]
            bg-[#f1f2f4]
            px-3
            pr-9
            text-[11px]
            text-[#7b8492]
            outline-none
          "
        />

        <LockKeyhole
          size={15}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ba5b2]"
        />
      </div>
    </div>
  );
}