import { useUser } from '@clerk/clerk-expo';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vars, useColorScheme } from 'nativewind';

import { formatFullName, getOAuthNameParts } from '../../lib/userName';
import { theme } from '../../theme';
import { ThemeToggle } from '../../components/ThemeToggle';

export function HomeTabScreen() {
    const { user } = useUser();
    const { colorScheme } = useColorScheme();
    const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

    const parts = getOAuthNameParts(user);
    const fromOAuth = formatFullName(parts);
    const greetingName = fromOAuth || (user?.fullName ?? '').trim();

    return (
        <SafeAreaView
            style={vars(currentTheme)}
            className="flex-1 bg-[--background] px-6 pt-2"
            edges={['top', 'left', 'right']}
        >
            <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-2xl font-semibold text-[--text-on-brand]">
                    Home
                </Text>
                <ThemeToggle />
            </View>

            <View className="mt-4 rounded-2xl bg-[--surface] p-5">
                <Text className="text-lg leading-relaxed text-[--text]">
                    Welcome back{greetingName ? `, ${greetingName}` : '.'}
                </Text>

                <Text className="mt-2 text-sm text-[--muted]">
                    Your first and last name come from Google or Apple when shared with Clerk during sign-in.
                </Text>
            </View>
        </SafeAreaView>
    );
}