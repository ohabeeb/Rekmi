import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOURS, SIZES } from '../constants/themes'

export default function Logo() {
    return (
        <View
            style={{
                alignSelf: 'center',
            }}>
            <Text
                style={{
                    fontSize: SIZES.large * 2,
                    fontWeight: 'bold',
                    color: COLOURS.primary,
                }}>Rekmi</Text>
        </View>
    )
}

const styles = StyleSheet.create({})