import SectionTitle from "../SectionTitle";
import ReadonlyInput from "../ReadonlyInput";

export default function CampaignDetail({ slug = "", onSlugChange, error }) {
  return (
    <section className="mt-7">
      <SectionTitle
        number="2"
        title="Detail Campaign"
      />

      {/* Slug */}
      <div>
        <label className="mb-1 block text-[11px] font-semibold text-[#374151]">
          Slug
        </label>

        <input
          type="text"
          placeholder="Contoh: sedekah-jariyah-4-in-1"
          value={slug}
          onChange={(e) => onSlugChange?.(e.target.value)}
          className="
            h-[38px]
            w-full
            rounded-[8px]
            border
            border-[#d6dbe1]
            px-3
            text-[11px]
            outline-none
            placeholder:text-[#9ba5b5]
            focus:border-[#2364bd]
          "
        />

        <p className="mt-1 text-[9px] text-[#7c8795]">
          Slug akan menghasilkan rincian detail campaign secara otomatis.
        </p>
        {error && (
          <p className="mt-1 text-[9px] text-red-500">{error}</p>
        )}
      </div>

      {/* Campaign title */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <ReadonlyInput
          label="Judul Campaign"
          value="Terisi otomatis..."
        />

        <ReadonlyInput
          label="Campaigner"
          value="Terisi otomatis..."
        />
      </div>

      {/* Category */}
      <div className="mt-3">
        <ReadonlyInput
          label="Kategori"
          value="Kategori otomatis dari slug"
        />
      </div>
    </section>
  );
}
