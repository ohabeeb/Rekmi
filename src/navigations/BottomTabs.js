import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Add, History, Home, Profile } from '../screens'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOURS } from '../constants/themes'

const BottomTab = createBottomTabNavigator()

export default function BottomTabs() {
    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {elevation: 0, backgroundColor: "transparent"}
            }}>
            <BottomTab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={"home-circle"}
                            size={30}
                            color={focused ? COLOURS.primary : COLOURS.black} />
                    )
                }}
            />
            <BottomTab.Screen
                name='Add'
                component={Add}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={"plus-circle"}
                            size={30}
                            color={focused ? COLOURS.primary : COLOURS.black} />
                    )
                }} />
            <BottomTab.Screen
                name='History'
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={"view-list"}
                            size={30}
                            color={focused ? COLOURS.primary : COLOURS.black} />
                    )
                }}

            />
            <BottomTab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={"account-circle"}
                            size={30}
                            color={focused ? COLOURS.primary : COLOURS.black} />
                    )
                }} />
        </BottomTab.Navigator>
    )
}