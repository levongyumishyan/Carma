import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vars, useColorScheme } from 'nativewind';
import { ChannelList } from 'stream-chat-expo';

import { theme } from '../../theme';
import { ChatWrapper } from '../../components/ChatWrapper';
import { chatUserId } from '../../chatConfig';

export function MessagesTabScreen() {
    const { colorScheme } = useColorScheme();
    const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

    const filters = React.useMemo(
        () => ({
            type: 'messaging',
            members: { $in: [chatUserId] },
        }),
        []
    );

    const sort = React.useMemo(
        () => ({ last_message_at: -1 as const }),
        []
    );

    return (
        <SafeAreaView
            style={vars(currentTheme)}
            className="flex-1 bg-[--background]"
            edges={['top', 'left', 'right']}
        >
            <ChatWrapper>
                <View className="px-6 pt-2 pb-3 bg-[--background]">
                    <Text className="text-2xl font-semibold text-[--text]">
                        Messages
                    </Text>
                </View>

                <ChannelList
                    filters={filters}
                    sort={sort}
                    options={{ limit: 20 }}
                    onSelect={(channel) => {
                        console.log('Selected channel:', channel.id);
                    }}
                />
            </ChatWrapper>
        </SafeAreaView>
    );
}