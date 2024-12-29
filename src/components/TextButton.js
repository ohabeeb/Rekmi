import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { DIMENSIONS, SIZES } from '../constants/themes'

export default function TextButton({ title, onPress, backgroundColor, color }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: backgroundColor,
                paddingVertical: DIMENSIONS.padding,
                borderRadius: DIMENSIONS.radious,
                marginTop: DIMENSIONS.marging,
            }}>
            <Text
                style={{
                    color: color,
                    textAlign: 'center',
                    fontSize: SIZES.large,
                }}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})