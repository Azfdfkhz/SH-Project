"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

const MAX_SIZE_MB = 1;
const ALLOWED_TYPES = ["image/png", "image/jpeg"];

export default function PosterUpload({ file = null, onFileChange }) {
  const [error, setError] = useState(null);

  const handleFile = (selected) => {
    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setError("Format poster harus PNG atau JPEG");
      onFileChange?.(null);
      return;
    }

    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Ukuran poster maksimal ${MAX_SIZE_MB}MB`);
      onFileChange?.(null);
      return;
    }

    setError(null);
    onFileChange?.(selected);
  };

  const handleRemove = () => {
    setError(null);
    onFileChange?.(null);
  };

  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold text-[#374151]">
        Poster Campaign
      </label>

      {file ? (
        <div className="flex h-[91px] items-center gap-3 rounded-[8px] border border-[#d1d7df] bg-[#fafbfc] px-3">
          {/* Preview */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={URL.createObjectURL(file)}
            alt="Preview poster"
            className="h-[67px] w-[67px] rounded-[6px] object-cover"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold text-[#374151]">
              {file.name}
            </p>
            <p className="text-[9px] text-[#9ba5b3]">
              {(file.size / 1024).toFixed(0)} KB
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="rounded-full p-1 text-[#9ba5b3] transition hover:bg-gray-100 hover:text-red-500"
            aria-label="Hapus poster"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label
          className="
            flex
            h-[91px]
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-[8px]
            border
            border-dashed
            border-[#d1d7df]
            bg-[#fafbfc]
            transition
            hover:bg-[#f5f8fb]
          "
        >
          <Upload
            size={20}
            className="mb-1 text-[#9ca8b6]"
          />

          <p className="text-[10px] font-semibold text-[#536070]">
            Pilih file poster atau seret ke sini
          </p>

          <p className="mt-1 text-[9px] text-[#9ba5b3]">
            Format yang didukung: PNG / JPEG (Maks. 1MB)
          </p>

          <input
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0] ?? null);
              e.target.value = "";
            }}
          />
        </label>
      )}

      {error && (
        <p className="mt-1 text-[9px] text-red-500">{error}</p>
      )}
    </div>
  );
}