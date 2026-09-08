import SectionTitle from "./SectionTitle";
import ReadonlyInput from "./ReadonlyInput";
import FormInput from "./FormInput";

export default function MemberData({
  picName = "",
  onPicNameChange,
  phone = "",
  onPhoneChange,
  errors = {},
}) {
  return (
    <section>
      <SectionTitle
        number="1"
        title="Data Kemitraan"
      />

      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        <ReadonlyInput label="ID Mitra" />

        <ReadonlyInput label="Nama Mitra" />

        <div>
          <FormInput
            label="Nama PIC"
            placeholder="Contoh: Budi Santoso"
            icon="user"
            value={picName}
            onChange={onPicNameChange}
          />
          {errors.picName && (
            <p className="mt-1 text-[9px] text-red-500">{errors.picName}</p>
          )}
        </div>

        <div>
          <FormInput
            label="No. WhatsApp PIC"
            placeholder="Contoh: 081234567890"
            icon="phone"
            inputMode="tel"
            value={phone}
            onChange={(value) => onPhoneChange?.(value.replace(/[^0-9+]/g, ""))}
          />
          {errors.phone && (
            <p className="mt-1 text-[9px] text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
    </section>
  );
}