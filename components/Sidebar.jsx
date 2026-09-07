"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  WalletCards,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    name: "Overview",
    href: "/overview",
    icon: BarChart3,
  },
  {
    name: "Tagihan",
    href: "/tagihan",
    icon: WalletCards,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Navbar + Dropdown Menu */}
      <div className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white shadow-sm md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/overview" className="text-[#263238]">
              <ArrowLeft size={22} strokeWidth={2} />
            </Link>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Logo-SH.png" alt="Sharing Happiness" className="h-6 object-contain" />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="rounded-md p-1.5 text-[#263238] transition hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu (Muncul langsung melayang di bawah Navbar) */}
        {isOpen && (
          <nav className="border-t border-gray-100 bg-white py-2 shadow-lg">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex h-[46px] items-center gap-4 px-6
                    text-[13px] font-semibold
                    transition-colors
                    ${
                      isActive
                        ? "border-l-4 border-[#2874c6] bg-[#e8f0fb] text-[#263238]"
                        : "text-[#263238] hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    strokeWidth={2.3}
                    className="text-[#2874c6]"
                  />

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Desktop Sidebar (Tampil di Layar Desktop) */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[172px] flex-col bg-white shadow-[2px_0_8px_rgba(0,0,0,0.12)] md:flex">
        {/* Header */}
        <div className="flex h-[70px] items-center px-5">
          <Link href="/overview" className="mr-4 text-[#263238]">
            <ArrowLeft size={25} strokeWidth={2} />
          </Link>

          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Logo-SH.png" alt="Sharing Happiness" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex h-[48px] items-center gap-4 px-7
                  text-[12px] font-semibold
                  transition-colors
                  ${
                    isActive
                      ? "bg-[#e8f0fb] text-[#263238]"
                      : "text-[#263238] hover:bg-gray-50"
                  }
                `}
              >
                <Icon
                  size={23}
                  strokeWidth={2.3}
                  className="text-[#2874c6]"
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
