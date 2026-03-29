import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';

export function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel="Toggle dark mode"
            onPress={toggleColorScheme}
            className="h-11 w-11 items-center justify-center rounded-full bg-[--surface] border border-[--border]"
        >
            <Ionicons
                name={isDark ? 'sunny-outline' : 'moon-outline'}
                size={20}
                color={isDark ? '#FFFFFF' : '#0B0B0B'}
            />
        </Pressable>
    );
}