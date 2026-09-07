"use client";

import { useState, useEffect } from "react";
import SummaryCard from "./SummaryCard";
import BlastButton from "./BlastButton";
import BlastQuotaEmptyModal from "@/components/ajukanblast/PopUpBlast/BlastQuotaEmptyModal";

export default function CampaignSummary() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isQuotaEmptyOpen, setIsQuotaEmptyOpen] = useState(false);

  useEffect(() => {
    fetch("/api/campaign")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data dari API");
        return res.json();
      })
      .then((result) => setData(result))
      .catch((err) => {
        console.error("Error fetching API:", err);
        setError(err.message);
      });
  }, []);

  if (error) return <div className="p-7 text-sm text-red-500">Error: {error}</div>;
  if (!data) return <div className="p-7 text-sm text-gray-500">Loading data...</div>;

  const sisaPengajuan = Number(data.pengajuan?.value ?? 0);

  const handleBlastButtonClick = () => {
    if (sisaPengajuan <= 0) {
      setIsQuotaEmptyOpen(true);
    }
  };

  return (
    <section className="rounded-[10px] bg-white p-4 md:p-7 shadow-sm">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6">
        
        <SummaryCard
          variant="green"
          title="Pengajuan Tersisa"
          value={data.pengajuan.value}
          description={data.pengajuan.description}
          icon={
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="/BlastRocketGreen.svg"
              alt="Blast Rocket"
              className="h-[25px] w-[25px]"
            />
          }
        />

        <div className="hidden md:block h-[59px] w-px bg-[#999]" />

        <div className="min-w-0 flex-1 text-center md:text-left">
          <p className="text-[12px] md:text-[11px] font-bold leading-[16px] text-[#666]">
            {sisaPengajuan > 0 ? (
              <>
                Kamu Masih Bisa mengajukan
                <br className="hidden md:inline" />{" "}
                Blast di bulan ini!
              </>
            ) : (
              <>
                Kuota pengajuan bulan ini
                <br className="hidden md:inline" />{" "}
                sudah habis (0).
              </>
            )}
          </p>

          <p className="mt-1 md:mt-2 text-[10px] md:text-[9px] leading-[14px] text-[#aaa]">
            {sisaPengajuan > 0
              ? "Jangkau lebih banyak donatur untuk campaign kamu."
              : "Harus nunggu untuk dapat kuota campaign berikutnya."}
          </p>
        </div>

        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <BlastButton
            sisaPengajuan={sisaPengajuan}
            onClick={handleBlastButtonClick}
          />
        </div>

      </div>


      <BlastQuotaEmptyModal
        isOpen={isQuotaEmptyOpen}
        onClose={() => setIsQuotaEmptyOpen(false)}
      />
    </section>
  );
}