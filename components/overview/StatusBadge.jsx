export default function StatusBadge({ status }) {
  const statusStyle = {
    "Di jadwalkan": "bg-[#DBEAFE] text-[#1E5BBB]",
    "Terkirim": "bg-[#c8f4d5] text-[#43ad68]",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-[3px]
        text-[9px]
        font-medium
        ${statusStyle[status] || "bg-gray-100 text-gray-500"}
      `}
    >
      {status}
    </span>
  );
}