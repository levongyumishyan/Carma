import { useUser } from '@clerk/clerk-expo';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { formatFullName, getOAuthNameParts } from '../../lib/userName';

export function HomeTabScreen() {
  const { user } = useUser();
  const parts = getOAuthNameParts(user);
  const fromOAuth = formatFullName(parts);
  const greetingName = fromOAuth || (user?.fullName ?? '').trim();

  return (
    <SafeAreaView className="flex-1 bg-neutral-950 px-6 pt-2" edges={['top', 'left', 'right']}>
      <Text className="text-2xl font-semibold text-white">Home</Text>
      <Text className="mt-3 text-lg leading-relaxed text-neutral-300">
        Welcome back{greetingName ? `, ${greetingName}` : '.'}
      </Text>
      <Text className="mt-2 text-sm text-neutral-500">
        Your first and last name come from Google or Apple when shared with Clerk during sign-in.
      </Text>
    </SafeAreaView>
  );
}
