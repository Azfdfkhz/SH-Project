import { redirect } from "next/navigation";

export default function Home() {
  // Root "/" bukan halaman tersendiri — arahkan ke Overview
  // (sebelumnya app/page.js merender <Overview/> dan <Tagihan/> sekaligus,
  // padahal keduanya masing-masing sudah membawa <Sidebar/> & <OverviewHeader/> sendiri,
  // jadi hasilnya sidebar & header dobel saat halaman "/" dibuka).
  redirect("/overview");
}
