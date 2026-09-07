"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CampaignHover({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const spaceRight = window.innerWidth - rect.right;
    const spaceBelow = window.innerHeight - rect.bottom;

    let left = rect.right + 12;
    let top = rect.top - 20;

    // Jika ruang di sebelah kanan tidak cukup (mis. pada layar kecil), posisikan di atas/bawah
    if (spaceRight < 240) {
      left = Math.max(12, rect.left);
      top = spaceBelow > 300 ? rect.bottom + 8 : Math.max(12, rect.top - 340);
    } else {
      // Posisikan melayang di samping kanan link tanpa terpotong batas layar
      top = Math.max(12, Math.min(window.innerHeight - 360, rect.top - 30));
    }

    setCoords({ top, left });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/campaign/${item.slug}`}
        className="text-[9px] text-[#777] hover:text-blue-600 cursor-pointer underline-offset-2 hover:underline"
      >
        {item.campaign}
      </Link>

      {isHovered && (
        <div
          style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
          className="fixed z-[9999] w-[217px] pointer-events-none"
        >
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.25)] border border-gray-200/80">
            {/* Image */}
            <div className="relative w-[217px] h-[220px] bg-gray-100">
              <Image
                src={item.image || "/images/Sh.png"}
                alt={item.campaign}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-3.5">
              <h3 className="text-[14px] font-bold leading-tight text-black line-clamp-2">
                {item.title || item.campaign}
              </h3>

              <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500 line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}