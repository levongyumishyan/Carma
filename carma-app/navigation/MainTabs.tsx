import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { Fragment } from 'react';
import { Platform } from 'react-native';

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

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0a0a0a',
    card: '#0a0a0a',
    border: '#262626',
    primary: '#fafafa',
    text: '#fafafa',
  },
};

function OAuthProfileSync() {
  useSyncOAuthProfile();
  return null;
}

export function MainTabs() {
  return (
    <Fragment>
      <OAuthProfileSync />
      <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0a0a0a',
            borderTopColor: '#262626',
            paddingTop: Platform.OS === 'ios' ? 4 : 0,
            height: Platform.OS === 'ios' ? 88 : 64,
          },
          tabBarActiveTintColor: '#fafafa',
          tabBarInactiveTintColor: '#737373',
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        }}>
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
