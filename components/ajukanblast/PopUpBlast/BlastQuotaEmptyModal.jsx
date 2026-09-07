"use client";

import useModal from "@/lib/useModal";
import { AlertCircle } from "lucide-react";

export default function BlastQuotaEmptyModal({ isOpen, onClose }) {
  // Hook harus dipanggil sebelum early return (aturan hooks React)
  useModal({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="blast-quota-empty-title"
        className="
          relative
          z-10
          w-[90%]
          max-w-[410px]
          rounded-[18px]
          bg-white
          px-5
          md:px-8
          pb-6
          pt-7
          text-center
          shadow-[0_10px_40px_rgba(0,0,0,0.2)]
        "
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#FEF3C7] text-[#D97706]">
            <AlertCircle className="h-[52px] w-[52px]" />
          </div>
        </div>

        {/* Title */}
        <h2
          id="blast-quota-empty-title"
          className="mt-4 text-[18px] font-bold text-[#111827]"
        >
          Kuota Campaign Habis!
        </h2>

        {/* Description */}
        <p className="mx-auto mt-2 max-w-[330px] text-center text-[12px] leading-[18px] text-[#6b7280]">
          Sisa pengajuan kamu bulan ini adalah <span className="font-bold text-[#DC2626]">0</span>.
          <br />
          Kamu harus menunggu periode berikutnya untuk mendapatkan kuota campaign blast.
        </p>

        {/* Info Box */}
        <div className="mt-4 rounded-[12px] border border-[#FDE68A] bg-[#FFFBEB] p-3 text-[11px] leading-[16px] text-[#854D0E]">
          <p className="font-semibold">Harus Nunggu Kuota Campaign</p>
          <p className="mt-0.5 text-[10px] text-[#92400E]">
            Setiap mitra mendapatkan jatah kuota pengajuan per periode. Silakan cek kembali di bulan berikutnya.
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 h-[42px] w-full rounded-[8px] bg-[#2463c3] text-[13px] font-medium text-white transition hover:bg-[#1d56ac]"
        >
          Saya Mengerti
        </button>
      </div>
    </div>
  );
}
