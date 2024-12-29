import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOURS, DIMENSIONS, SIZES } from '../constants/themes'

export default function LogCards({ date, copy, copyClosed, print, printClosed, grandTotal, amountTransfer, availableCash }) {
    return (
        <View
            style={{
                width: "100%",
                marginBottom: DIMENSIONS.marging,
                backgroundColor: COLOURS.tetiary,
                elevation: 3,
                padding: DIMENSIONS.padding * 2,
                borderRadius: DIMENSIONS.radious,
                borderWidth: 2,
                borderColor: COLOURS.primary,
            }}>
            <Text
                style={{
                    fontSize: SIZES.small,
                    textAlign: 'right',
                    color: COLOURS.primary,
                }}>{date}</Text>
            <View>
                <Text
                    style={{
                        fontSize: SIZES.large,
                        fontWeight: 'bold',
                        color: COLOURS.black,
                    }}>Account</Text>
            </View>
            <View
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                <View style={{ flex: 0.7 }}>
                    <Text
                        style={{
                            fontSize: SIZES.medium,
                            color: COLOURS.primary,
                            fontWeight: '500',
                        }}>Money Transfered: </Text>
                </View>
                <View style={{ flex: 0.3 }}>
                    <Text
                        style={{
                            fontSize: SIZES.medium,
                            color: COLOURS.primary,
                            fontWeight: '500',
                        }}>₦{amountTransfer}</Text>
                </View>
            </View>
            <View
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                <View style={{ flex: 0.7 }}>
                    <Text
                        style={{
                            fontSize: SIZES.medium,
                            color: COLOURS.primary,
                            fontWeight: '500',
                        }}>Available Cash: </Text>
                </View>

                <View style={{ flex: 0.3 }}>
                    <Text
                        style={{
                            fontSize: SIZES.medium,
                            color: COLOURS.primary,
                            fontWeight: '500',
                        }}>₦{availableCash}</Text>
                </View>
            </View>
            <View
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                <View style={{ flex: 0.7 }}>
                    <Text
                        style={{
                            fontSize: SIZES.medium,
                            color: COLOURS.primary,
                            fontWeight: 'bold',
                        }}>Grand Total: </Text>
                </View>

                <View style={{ flex: 0.3 }}>
                    <Text
                        style={{
                            fontSize: SIZES.medium,
                            textDecorationLine: 'underline',
                            color: COLOURS.primary,
                            fontWeight: 'bold',
                        }}>₦{grandTotal}</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({})