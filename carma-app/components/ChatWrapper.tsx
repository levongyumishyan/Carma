import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    OverlayProvider,
    Chat,
    useCreateChatClient,
} from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';

import {
    chatApiKey,
    chatUserId,
    chatUserName,
} from '../chatConfig';

const streamUser = {
    id: chatUserId,
    name: chatUserName,
};

export function ChatWrapper({ children }: { children: React.ReactNode }) {
    const token = React.useMemo(() => {
        return StreamChat.getInstance(chatApiKey).devToken(chatUserId);
    }, []);

    const chatClient = useCreateChatClient({
        apiKey: chatApiKey,
        userData: streamUser,
        tokenOrProvider: token,
    });

    if (!chatClient) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                    <Text style={{ marginTop: 8 }}>Loading chat...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <OverlayProvider>
            <Chat client={chatClient}>
                {children}
            </Chat>
        </OverlayProvider>
    );
}