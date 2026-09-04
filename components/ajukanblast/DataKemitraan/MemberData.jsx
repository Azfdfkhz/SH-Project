import SectionTitle from "../SectionTitle";
import ReadonlyInput from "../ReadonlyInput";
import FormInput from "../FormInput";

export default function MemberData() {
  return (
    <section>
      <SectionTitle
        number="1"
        title="Data Kemitraan"
      />

      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        <ReadonlyInput label="ID Mitra" />

        <ReadonlyInput label="Nama Mitra" />

        <FormInput
          label="Nama PIC"
          placeholder="Contoh: Budi Santoso"
          icon="user"
        />

        <FormInput
          label="No. WhatsApp PIC"
          placeholder="Contoh: 6281234567890"
          icon="phone"
        />
      </div>
    </section>
  );
}