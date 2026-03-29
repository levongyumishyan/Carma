import { useSSO } from '@clerk/clerk-expo';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vars } from 'nativewind';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
export function LoginScreen() {
  const { startSSOFlow } = useSSO();
  const insets = useSafeAreaInsets();
  const [busy, setBusy] = useState<'google' | 'apple' | null>(null);

  const runSso = async (strategy: 'oauth_google' | 'oauth_apple', label: string) => {
    try {
      setBusy(strategy === 'oauth_google' ? 'google' : 'apple');
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      Alert.alert(`${label} sign-in failed`, message);
    } finally {
      setBusy(null);
    }
  };

  return (
      <View
          style={[
            vars(theme.light),
            { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
          ]}
          className="flex-1 items-center justify-center bg-[--background] px-6"
      >
        <View className="w-full max-w-md">
          <View className="mb-10 items-center">
            <Text className="text-center text-7xl font-semibold tracking-tight text-white">
              Carma
            </Text>

            <Text className="mt-2 text-center text-base text-white/90">
              Sign in with your preferred provider to continue.
            </Text>
          </View>

          <View className="w-full gap-3 rounded-2xl bg-[--surface] p-4">

            {/* GOOGLE */}
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Continue with Google"
                disabled={busy !== null}
                onPress={() => runSso('oauth_google', 'Google')}
                className="flex-row items-center justify-center gap-3 rounded-xl border border-[--border] bg-white py-4 active:opacity-90"
            >
              {busy === 'google' ? (
                  <ActivityIndicator color="#171717" />
              ) : (
                  <>
                    <AntDesign name="google" size={20} color="#171717" />
                    <Text className="text-base font-semibold text-[--text]">
                      Continue with Google
                    </Text>
                  </>
              )}
            </Pressable>

            {/* APPLE */}
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Continue with Apple"
                disabled={busy !== null}
                onPress={() => runSso('oauth_apple', 'Apple')}
                className="flex-row items-center justify-center gap-3 rounded-xl bg-black py-4 active:opacity-90"
            >
              {busy === 'apple' ? (
                  <ActivityIndicator color="#ffffff" />
              ) : (
                  <>
                    <Ionicons name="logo-apple" size={20} color="#ffffff" />
                    <Text className="text-base font-semibold text-white">
                      Continue with Apple
                    </Text>
                  </>
              )}
            </Pressable>

          </View>
        </View>
      </View>
  );
}