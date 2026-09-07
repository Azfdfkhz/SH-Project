"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MemberData from "./DataKemitraan/MemberData";
import CampaignDetail from "./DetailCampaign/CampaignDetail";
import BlastConfiguration from "./KonfigurationBlast/BlastConfiguration";
import ConfirmationModal from "./PopUpBlast/BlastConfirmationModal";
import SuccessModal from "./PopUpBlast/BlastSuccessModal";
import BlastQuotaEmptyModal from "./PopUpBlast/BlastQuotaEmptyModal";
import { MAX_KUOTA, PHONE_REGEX } from "@/lib/constants";

const initialForm = {
  picName: "",
  phone: "",
  slug: "",
  caption: "",
  kuota: "",
  tanggal: "",
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
};

export default function BlastForm() {
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [poster, setPoster] = useState(null);
  const [errors, setErrors] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isQuotaEmptyOpen, setIsQuotaEmptyOpen] = useState(false);
  const [sisaPengajuan, setSisaPengajuan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    fetch("/api/campaign")
      .then((res) => res.json())
      .then((data) => {
        if (data?.pengajuan?.value !== undefined) {
          setSisaPengajuan(Number(data.pengajuan.value));
        }
      })
      .catch((err) => console.error("Gagal mengambil data kuota campaign:", err));
  }, []);

  const updateField = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.picName.trim()) nextErrors.picName = "Nama PIC wajib diisi";

    const phone = form.phone.trim();
    if (!phone) {
      nextErrors.phone = "No. WhatsApp PIC wajib diisi";
    } else if (!PHONE_REGEX.test(phone)) {
      nextErrors.phone =
        "Format nomor tidak valid. Gunakan format 08xx / 628xx / +628xx";
    }

    if (!form.slug.trim()) nextErrors.slug = "Slug wajib diisi";
    if (!form.caption.trim()) nextErrors.caption = "Caption blast wajib diisi";

    const kuotaNumber = Number(form.kuota);
    if (!form.kuota) {
      nextErrors.kuota = "Kuota blast wajib diisi";
    } else if (!Number.isFinite(kuotaNumber) || kuotaNumber <= 0) {
      nextErrors.kuota = "Kuota blast harus berupa angka lebih dari 0";
    } else if (kuotaNumber > MAX_KUOTA) {
      nextErrors.kuota = `Kuota blast maksimal ${MAX_KUOTA}`;
    }

    if (!form.tanggal) {
      nextErrors.tanggal = "Tanggal blast wajib diisi";
    } else if (form.tanggal < new Date().toISOString().split("T")[0]) {
      nextErrors.tanggal = "Tanggal blast tidak boleh di masa lalu";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmitClick = () => {
    if (sisaPengajuan !== null && sisaPengajuan <= 0) {
      setIsQuotaEmptyOpen(true);
      return;
    }
    if (!validate()) return;
    setSubmitError(null);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let posterDataUrl = null;
      if (poster) {
        try {
          posterDataUrl = await fileToBase64(poster);
        } catch (e) {
          console.error("Gagal mengonversi poster ke Base64", e);
        }
      }

      const res = await fetch("/api/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          // Metadata poster — backend tinggal menangani field ini
          // (upload storage / validasi) kalau sudah siap.
          posterName: poster?.name ?? null,
          posterSize: poster?.size ?? null,
          posterDataUrl,
        }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (result.message && result.message.includes("0")) {
          setIsConfirmOpen(false);
          setIsQuotaEmptyOpen(true);
          return;
        }
        throw new Error(result.message || "Gagal mengirim pengajuan");
      }

      setIsConfirmOpen(false);
      setForm(initialForm);
      setPoster(null);
      setIsSuccessOpen(true);

      // Paksa server components (mis. ringkasan kuota di halaman lain)
      // mengambil ulang data terbaru.
      router.refresh();
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-[14px] bg-white px-8 py-7 shadow-[0_5px_20px_rgba(0,0,0,0.06)]">
      <MemberData
        picName={form.picName}
        onPicNameChange={updateField("picName")}
        phone={form.phone}
        onPhoneChange={updateField("phone")}
        errors={errors}
      />

      <CampaignDetail
        slug={form.slug}
        onSlugChange={updateField("slug")}
        error={errors.slug}
      />

      <BlastConfiguration
        caption={form.caption}
        onCaptionChange={updateField("caption")}
        kuota={form.kuota}
        onKuotaChange={updateField("kuota")}
        tanggal={form.tanggal}
        onTanggalChange={updateField("tanggal")}
        poster={poster}
        onPosterChange={setPoster}
        errors={errors}
        onSubmit={handleSubmitClick}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => !isSubmitting && setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        isSubmitting={isSubmitting}
        error={submitError}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />

      <BlastQuotaEmptyModal
        isOpen={isQuotaEmptyOpen}
        onClose={() => setIsQuotaEmptyOpen(false)}
      />
    </div>
  );
}