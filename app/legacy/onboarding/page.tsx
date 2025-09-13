import Link from 'next/link';

export default function LegacyOnboardingIndex() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-4">Legacy Onboarding Flows</h1>
      <p className="text-sm text-gray-600 mb-6">Archived versions kept temporarily for reference during transition.</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Link className="text-purple-600 hover:underline" href="/legacy/onboarding/page-old">Flow: page-old</Link>
        </li>
        <li>
          <Link className="text-purple-600 hover:underline" href="/legacy/onboarding/page-new">Flow: page-new</Link>
        </li>
      </ul>
    </div>
  );
}

