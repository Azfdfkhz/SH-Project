import Sidebar from "@/components/Sidebar";
import OverviewHeader from "@/components/overview/OverviewHeader";
import BlastForm from "@/components/ajukanblast/KonfigurationBlast/BlastForm";
import WhatsAppInfo from "@/components/ajukanblast/KonfigurationBlast/WhatsappInfo";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f6f8]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 pt-14 md:ml-[172px] md:pt-0 min-h-screen">

        <div className="mx-auto max-w-[1100px] px-4 py-5 md:px-7 md:py-7">

          {/* Header */}
          <OverviewHeader />

          <div className="grid grid-cols-1 lg:grid-cols-[537px_1fr] items-start gap-4">

            {/* Form */}
            <BlastForm />

            {/* Information */}
            <WhatsAppInfo />

          </div>
        </div>

      </main>

    </div>
  );
}