"use client";

export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative z-10 w-[420px] rounded-[16px] bg-white p-7 shadow-xl text-center">
        {/* Title */}
        <h2 className="text-[20px] font-bold text-[#111827]">
          Pengajuan Berhasil Dikirim!
        </h2>

        {/* Description */}
        <p className="mt-2 text-[12px] leading-[18px] text-[#6b7280]">
          Pengajuan Optimasi WhatsApp kamu telah berhasil
          <br />
          dikirim dan sedang menunggu review dari tim
          <br />
          Sharing Happiness.
        </p>

        {/* Status Card */}
        <div className="mt-5 rounded-[12px] bg-[#f5f5f5] p-4 border border-[#f5f5f5]/60">
          <p className="text-[12px] text-[#9F9F9F]">Status Pengajuan:</p>
            <p className="mt-1 mx-auto w-fit rounded-[16px] px-3 bg-[#FFF6D3] text-[13px] font-semibold text-[#E88C0C]">
            Menunggu Review
            </p>
          <p className="mt-3 text-[11px] leading-[16px] text-[#9F9F9F]">
            Kami akan segera meninjau pengajuanmu dan
            <br />
            menghubungi jika ada informasi lebih lanjut.
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 h-[42px] w-full rounded-[8px] bg-[#2463c3] text-[14px] font-medium text-white transition hover:bg-[#1d56ac]"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}