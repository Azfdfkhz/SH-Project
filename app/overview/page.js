import Sidebar from "@/components/Sidebar";
import OverviewHeader from "@/components/overview/OverviewHeader";
import CampaignSummary from "@/components/overview/CampaignSummary";
import SubmissionHistory from "@/components/overview/SubmissionHistory";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#f5f6f8]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 pt-14 md:ml-[172px] md:pt-0 min-h-screen">

        <div className="mx-auto max-w-[1100px] px-4 py-5 md:px-7 md:py-7">

          {/* Header */}
          <OverviewHeader />

          {/* Summary */}
          <CampaignSummary />

          {/* History */}
          <SubmissionHistory />


        </div>

      </main>

    </div>
  );
}