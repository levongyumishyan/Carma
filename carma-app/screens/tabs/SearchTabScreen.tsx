import { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function SearchTabScreen() {
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-neutral-950 px-6 pt-2" edges={['top', 'left', 'right']}>
      <Text className="text-2xl font-semibold text-white">Search</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search…"
        placeholderTextColor="#737373"
        className="mt-4 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-base text-white"
      />
      <Text className="mt-4 text-sm text-neutral-500">
        Hook up your data source here — this is a starter layout only.
      </Text>
    </SafeAreaView>
  );
}
