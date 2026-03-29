import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vars, useColorScheme } from 'nativewind';

import { theme } from '../../theme';
import { ThemeToggle } from '../../components/ThemeToggle';

export function SearchTabScreen() {
    const [query, setQuery] = useState('');
    const { colorScheme } = useColorScheme();

    const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

    return (
        <SafeAreaView
            style={vars(currentTheme)}
            className="flex-1 bg-[--background] px-6 pt-2"
            edges={['top', 'left', 'right']}
        >
            <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-2xl font-semibold text-[--text-on-brand]">
                    Search
                </Text>
                <ThemeToggle />
            </View>

            <View className="mt-4 rounded-2xl bg-[--surface] p-5">
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search…"
                    placeholderTextColor={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    className="mt-1 rounded-xl border border-[--border] bg-[--surface] px-4 py-3 text-base text-[--text]"
                />

                <Text className="mt-4 text-sm text-[--muted]">
                    Hook up your data source here — this is a starter layout only.
                </Text>
            </View>
        </SafeAreaView>
    );
}