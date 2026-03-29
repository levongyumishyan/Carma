import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from '@react-navigation/native';
import { Fragment } from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from 'nativewind';

import { useSyncOAuthProfile } from '../hooks/useSyncOAuthProfile';
import { AccountTabScreen } from '../screens/tabs/AccountTabScreen';
import { HomeTabScreen } from '../screens/tabs/HomeTabScreen';
import { SearchTabScreen } from '../screens/tabs/SearchTabScreen';

export type MainTabParamList = {
    Home: undefined;
    Search: undefined;
    Account: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function OAuthProfileSync() {
    useSyncOAuthProfile();
    return null;
}

export function MainTabs() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const navTheme = isDark
        ? {
            ...DarkTheme,
            colors: {
                ...DarkTheme.colors,
                background: '#111827',
                card: '#1F2937',
                border: '#4B5563',
                primary: '#34C759',
                text: '#FFFFFF',
            },
        }
        : {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                background: '#34C759',
                card: '#FFFFFF',
                border: '#E5E5E5',
                primary: '#34C759',
                text: '#0B0B0B',
            },
        };

    return (
        <Fragment>
            <OAuthProfileSync />
            <NavigationContainer theme={navTheme}>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                            borderTopColor: isDark ? '#4B5563' : '#E5E5E5',
                            height: Platform.OS === 'ios' ? 88 : 64,
                            paddingTop: 6,
                        },
                        tabBarActiveTintColor: '#34C759',
                        tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#6B7280',
                        tabBarLabelStyle: {
                            fontSize: 12,
                            fontWeight: '600',
                        },
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeTabScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="home-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Search"
                        component={SearchTabScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="search-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Account"
                        component={AccountTabScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="person-circle-outline" size={size} color={color} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </Fragment>
    );
}