"use client";

import { useState } from "react";
import MemberData from "./DataKemitraan/MemberData";
import CampaignDetail from "./DetailCampaign/CampaignDetail";
import BlastConfiguration from "./KonfigurationBlast/BlastConfiguration";
import ConfirmationModal from "./PopUpBlast/BlastConfirmationModal";
import SuccessModal from "./PopUpBlast/BlastSuccessModal";

const MAX_KUOTA = 2500;

const initialForm = {
  picName: "",
  phone: "",
  slug: "",
  caption: "",
  kuota: "",
  tanggal: "",
};

export default function BlastForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const updateField = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.picName.trim()) nextErrors.picName = "Nama PIC wajib diisi";
    if (!form.phone.trim()) nextErrors.phone = "No. WhatsApp PIC wajib diisi";
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

    if (!form.tanggal) nextErrors.tanggal = "Tanggal blast wajib diisi";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmitClick = () => {
    if (!validate()) return;
    setSubmitError(null);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result.message || "Gagal mengirim pengajuan");
      }

      setIsConfirmOpen(false);
      setForm(initialForm);
      setIsSuccessOpen(true);
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
    </div>
  );
}
