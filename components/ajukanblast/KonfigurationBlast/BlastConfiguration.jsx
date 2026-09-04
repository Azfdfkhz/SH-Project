"use client";

import { useState } from "react";
import SectionTitle from "@/components/ajukanblast/SectionTitle";
import PosterUpload from "@/components/ajukanblast/KonfigurationBlast/PosterUpload";
import FormInput from "@/components/ajukanblast/FormInput";
import ConfirmationModal from "@/components/ajukanblast/PopUpBlast/BlastConfirmationModal";
import SuccessModal from "@/components/ajukanblast/PopUpBlast/BlastSuccessModal"

export default function BlastConfiguration() {
  const [caption, setCaption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccsesOpen, setIsSuccesOpen ] =useState(false);

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);

    // Nanti API submit bisa ditaruh di sini
    console.log("Campaign diajukan");

    setIsSuccesOpen(true);
  };

  return (
    <>
      <section className="mt-7">
        <SectionTitle
          number="3"
          title="Konfigurasi Blast"
        />

        <PosterUpload />

        {/* Caption */}
        <div className="mt-3">
          <label className="mb-1 block text-[11px] font-semibold text-[#374151]">
            Caption Blast
          </label>

          <div className="relative">
            <textarea
              maxLength={180}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Tulis pesan broadcast campaign Anda di sini ..."
              className="
                h-[106px]
                w-full
                resize-none
                rounded-[8px]
                border
                border-[#d6dbe1]
                p-3
                text-[11px]
                outline-none
                placeholder:text-[#a0aaba]
                focus:border-[#2364bd]
              "
            />

            <span className="absolute bottom-2 right-2 text-[9px] text-[#9ba5b3]">
              {caption.length}/180
            </span>
          </div>
        </div>

        {/* Quota + Date */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <FormInput
              label="Kuota Blast"
              placeholder="Contoh: 2500"
              icon="hash"
            />

            <p className="mt-1 text-[9px] text-[#6b7280]">
              Maks 2.500
            </p>
          </div>

          <FormInput
            label="Tanggal Blast"
            placeholder="Pilih Tanggal Pengiriman"
            type="date"
            icon="calendar"
          />
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          className="
            mt-7
            h-[42px]
            w-full
            rounded-[7px]
            bg-[#2463bc]
            text-[12px]
            font-bold
            text-white
            shadow-[0_4px_12px_rgba(36,99,188,0.2)]
            transition
            hover:bg-[#1d56a7]
            active:scale-[0.99]
          "
        >
          Submit Campaign Blast
        </button>
      </section>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />

      <SuccessModal
        isOpen={isSuccsesOpen}
        onClose={() => setIsSuccesOpen(false)}
      />
    </>
  );
}