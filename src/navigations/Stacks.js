import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Splash, SignIn, SignUp, Profile } from '../screens'
import BottomTabs from './BottomTabs'

const Stack = createNativeStackNavigator()

export default function Stacks() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>

            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='BottomTabs' component={BottomTabs} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='SignUp' component={SignUp} />

        </Stack.Navigator>

    )
}