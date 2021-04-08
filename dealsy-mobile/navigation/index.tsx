import { NavigationContainer, DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton, HeaderBackground } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { RootStackParamList } from '../types';
import DrawerNavigator from './DrawerNavigation';
import LinkingConfiguration from './LinkingConfiguration';
import { Header } from '../components';
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{
        headerShown: true,
        headerTransparent: true
      }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{
        headerShown: true,
        headerTransparent: true
      }} />
      <Stack.Screen name="Root" component={DrawerNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
