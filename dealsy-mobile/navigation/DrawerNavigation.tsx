import * as React from 'react';
import { Button, Dimensions, View } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./Menu";

import BottomTabNavigator from './BottomTabNavigator';

import Images from '../constants/Images';
import materialTheme from '../constants/Colors';
import LoadingScreen from '../screens/LoadingScreen';

const { height, width } = Dimensions.get('screen');

const Drawer = createDrawerNavigator();

const profile = {
    avatar: Images.Profile,
    name: "Rachel Brown",
    type: "Seller",
};

export default function DrawerStack(props) {
    return (
        <Drawer.Navigator
            style={{ flex: 1 }}
            drawerContent={(props) => (
                <CustomDrawerContent {...props} profile={profile} />
            )}
            drawerStyle={{
                backgroundColor: "white",
                width: width * 0.8,
            }}
            drawerContentOptions={{
                activeTintColor: "white",
                inactiveTintColor: "#000",
                activeBackgroundColor: materialTheme.COLORS.ACTIVE,
                inactiveBackgroundColor: "transparent",
                itemStyle: {
                    width: width * 0.74,
                    paddingHorizontal: 12,
                    // paddingVertical: 4,
                    justifyContent: "center",
                    alignContent: "center",
                    // alignItems: 'center',
                    overflow: "hidden",
                },
                labelStyle: {
                    fontSize: 18,
                    fontWeight: "normal",
                },
            }}
            initialRouteName="Deals"
        >
            <Drawer.Screen
                name="Deals"
                component={BottomTabNavigator}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Icon
                            size={16}
                            name="shop"
                            family="GalioExtra"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    ),
                }}
            />
            {/* <Drawer.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Icon
                            size={16}
                            name="circle-10"
                            family="GalioExtra"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    ),
                }}
            /> */}
            {/* <Drawer.Screen
                name="Sign Out"
                component={LoadingScreen}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Icon
                            size={16}
                            name="log-out-outline"
                            family="ionicon"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    ),
                }}
            /> */}
        </Drawer.Navigator>
    );
}