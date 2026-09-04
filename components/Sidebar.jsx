"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  WalletCards,
} from "lucide-react";

const menuItems = [
  {
    name: "Overview",
    href: "/",
    icon: BarChart3,
  },
  {
    name: "Tagihan",
    href: "/tagihan",
    icon: WalletCards,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[172px] flex-col bg-white shadow-[2px_0_8px_rgba(0,0,0,0.12)]">
      
      {/* Header */}
      <div className="flex h-[70px] items-center px-5">

        <Link href="/ " className="mr-4 text-[#263238]">
          <ArrowLeft size={25} strokeWidth={2} />
        </Link>

        <div>
          <img src="/images/Logo-SH.png" alt="" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex h-[48px] items-center gap-4 px-7
                text-[12px] font-semibold
                transition-colors
                ${
                  item.name === "Overview"
                    ? "bg-[#e8f0fb] text-[#263238]"
                    : "text-[#263238] hover:bg-gray-50"
                }
              `}
            >
              <Icon
                size={23}
                strokeWidth={2.3}
                className={
                  item.name === "Overview"
                    ? "text-[#2874c6]"
                    : "text-[#2874c6]"
                }
              />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}