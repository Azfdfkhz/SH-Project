"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CampaignHover({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSide, setShowSide] = useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true);

    const rect = e.currentTarget.getBoundingClientRect();

    if (rect.top < 400) {
      setShowSide(true);
    } else {
      setShowSide(false);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowSide(false);
  };

  return (
    <div
      className={`relative inline-block ${
        isHovered ? "z-999" : "z-10"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/campaign/${item.slug}`}
        className="text-[9px] text-[#777] hover:text-blue-600 cursor-pointer"
      >
        {item.campaign}
      </Link>

      {isHovered && (
        <div
          className={`absolute z-9999 w-217px ${
            showSide
              ? "left-full top-1/2 ml-3 -translate-y-1/2"
              : "left-0 bottom-full mb-3"
          }`}
        >
          <Link href={`/campaign/${item.slug}`}>
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200 cursor-pointer">

              {/* Image */}
              <div className="relative w-[217px] h-[271px]">
                <Image
                  src={item.image}
                  alt={item.campaign}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-black">
                  {item.title || item.campaign}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </div>

            </div>
          </Link>
        </div>
      )}
    </div>
  );
}