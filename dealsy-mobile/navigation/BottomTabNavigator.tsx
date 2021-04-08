import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ShareDealScreen from '../screens/ShareDealScreen';
import DealsScreen from '../screens/DealsScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {
  BottomTabParamList,
  ShareDealParamList,
  DealsParamList,
  TabThreeParamList,
} from '../types';

import { Header } from '../components';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Deals"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      sceneAnimationEnabled={true}
      shifting={true}
      barStyle={{ backgroundColor: "#694fad" }}
    >
      <BottomTab.Screen
        name="Deals"
        component={DealsNavigator}
      // options={{
      //   tabBarIcon: ({ color }) => (
      //     <TabBarIcon name="ios-code" color={color} />
      //   ),
      // }}
      />
      <BottomTab.Screen
        name="Share Deal"
        component={ShareDealNavigator}
      // options={}
      />
      {/* <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
      // options={{
      //   tabBarIcon: ({ color }) => (
      //     <TabBarIcon name="ios-code" color={color} />
      //   ),
      // }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ShareDealStack = createStackNavigator<ShareDealParamList>();

function ShareDealNavigator() {
  return (
    <ShareDealStack.Navigator>
      <ShareDealStack.Screen
        name="ShareDealScreen"
        component={ShareDealScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Share what you've found"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </ShareDealStack.Navigator>
  );
}

const DealsStack = createStackNavigator<DealsParamList>();

function DealsNavigator() {
  return (
    <DealsStack.Navigator>
      <DealsStack.Screen
        name="DealsScreen"
        component={DealsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="List Of Deals"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </DealsStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Tab Three Screen"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </TabThreeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Settings"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </SettingsStack.Navigator>
  );
}
