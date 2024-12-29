import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOURS, DIMENSIONS, SIZES } from '../constants/themes'

export default function Splash({ navigation }) {
    React.useEffect(() => {
        setTimeout(() => {
            navigation.replace("SignIn")
        }, 5000)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View>
                <Text
                    style={{
                        fontSize: SIZES.large * 2,
                        fontWeight: 'bold',
                        color: COLOURS.secondary,
                    }}>Rekmi</Text>
            </View>
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                }}>
                <Text
                    style={{
                        fontSize: SIZES.small,
                        color: COLOURS.secondary,
                        textAlign: 'center',
                    }}>v0.0.1</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOURS.primary,
    }
})