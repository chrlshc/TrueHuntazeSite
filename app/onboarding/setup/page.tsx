import { cookies } from 'next/headers';
import OnboardingSetupClient from './SetupClient';

export default function OnboardingSetupPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const cookieStore = cookies();
  const onlyfansCookie = cookieStore.get('ops_platforms_onlyfans');
  const initialOnlyfansConnected = onlyfansCookie?.value === 'true';
  const showConnectedToast =
    (typeof searchParams?.connected === 'string' &&
      searchParams?.connected === 'onlyfans') || false;

  return (
    <OnboardingSetupClient
      initialOnlyfansConnected={initialOnlyfansConnected}
      showConnectedToast={showConnectedToast}
    />
  );
}

