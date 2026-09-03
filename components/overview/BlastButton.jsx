import Link from "next/link";
import { Rocket } from "lucide-react";

export default function BlastButton() {
  return (
    <Link
      href="/ajukan-blast"
      className="
        flex h-[82px] w-[225px]
        items-center justify-center
        gap-4
        rounded-[11px]
        bg-[#064bc7]
        px-5
        text-white
        no-underline
        transition
        hover:bg-[#0644b4]
        active:scale-[0.98]
      "
    >
      <div className="flex h-[48px] w-[48px] items-center justify-center">
        <Rocket size={45} strokeWidth={1.8} />
      </div>

      <div className="text-left">
        <p className="text-[17px] font-semibold leading-tight text-white">
          Ajukan Blast
        </p>
        <p className="text-[17px] font-semibold leading-tight text-white">
          Sekarang
        </p>
      </div>
    </Link>
  );
}