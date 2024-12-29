import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { COLOURS } from './src/constants/themes'
import Stacks from './src/navigations/Stacks'


export default function App() {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLOURS.primary} barStyle={"light-content"} />
      <Stacks />
    </NavigationContainer>
  )
}