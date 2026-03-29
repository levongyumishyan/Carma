import { useClerk, useUser } from '@clerk/clerk-expo';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { formatFullName, getOAuthNameParts } from '../../lib/userName';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="border-b border-neutral-800 py-4">
      <Text className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</Text>
      <Text className="mt-1 text-base text-white">{value || '—'}</Text>
    </View>
  );
}

export function AccountTabScreen() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const parts = getOAuthNameParts(user);
  const full = formatFullName(parts);

  return (
    <SafeAreaView className="flex-1 bg-neutral-950 px-6 pt-2" edges={['top', 'left', 'right']}>
      <Text className="text-2xl font-semibold text-white">Account</Text>
      <Text className="mt-1 text-sm text-neutral-500">
        Names are synced from Google / Apple via Clerk when the provider supplies them.
      </Text>

      <View className="mt-6">
        <Row label="First name" value={parts.firstName} />
        <Row label="Last name" value={parts.lastName} />
        <Row label="Full name" value={full} />
        <Row
          label="Email"
          value={user?.primaryEmailAddress?.emailAddress ?? ''}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => signOut()}
        className="mt-8 self-start rounded-xl border border-neutral-600 px-5 py-3 active:opacity-80">
        <Text className="font-medium text-white">Sign out</Text>
      </Pressable>
    </SafeAreaView>
  );
}
