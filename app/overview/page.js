import Sidebar from "@/components/Sidebar";
import OverviewHeader from "@/components/overview/OverviewHeader";
import CampaignSummary from "@/components/overview/CampaignSummary";
import SubmissionHistory from "@/components/overview/SubmissionHistory";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f6f8]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-43 min-h-screen">

        <div className="mx-auto max-w px-7 py-7">

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