import MemberData from "./DataKemitraan/MemberData";
import CampaignDetail from "./DetailCampaign/CampaignDetail";
import BlastConfiguration from "./KonfigurationBlast/BlastConfiguration";

export default function BlastForm() {
  return (
    <div className="rounded-[14px] bg-white px-8 py-7 shadow-[0_5px_20px_rgba(0,0,0,0.06)]">
      <MemberData />

      <CampaignDetail />

      <BlastConfiguration />
    </div>
  );
}