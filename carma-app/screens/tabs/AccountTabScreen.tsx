import { useClerk, useUser } from '@clerk/clerk-expo';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vars, useColorScheme } from 'nativewind';

import { formatFullName, getOAuthNameParts } from '../../lib/userName';
import { theme } from '../../theme';
import { ThemeToggle } from '../../components/ThemeToggle';

function Row({ label, value }: { label: string; value: string }) {
    return (
        <View className="border-b border-[--border] py-4">
            <Text className="text-xs font-medium uppercase tracking-wide text-[--muted]">
                {label}
            </Text>
            <Text className="mt-1 text-base text-[--text]">
                {value || '—'}
            </Text>
        </View>
    );
}

export function AccountTabScreen() {
    const { signOut } = useClerk();
    const { user } = useUser();
    const { colorScheme } = useColorScheme();

    const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

    const parts = getOAuthNameParts(user);
    const full = formatFullName(parts);

    return (
        <SafeAreaView
            style={vars(currentTheme)}
            className="flex-1 bg-[--background] px-6 pt-2"
            edges={['top', 'left', 'right']}
        >
            <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-2xl font-semibold text-[--text-on-brand]">
                    Account
                </Text>
                <ThemeToggle />
            </View>

            <View className="mt-4 rounded-2xl bg-[--surface] p-5">
                <Text className="text-sm text-[--muted]">
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
                    className="mt-8 self-start rounded-xl border border-[--border] bg-[--brand] px-5 py-3 active:opacity-80"
                >
                    <Text className="font-medium text-[--text-on-brand]">Sign out</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}