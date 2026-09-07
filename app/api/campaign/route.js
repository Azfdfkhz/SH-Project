import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// TODO(backend): Ambil dari database.
// Query jumlah pengajuan yang tanggal createdAt-nya pada bulan ini.

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
      if (!item.createdAt) return false;
      const tanggal = new Date(item.createdAt);
      return tanggal.getMonth() === bulanIni && tanggal.getFullYear() === tahunIni;
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