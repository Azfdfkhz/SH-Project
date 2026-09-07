"use client";

import Link from "next/link";

export default function BlastButton({ sisaPengajuan, onClick }) {
  const handleClick = (e) => {
    if (sisaPengajuan !== undefined && Number(sisaPengajuan) <= 0) {
      e.preventDefault();
      onClick?.(e);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      href="/overview/ajukan-blast"
      onClick={handleClick}
      className="
        flex h-[82px] w-[225px]
        items-center justify-center
        gap-4
        rounded-[11px]
        bg-[#064bc7]
        px-5
        text-white
        no-underline
        transition
        hover:bg-[#0644b4]
        active:scale-[0.98]
        cursor-pointer
      "
    >
      <div className="flex h-[48px] w-[48px] items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/BlastRocket.svg"
          alt="Blast Rocket"
          className="h-[45px] w-[45px]"
        />
      </div>

      <div className="text-left">
        <p className="text-[17px] font-semibold leading-tight text-white">
          Ajukan Blast
        </p>
        <p className="text-[17px] font-semibold leading-tight text-white">
          Sekarang
        </p>
      </div>
    </Link>
  );
}