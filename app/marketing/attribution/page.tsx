import MarketingToolbar from '@/components/marketing/Toolbar';
export default function MarketingAttribution() {
  return (
    <>
      <div className="text-lg font-semibold text-[#111213] dark:text-[#E3E3E3]">Marketing</div>
      <MarketingToolbar current="Attribution" />
      <div className="text-sm text-[#6D7175] dark:text-[#A5A7AB]">Attribution reports coming soon…</div>
    </>
  );
}