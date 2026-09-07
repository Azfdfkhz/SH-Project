import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { MAX_KUOTA } from "@/lib/constants";

// Sama seperti /api/campaign — cegah Next.js meng-cache response
// GET ini supaya data pengajuan yang baru langsung kelihatan.
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

    // TODO(backend):
    // 1. Ganti logika file JSON ini dengan query database (misal: Prisma/Drizzle/SQL).
    // 2. Berdasarkan `slug` yang dikirim, cari data Campaign terkait di Database untuk mendapatkan `campaignTitle` / `campaignName`.
    // 3. Field `createdAt` dan `sentAt` menggunakan format ISO 8601 standar (mis. 2026-09-06T12:00:00Z).
    // 4. Simpan URL poster dari Cloud Storage ke field `image`.
    const filePath = getFilePath();
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

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
      status: "Dijadwalkan",
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