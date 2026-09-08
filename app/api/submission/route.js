import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { MAX_KUOTA } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getFilePath() {
  return path.join(process.cwd(), "data", "submission.json");
}

export async function GET() {
  try {
    const fileContents = fs.readFileSync(getFilePath(), "utf8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal membaca data", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { picName, phone, slug, caption, kuota, tanggal, posterName, posterDataUrl } = body ?? {};

    if (!picName || !phone || !slug || !caption || !kuota || !tanggal) {
      return NextResponse.json(
        { message: "Data pengajuan belum lengkap" },
        { status: 400 }
      );
    }

    const kuotaNumber = Number(kuota);
    if (!Number.isFinite(kuotaNumber) || kuotaNumber <= 0 || kuotaNumber > MAX_KUOTA) {
      return NextResponse.json(
        { message: `Kuota blast tidak valid (harus 1-${MAX_KUOTA})` },
        { status: 400 }
      );
    }

    // Cek sisa kuota pengajuan bulan ini
    const campaignPath = path.join(process.cwd(), "data", "campaign.json");
    let kuotaBulanan = 4;
    if (fs.existsSync(campaignPath)) {
      const campaignData = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
      kuotaBulanan = campaignData.pengajuanKuota ?? 4;
    }

    const filePath = getFilePath();
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    const now = new Date();
    const bulanIni = now.getMonth();
    const tahunIni = now.getFullYear();

    const pengajuanBulanIni = data.filter((item) => {
      if (!item.createdAt) return false;
      const tanggalItem = new Date(item.createdAt);
      return tanggalItem.getMonth() === bulanIni && tanggalItem.getFullYear() === tahunIni;
    }).length;

    const sisaPengajuan = Math.max(kuotaBulanan - pengajuanBulanIni, 0);
    if (sisaPengajuan <= 0) {
      return NextResponse.json(
        { message: "Kuota pengajuan campaign bulan ini telah habis (0). Harap tunggu periode berikutnya." },
        { status: 400 }
      );
    }


    // TODO(backend):
    // 1. Ganti logika file JSON ini dengan query database (misal: Prisma/Drizzle/SQL).
    // 2. Berdasarkan `slug` yang dikirim, cari data Campaign terkait di Database untuk mendapatkan `campaignTitle` / `campaignName`.
    // 3. Field `createdAt` dan `sentAt` menggunakan format ISO 8601 standar (mis. 2026-09-06T12:00:00Z).
    // 4. Simpan URL poster dari Cloud Storage ke field `image`.

    // Untuk mock: Ubah slug "sedekah-jariyah" menjadi Nama Campaign "Sedekah Jariyah"

    const formattedCampaignName = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const newEntry = {
      id: `sub_${Date.now()}`,
      createdAt: new Date().toISOString(),
      campaign: formattedCampaignName,
      contacts: kuotaNumber,
      status: "Di jadwalkan",
      sentAt: null,
      title: formattedCampaignName,
      slug: slug.toLowerCase().trim(),
      description: caption,
      image: posterDataUrl || "/images/Sh.png", // Gunakan gambar yang diupload atau fallback gambar default
      picName,
      phone,
      tanggalBlast: tanggal,
      posterName: posterName ?? null,
    };

    data.unshift(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json(
      { message: "Pengajuan berhasil disimpan", data: newEntry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menyimpan pengajuan", error: error.message },
      { status: 500 }
    );
  }
}