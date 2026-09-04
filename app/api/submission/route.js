import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Sama seperti /api/campaign — cegah Next.js meng-cache response
// GET ini supaya data pengajuan yang baru langsung kelihatan.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const MAX_KUOTA = 2500;

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
    const { picName, phone, slug, caption, kuota, tanggal } = body ?? {};

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

    const filePath = getFilePath();
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    const today = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const newEntry = {
      date: today,
      campaign: slug,
      contacts: String(kuotaNumber),
      status: "Di Jadwalkan",
      sentDate: " ",
      title: caption.slice(0, 60),
      slug,
      description: caption,
      image: "/images/Sh.png",
      picName,
      phone,
      tanggalBlast: tanggal,
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