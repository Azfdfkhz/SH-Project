"use client";

import { useState, useEffect } from "react";
import { Rocket, PhoneCall } from "lucide-react";
import SummaryCard from "./SummaryCard";
import BlastButton from "./BlastButton";

export default function CampaignSummary() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <section className="rounded-[10px] bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between gap-6">
        
        <SummaryCard
          variant="green"
          title="Pengajuan Tersisa"
          value={data.pengajuan.value}
          description={data.pengajuan.description}
          icon={
            <Rocket
              size={25}
              strokeWidth={2}
              className="text-[#00a844]"
            />
          }
        />

        <SummaryCard
          variant="blue"
          title="Total Data"
          value={data.totalData.value}
          description={data.totalData.description}
          icon={
            <PhoneCall
              size={27}
              strokeWidth={2}
              className="text-[#2768c7]"
            />
          }
        />

        <div className="h-[59px] w-px bg-[#999]" />

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold leading-[15px] text-[#666]">
            Kamu Masih Bisa mengajukan
            <br />
            Blast di bulan ini!
          </p>

          <p className="mt-2 text-[9px] leading-[13px] text-[#aaa]">
            Jangkau lebih banyak donatur
            <br />
            untuk campaign kamu.
          </p>
        </div>

        <BlastButton />

      </div>
    </section>
  );
}