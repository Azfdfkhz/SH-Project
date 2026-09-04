import SectionTitle from "../SectionTitle";
import ReadonlyInput from "../ReadonlyInput";
import FormInput from "../FormInput";

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
            placeholder="Contoh: 6281234567890"
            icon="phone"
            value={phone}
            onChange={onPhoneChange}
          />
          {errors.phone && (
            <p className="mt-1 text-[9px] text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
    </section>
  );
}
