export default function SectionTitle({ number, title }) {
  return (
    <div className="mb-4 flex items-center gap-2 border-b border-[#e5e7eb] pb-2">
      <h2 className="text-[12px] font-bold uppercase text-[#4b5563]">
        {number}. {title}
      </h2>
    </div>
  );
}