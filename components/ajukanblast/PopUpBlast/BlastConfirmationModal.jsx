"use client";

import { Rocket } from "lucide-react";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative
          z-10
          w-[410px]
          rounded-[18px]
          bg-white
          px-8
          pb-5
          pt-7
          shadow-[0_10px_40px_rgba(0,0,0,0.2)]
        "
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-[100px] w-[100px] items-center justify-center">
            <img
                src="/BlastRocketBlue.svg"
                alt="Blast Rocket"
                className="h-[85px] w-[85px]"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-2 text-center text-[18px] font-bold text-[#111827]">
          Ajukan Optimasi WhatsApp?
        </h2>

        {/* Description */}
        <p className="mx-auto mt-2 max-w-[330px] text-center text-[11px] leading-[17px] text-[#6b7280]">
          Pastikan informasi campaign yang kamu masukkan
          <br />
          sudah sesuai. Setelah diajukan, campaign akan masuk
          <br />
          ke proses review oleh tim Sharing Happiness.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex gap-7">
          <button
            type="button"
            onClick={onClose}
            className="
              h-[40px]
              flex-1
              rounded-[6px]
              border
              border-[#bfc3c8]
              bg-white
              text-[13px]
              font-medium
              text-[#252525]
              transition
              hover:bg-gray-50
            "
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              h-[40px]
              flex-[1.7]
              rounded-[6px]
              bg-[#2463c3]
              text-[13px]
              font-medium
              text-white
              transition
              hover:bg-[#1d56ac]
            "
          >
            Ajukan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}