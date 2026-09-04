import { CheckCircle2 } from "lucide-react";

const requirements = [
  "Maksimal 2.500 kontak setiap pengajuan",
  "Maksimal 4 pengajuan setiap bulan",
  "Total kuota per bulan hingga 10.000 kontak",
  "Pengajuan dilakukan setiap akhir bulan",
  "Tim CRM Sharing Happiness berhak melakukan review sebelum blast dilakukan",
];

export default function WhatsAppInfo() {
  return (
    <aside
      className="
        relative
        h-[550px]
        overflow-hidden
        rounded-[9px]
        bg-[#EDF6FF]
        shadow-[0_2px_5px_rgba(0,0,0,0.12)]
      "
    >
      {/* Text */}
      <div className="relative z-10 px-10 pt-7">
        <h2 className="text-[12px] font-bold text-[#4b5563]">
          Tentang Optimasi WhatsApp
        </h2>

        <p className="mt-2 text-[11px] leading-[18px] text-[#697586]">
          Layanan optimasi WhatsApp untuk
          <br />
          membantu campaign kamu
          <br />
          menjangkau lebih banyak donatur
          <br />
          yang relevan.
        </p>

        <div className="my-3 h-px bg-[#d8e5ef]" />

        <h3 className="text-[10px] font-bold text-[#5b6572]">
          Ketentuan Layanan
        </h3>

        <ul className="mt-2 space-y-2.5">
          {requirements.map((item) => (
            <li
              key={item}
              className="flex gap-2"
            >
              <CheckCircle2
                size={14}
                fill="#2463bc"
                className="shrink-0 text-white"
              />

              <span className="text-[9px] leading-[13px] text-[#687484]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[240px] w-full overflow-hidden">
        <img
            src="/WAInfo.svg"
            alt=""
        />
        </div>
    </aside>
  );
}