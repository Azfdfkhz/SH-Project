import { Upload } from "lucide-react";

export default function PosterUpload() {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold text-[#374151]">
        Poster Campaign
      </label>

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
        />
      </label>
    </div>
  );
}