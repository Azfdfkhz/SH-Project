"use client";

import StatusBadge from "./StatusBadge";
import CampaignHover from "@/components/overview/CampaignHover";
import {ArrowUpRight} from "lucide-react";
import { useState, useEffect } from "react";

export default function SubmissionHistory() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/submission")
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
    <section className="mt-5 rounded-[10px] bg-white p-7 shadow-sm">

      <h2 className="mb-7 text-[16px] font-bold text-[#202020]">
        Riwayat Pengajuan
      </h2>

      <div className="overflow-visible rounded-[5px] border border-[#e5e5e5]">

        <div
          className="
            grid
            grid-cols-[1.1fr_1.1fr_1fr_1fr_1fr]
            items-center
            bg-[#f0faf6]
            px-3
            py-[7px]
          "
        >
          <p className="text-[10px] font-bold text-[#506174]">
            Tanggal Pengajuan
          </p>

          <p className="text-[10px] font-bold text-[#506174]">
            Slug Campaign
          </p>

          <p className="text-center text-[10px] font-bold text-[#506174]">
            Jumlah Kontak
          </p>

          <p className="text-center text-[10px] font-bold text-[#506174]">
            Status
          </p>

          <p className="text-center text-[10px] font-bold text-[#506174]">
            Tanggal Terkirim
          </p>
        </div>

        {/* Rows */}
        {data.map((item, index) => (
          <div
            key={index}
            className="
              grid
              grid-cols-[1.1fr_1.1fr_1fr_1fr_1fr]
              items-center
              border-t border-[#eeeeee]
              px-3
              py-[11px]
            "
          >
            <p className="text-[10px] text-[#777]">
              {item.date}
            </p>

            <p className="inline-flex items-center gap-0.2 text-[9px] text-[#777]">
            <CampaignHover item={item} />
            <ArrowUpRight className="w-2 h-2" />
            </p>

            <p className="text-center text-[10px] font-bold text-[#777]">
              {item.contacts}
            </p>

            <div className="flex justify-center">
              <StatusBadge status={item.status} />
            </div>

            <p className="text-center text-[10px] text-[#777]">
              {item.sentDate}
            </p>
          </div>
        ))}

        {/* Empty space seperti desain */}
        <div className="h-[33px] border-t border-[#eeeeee]" />

      </div>
    </section>
  );
}