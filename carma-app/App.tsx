import './global.css';

import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import * as WebBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MainTabs } from './navigation/MainTabs';
import { LoginScreen } from './screens/LoginScreen';

WebBrowser.maybeCompleteAuthSession();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';

export default function App() {
  if (!publishableKey) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-950 px-6">
        <Text className="text-center text-base text-red-400">
          Set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in a `.env` file at the project root, then
          restart Expo.
        </Text>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
        <ClerkLoading>
          <View className="flex-1 items-center justify-center bg-neutral-950">
            <ActivityIndicator size="large" color="#fafafa" />
          </View>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <MainTabs />
            </GestureHandlerRootView>
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </ClerkLoaded>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
