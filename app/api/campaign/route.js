import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Route ini baca file JSON yang datanya bisa berubah kapan saja
// (setelah ada pengajuan baru). Tanpa ini, Next.js menganggap route
// GET yang tidak pakai request/cookies sebagai "static" dan meng-cache
// responsnya, jadi angka pengajuan kelihatan tidak pernah update.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const BULAN_ID = {
  januari: 0,
  februari: 1,
  maret: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  agustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  desember: 11,
};

function parseTanggalIndonesia(dateStr) {
  if (!dateStr) return null;

  const parts = dateStr.trim().toLowerCase().split(/\s+/);
  if (parts.length !== 3) return null;

  const [day, monthName, year] = parts;
  const month = BULAN_ID[monthName];

  if (month === undefined || Number.isNaN(Number(day)) || Number.isNaN(Number(year))) {
    return null;
  }

  return { day: Number(day), month, year: Number(year) };
}

export async function GET() {
  try {
    const campaignPath = path.join(process.cwd(), "data", "campaign.json");
    const submissionPath = path.join(process.cwd(), "data", "submission.json");

    const campaignData = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
    const submissions = JSON.parse(fs.readFileSync(submissionPath, "utf8"));

    const kuotaBulanan = campaignData.pengajuanKuota ?? 4;

    const now = new Date();
    const bulanIni = now.getMonth();
    const tahunIni = now.getFullYear();

    const pengajuanBulanIni = submissions.filter((item) => {
      const tanggal = parseTanggalIndonesia(item.date);
      return tanggal && tanggal.month === bulanIni && tanggal.year === tahunIni;
    }).length;

    const sisaPengajuan = Math.max(kuotaBulanan - pengajuanBulanIni, 0);

    const data = {
      ...campaignData,
      pengajuan: {
        value: String(sisaPengajuan),
        description: `dari ${kuotaBulanan} Pengajuan`,
      },
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal membaca data", error: error.message },
      { status: 500 }
    );
  }
}